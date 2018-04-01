<template>
  <div class="mini_indicator mini_indicator6" v-on:click="start">
    <div class="progress_bar2">
      <div class="color" v-bind:style="{background:color[colorId]}"></div>
      <div class="cursor"
           v-bind:style="{ transform: 'rotate(' + TenYearsASCVDDeg + 'deg)' }"></div>
      <div class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + TenYearsASCVDDegOp + 'deg)' }"></div>
      <div class="text_indicatition">
      <p class="big">{{animateVal}}%</p>
      <p>10 years</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['rezultData'],
    data () {
        return {
            animateVal:0 ,
            valArray:[],
            color:['#2FAA52', '#79BA48', '#FEE79A', '#FAC342', '#DB4641'],
            colorId:0
        }
    },

    computed:{
        minValue:function () {
            return 0;
        },
        maxValue:function () {
            return this.rezultData.TenYearsASCVDScale[this.rezultData.TenYearsASCVDScale.length-1].Value;
        },
        TenYearsASCVDDeg:function(){
            if(this.animateVal<=this.minValue){
                this.colorId = 0;
                return 360 - 3.6 *0 -37;
            }
            if(this.animateVal>=this.maxValue){
                this.colorId = 4;
                return 360 - 3.6 *100 -35;
            }
            //return 360 - 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue) -36;
            for(var w=0; w<this.rezultData.TenYearsASCVDScale.length; w++ ){
                this.colorId = w;
                if(this.animateVal < this.rezultData.TenYearsASCVDScale[w].Value){
                    break;
                }
            }
            var howManyDegForScale = 360 / this.rezultData.TenYearsASCVDScale.length;
            var per;
            if(w>0) {
                per = (this.animateVal - this.rezultData.TenYearsASCVDScale[w-1].Value) / (this.rezultData.TenYearsASCVDScale[w].Value - this.rezultData.TenYearsASCVDScale[w - 1].Value) * howManyDegForScale + howManyDegForScale * (w);
            }else{
                per = (this.animateVal - this.minValue) / (this.rezultData.TenYearsASCVDScale[w].Value - this.minValue) * howManyDegForScale;
            }
            return 360 - per-36;
        },
        TenYearsASCVDDegOp:function(){
            let t = (this.TenYearsASCVDDeg +36 - (this.TenYearsASCVDDeg+36) % (360/5));
            //if(this.TenYearsASCVDDeg>=0){
            t += (360/5);
            //}
            return t-(360-t)/100;
        }
    },

    methods:{
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
                .delay(200)
                .start();
            this.animate()
        }
    },
    created: function() {
        this.animateVal = this.minValue;
        this.valArray.push(this.minValue);
        this.valArray.push(this.maxValue);
        this.valArray.push(this.rezultData.TenYearsASCVD.Optimal);
        var t = this;
        setTimeout(t.start, 4000);
    }
}
</script>

<style scoped>
  .progress_bar2{
    border-radius: 50%;
    transition: all 0.1s linear;
    background: url(/static/img/indicator_red.png) center center/cover no-repeat;
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
    background: url("/static/img/indicator_greenCur.png") no-repeat;
    background-size: cover;
  }
  .description .text::-webkit-scrollbar {
    width: 5px;
    background: rgba(109,207,77,0.5);
    border-radius: 3px;
    height: 90%;
  }

  .description .text::-webkit-scrollbar-thumb {
    background: rgb(109,207,77);
    border-radius: 3px;
    width: 5px;
    height: 90%;
  }
  .color{
    width: 86.5%;
    position: absolute;
    height: 86.5%;
    border-radius: 50%;
    top: 6.5%;
    left: 6.5%;
  }
</style>
