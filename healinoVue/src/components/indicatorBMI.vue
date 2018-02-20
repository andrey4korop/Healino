<template>
  <div class="indicators">
    <div class="title_indicator">
      <p>BMI</p>
      <p>(body mass index)</p>
    </div>
    <div class="indicator">
      <div class="plus"><img src="static/img/plus.png" alt=""></div>
      <div class="progress_bar4" v-on:click="start">
        <div class="cursor" v-bind:style="{ transform: 'rotate(' + CallorieDeg + 'deg)' }"></div>
        <div class="text_indicator">
          <p class="big">{{animateVal}}</p>
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
          return this.rezultData.BMIScale[0].BMI - (this.rezultData.BMIScale[1].BMI - this.rezultData.BMIScale[0].BMI);
        },
        maxValue:function () {
            return this.rezultData.BMIScale[this.rezultData.BMIScale.length-1].BMI;
        },
        CallorieDeg:function(){
            return 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue);
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
      this.valArray.push(this.rezultData.BMI);
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
    width: 15%;
    height: 15%;
    position: absolute;
    top: -7%;
    right: -7%;
    border-radius: 50%;
    z-index: 1;
  }
  .plus:hover{
    filter: blur(0.8px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);

  }
  .progress_bar4{
    border-radius: 50%;
    transition: all 0.1s linear;
  }
  .progress_bar4:hover{
    box-shadow: 0 0 35px rgba(255, 255, 255, 1), inset 0 0 200px rgba(255, 255, 255, 0.5);
  }

</style>
