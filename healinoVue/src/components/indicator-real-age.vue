<template>
  <div class="mini_indicator mini_indicator1" v-on:click="start">
    <div class="progress_bar2">
      <img src="/static/img/indicator_3.png" alt="">
      <div class="cursor" v-bind:style="{ transform: 'rotate(' + ChronologicalAgeDeg + 'deg)' }"></div>
      <div class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + ChronologicalAgeDegOp + 'deg)' }"></div>
      <div class="text_indicator">
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
            animateVal:0 ,
            valArray:[],
        }
    },
    computed:{
        minValue:function () {
            return 0;
        },
        maxValue:function () {
            return 100;
        },
        ChronologicalAgeDeg:function(){
            if(this.animateVal<=this.minValue){
                return 3.6 *0 + 1 -20;
            }
            if(this.animateVal>=this.maxValue){
                return 3.6 *100 -1 -20;
            }
            return 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue) -20;
        },
        ChronologicalAgeDegOp:function(){
            let t = (this.ChronologicalAgeDeg-20 - (this.ChronologicalAgeDeg-20) % (360/9));
            if(this.ChronologicalAgeDeg-20>=0){
                t += (360/9);
            }
            return t;
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
      this.valArray.push(this.rezultData.BioMentalAge.ChronologicalAge);

      var t = this;
      setTimeout(t.start, 2000);
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
</style>
