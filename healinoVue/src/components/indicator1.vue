<template>
  <div class="indicators">
    <div class="title_indicator">
      <p>Body Fat (US Navy)</p>
    </div>
    <div class="indicator indicator1">
      <div class="plus"><img src="static/img/plus.png" alt=""></div>
      <div class="progress_bar1" v-on:click="start">
        <img src="static/img/cursor_1.png" alt="" class="cursor"
             v-bind:style="{ left: FMPDeg + '%' }">
        <span class="percent" v-bind:style="{ left: FMPDeg + '%' }">{{animateVal}}%</span>
        <span class="shkala-1">10%</span>
        <span class="shkala-2">18%</span>
        <span class="shkala-3">24%</span>
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
        }},

    computed:{
        minValue:function () {
            return this.rezultData.FMCategoryScale[0].BF - (this.rezultData.FMCategoryScale[1].BF - this.rezultData.FMCategoryScale[0].BF);
        },
        maxValue:function () {
            return this.rezultData.FMCategoryScale[this.rezultData.FMCategoryScale.length-1].BF;
        },
        FMPDeg:function(){
            return (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue);
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
        this.valArray.push(this.rezultData.FM);
        var t = this;
        setTimeout(t.start, 100);
    },
}
</script>

<style scoped>
  .indicator{
    position: relative;
  }
  .plus{
    width: 5%;
    height: 80%;

    position: absolute;
    top: -90%;
    right: 4%;
    border-radius: 25%;
    z-index: 1;
  }
  .plus:hover{
    filter: blur(0.8px);
    box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5)

  }
  .progress_bar1{
    margin-top: 16px;
    border-radius: 15%;
    transition: all 0.1s linear;
    height: 30px;
    background-position-y: -12px;
  }
  .progress_bar1:hover{
    box-shadow: 0 0 20px rgba(255, 255, 255, 1), inset 0 0 40px rgba(255, 255, 255, 0.7)
  }
  .cursor{
    top: -11px
  }
  .percent{
    top: -42px
  }
  .progress_bar1 .shkala-1, .progress_bar1 .shkala-2, .progress_bar1 .shkala-3 {
    bottom: 0;
  }
</style>
