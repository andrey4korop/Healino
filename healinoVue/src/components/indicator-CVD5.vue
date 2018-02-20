<template>
  <div class="mini_indicator mini_indicator4"  v-on:click="start">
    <div class="progress_bar2">
      <div class="cursor"
           v-bind:style="{ transform: 'rotate(' + RASCVDDeg + 'deg)' }"></div>
      <div class="text_indicatition">
      <p class="big">{{animateVal}}%</p>
      <!--<p>5 years</p>-->
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
        }
    },

    computed:{
        minValue:function () {
            return 0;
        },
        maxValue:function () {
            return this.rezultData.RASCVDScale[this.rezultData.RASCVDScale.length-1].Value;
        },
        RASCVDDeg:function(){
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
        this.valArray.push(this.rezultData.RASCVD);
        var t = this;
        setTimeout(t.start, 100);
    }
}
</script>

<style scoped>
  .progress_bar2{
    border-radius: 50%;
    transition: all 0.1s linear;
  }
  .progress_bar2:hover{
    box-shadow: 0 0 35px rgba(255, 255, 255, 1), inset 0 0 60px rgba(255, 255, 255, 0.5);
  }
</style>
