<template>
  <div class="mini_indicator mini_indicator1" v-on:click="st">
    <div class="progress_bar2">
      <img src="/static/img/indicator_3.png" alt="">
      <div v-if="isActive" class="cursor" v-bind:style="{ transform: 'rotate(' + deg + 'deg)' }"></div>
      <div v-if="isActive" class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + deg2 + 'deg)' }"></div>
      <div v-if="isActive && curShow" class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + deg2 + 'deg)' }" style="background: url(/static/img/indicator_3Cur2.png) no-repeat; background-size: cover;"></div>
      <div class="opacity_cursor3" v-if="!isActive" v-on:click="$emit('toTheme')"><p ><i class="fa fa-lock" aria-hidden="true"></i></p></div>
      <div v-if="isActive" class="text_indicator">
      <p class="big">{{animateVal}}</p>
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
            animateVal:0 ,
            valArray:[],
        }
    },
  messages: {
    en: {
      textNonActive:"some text"
    },
    ru: {
      textNonActive:"some text"
    },
    pl: {
      textNonActive:"some text"
    }
  },
    computed:{
      isActive:function () {
        if(this.rezultData.FinishedTests.indexOf(2)>-1){
          return true;
        }else{
          return false;
        }
      },
        minValue:function () {
            return 0;
        },
        maxValue:function () {
            return 100;
        },

    },
    methods:{
      st(){
        this.start2();
        this.start();
      },
      ChronologicalAgeDeg(val){
        if(val<=this.minValue){
          return 3.6 *0 + 1 -20;
        }
        if(val>=this.maxValue){
          return 3.6 *100 -1 -20;
        }
        return 3.6 * (val - this.minValue) * 100 / (this.maxValue - this.minValue) -20;
      },
      ChronologicalAgeDegOp(val){
        let t = (this.ChronologicalAgeDeg(val)-20 - (this.ChronologicalAgeDeg(val)-20) % (360/9));
        if(this.ChronologicalAgeDeg(val)-20>=0){
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
            new TWEEN.Tween({ tweeningNumber: this.animateVal })
                .easing(TWEEN.Easing.Quadratic.InOut)
                .interpolation( TWEEN.Interpolation.Linear)
                .to({ tweeningNumber: this.valArray }, 2000)
                .onUpdate(function () {
                    t.animateVal = Math.round(this.tweeningNumber);
                })
                .start();

            this.animate()
        },
      start2(){
        let t = this;
        t.deg=t.ChronologicalAgeDeg(t.maxValue);
        t.curShow=true;
        setTimeout(function () {
          t.deg=t.ChronologicalAgeDeg(t.minValue);
        },700);
        setTimeout(function () {
          t.deg=t.ChronologicalAgeDeg(t.rezultData.BioMentalAge.ChronologicalAge);
        },1400);
        setTimeout(function () {
          t.curShow=false;
        },2050);
      }

    },
  created: function() {
    if(this.isActive) {
      this.deg = this.ChronologicalAgeDeg(this.minValue);
      this.deg2 = this.ChronologicalAgeDegOp(this.rezultData.BioMentalAge.ChronologicalAge);
      this.animateVal = this.minValue;
      this.valArray.push(this.minValue);
      this.valArray.push(this.maxValue);
      this.valArray.push(this.rezultData.BioMentalAge.ChronologicalAge);

      var t = this;
      setTimeout(t.start, 2000);
      setTimeout(t.start2, 2000);
    }
    }
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
  .opacity_cursor3{
    position: absolute;
    top:0%;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background: url("/static/img/indicator_3Cur_op.png") no-repeat;
    background-size: cover;
    text-align: center;
    color: #000;
    flex-direction: column;
    display: flex;
  }
  .opacity_cursor3 p{
    margin: auto;
  }
</style>
