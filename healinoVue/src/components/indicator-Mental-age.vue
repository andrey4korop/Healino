<template>
  <div class="mini_indicator mini_indicator3" v-on:click="start">
    <div class="progress_bar2">
      <div class="cursor" v-bind:style="{ transform: 'rotate(' + MentalAgeDeg + 'deg)' }"></div>
      <div class="text_indicatition">
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
        MentalAgeDeg:function(){
            return 3.6 * (this.animateVal.deg - this.minValue) * 100 / (this.maxValue - this.minValue);
        },
    },
    methods:{
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
                .delay(200)
                .start();
            this.animate()
        }
    },
    created: function() {
        this.animateVal = {deg: this.minValue, digits: 0};
        this.valArray.deg.push(this.minValue);
        this.valArray.digits.push(0);
        this.valArray.deg.push(this.maxValue);
        this.valArray.digits.push(100);
        this.valArray.deg.push(this.rezultData.BioMentalAge.MentalAgeDiffPercentage);
        this.valArray.digits.push(this.rezultData.BioMentalAge.MentalAge);
        var t = this;
        setTimeout(t.start, 100);
    },
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
