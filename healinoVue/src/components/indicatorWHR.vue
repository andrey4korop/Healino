<template>
  <div class="indicators" v-on:click="start">
    <div class="title_indicator">
      <p>Waist to Hip</p><p> Ratio</p>
    </div>
    <div class="indicator indicatorWHR">
      <div class="plus"><img src="static/img/plus.png" alt=""></div>
      <div class="progress_bar6">
        <div class="sometext">
          <div class="txt">
            <p class="big">>{{maxValue}}</p>
            <p>At Risk</p>
          </div>
          <div class="txt">
            <p>Exelent</p>
            <p class="big"><{{rezultData.WHRatioScale[0].Value}}</p>
          </div>
        </div>
        <div class="opacity" v-bind:style="{ height: WHRPresent + '%' }"></div>
        <div class="cursor">
          <img src="static/img/cursor_4.png" alt="">
          <div>
            <p class="big">{{animateVal}}</p>
          </div>
        </div>
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
            return Math.round(parseFloat(this.rezultData.WHRatioScale[0].Value - (this.rezultData.WHRatioScale[1].Value - this.rezultData.WHRatioScale[0].Value))*100)/100;
        },
        maxValue:function () {
            return this.rezultData.WHRatioScale[this.rezultData.WHRatioScale.length-1].Value;
        },
        WHRPresent:function(){
            return 100 - (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue);
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
                    t.animateVal = Math.round(parseFloat(this.tweeningNumber)*100)/100;
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
        this.valArray.push(this.rezultData.WHRatio);
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
    width: 30%;
    height: 10%;
    position: absolute;
    top: -7%;
    right: -13%;
    border-radius: 50%;
    z-index: 1;
  }
  .plus:hover{
    filter: blur(0.8px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);

  }
  .progress_bar6{
    border-radius: 23%;
    transition: all 0.1s linear;
  }
  .progress_bar6:hover{
    box-shadow: 0 0 20px rgba(255, 255, 255, 1), inset 0 0 40px rgba(255, 255, 255, 0.7)
  }
  @media screen and (max-width: 780px){
    .plus {
      width: 30%;
      height: 16%;
      bottom: -57%;
      right: 38%;
      top: unset;
    }
  }
</style>
