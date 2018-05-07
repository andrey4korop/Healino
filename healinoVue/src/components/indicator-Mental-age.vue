<template>
  <div class="mini_indicator mini_indicator3" v-on:click="st">
    <div class="progress_bar2">
      <img src="/static/img/indicator_3.png" alt="">
      <div class="cursor" v-bind:style="{ transform: 'rotate(' + deg + 'deg)' }"></div>
      <div class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + deg2 + 'deg)' }"></div>
      <div class="opacity_cursor"  v-if="curShow" v-bind:style="{ transform: 'rotate(' + deg2 + 'deg)' }" style="background: url(/static/img/indicator_3Cur2.png) no-repeat; background-size: cover;"></div>
      <div class="text_indicator">
      <p class="big">{{animateVal.digits}}</p>
      <p>years</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['rezultData'],
    data () {
        return {
          deg:0,
          deg2:0,
          curShow:true,
            animateVal:{deg:0, digits:0} ,
            valArray:{
                deg:[],
                digits:[]
            }
        }
    },
    computed:{
        minValue:function () {
            return this.rezultData.MentalAgeScale[0].AgePercent - (this.rezultData.MentalAgeScale[1].AgePercent - this.rezultData.MentalAgeScale[0].AgePercent);
        },
        maxValue:function () {
            return this.rezultData.MentalAgeScale[this.rezultData.MentalAgeScale.length-1].AgePercent;
        },

    },
    methods:{
      st(){
        this.start2();
        this.start();
      },
      MentalAgeDeg(val){
        if(val<=this.minValue){
          return 3.6 *0 + 1 -30;
        }
        if(val>=this.maxValue){
          return 3.6 *100 -1 -30;
        }
        //return 3.6 * (this.animateVal.deg - this.minValue) * 100 / (this.maxValue - this.minValue) -30;
        for(var w=0; w<this.rezultData.MentalAgeScale.length; w++ ){
          if(val < this.rezultData.MentalAgeScale[w].AgePercent){
            break;
          }
        }
        var howManyDegForScale = 360 / this.rezultData.MentalAgeScale.length;
        var per;
        if(w>0) {
          per = (val - this.rezultData.MentalAgeScale[w-1].AgePercent) / (this.rezultData.MentalAgeScale[w].AgePercent - this.rezultData.MentalAgeScale[w - 1].AgePercent) * howManyDegForScale + howManyDegForScale * (w);
        }else{
          per = (val - this.minValue) / (this.rezultData.MentalAgeScale[w].AgePercent - this.minValue) * howManyDegForScale;
        }
        return per-30;
      },
      MentalAgeDegOp(val){
        let t = (this.MentalAgeDeg(val) -20 - (this.MentalAgeDeg(val)-20) % (360/9));
        if(this.MentalAgeDeg(val)-20>=0){
          t += (360/9);
        }
        return t;
      },
        animate () {
            if (TWEEN.update()) {
                requestAnimationFrame(this.animate)
            }
        },
        start(){
            var t = this;
            new TWEEN.Tween( this.animateVal )
                .easing(TWEEN.Easing.Quadratic.InOut)
                .interpolation( TWEEN.Interpolation.Linear)
                .to( {deg: this.valArray.deg, digits:this.valArray.digits} , 2000)
                .onUpdate(function () {
                    t.animateVal.deg = this.deg;
                    t.animateVal.digits = Math.round(this.digits);
                })
                .start();
            this.animate()
        },
      start2(){
        let t = this;
        t.deg=t.MentalAgeDeg(t.maxValue);
        t.curShow=true;
        setTimeout(function () {
          t.deg=t.MentalAgeDeg(t.minValue);
        },700);
        setTimeout(function () {
          t.deg=t.MentalAgeDeg(t.rezultData.BioMentalAge.MentalAgeDiffPercentage);
        },1400);
        setTimeout(function () {
          t.curShow=false;
        },2050);
      }
    },
    created: function() {
      this.deg =this.MentalAgeDeg(this.minValue);
      this.deg2=this.MentalAgeDegOp(this.rezultData.BioMentalAge.MentalAgeDiffPercentage);
        this.animateVal = {deg: this.minValue, digits: 0};
        this.valArray.deg.push(this.minValue);
        this.valArray.digits.push(0);
        this.valArray.deg.push(this.maxValue);
        this.valArray.digits.push(100);
        this.valArray.deg.push(this.rezultData.BioMentalAge.MentalAgeDiffPercentage);
        this.valArray.digits.push(this.rezultData.BioMentalAge.MentalAge);
        var t = this;
        setTimeout(t.start, 2500);
        setTimeout(t.start2, 2500);
    },
}
</script>

<style scoped>
  .progress_bar2{
    border-radius: 50%;
    transition: all 0.1s linear;
    position: relative;
  }
  .progress_bar2:hover, .plus:hover~.row_indicator .progress_bar2{
    box-shadow: 0 0 35px rgba(255, 255, 255, 1), inset 0 0 60px rgba(255, 255, 255, 0.5);
  }
  .opacity_cursor{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: url("/static/img/indicator_3Cur.png") no-repeat;
    background-size: cover;
  }
  .opacity_cursor, .cursor{
    transition: all 0.7s linear;
  }
</style>
