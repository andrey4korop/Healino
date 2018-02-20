<template>

  <div class="avatar_scale">
    <div class="plus"><img src="static/img/plus.png" alt=""></div>
    <img src="static/img/cursor_2.png" alt="" class="cursor" v-on:click="start"
         v-bind:style="{ transform: 'rotate(' + HealthRateDeg + 'deg)' }">
    <div class="avatar">
      <div v-bind:style="{background: 'url(' + img + ') center center / cover' }" class="img" ></div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['rezultData', 'img'],
    data () {
        return {
            animateVal:0 ,
            valArray:[],
        }},

    computed:{
        minValue:function () {
            return this.rezultData.HealthRatioScale[0].Value - (this.rezultData.HealthRatioScale[1].Value - this.rezultData.HealthRatioScale[0].Value);
        },
        maxValue:function () {
            return this.rezultData.HealthRatioScale[this.rezultData.HealthRatioScale.length-1].Value;
        },
        HealthRateDeg:function(){
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
        this.valArray.push(this.rezultData.HealthRate);
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
    top: -5%;
    right: -5%;
    border-radius: 25%;
    z-index: 1;
  }
  .plus:hover{
    filter: blur(0.8px);
    box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5)

  }
  .avatar_scale:hover{
    box-shadow: 0 0 50px rgba(255, 255, 255, 1), inset 0 0 50px rgba(255, 255, 255, 0.5);
  }
  .avatar_scale{
    position: relative;
    width: 11.5vw;
    height: 11.5vw;
    background: url(/static/img/indiator_7.png) center center / cover;
    margin: 2vw;
    border-radius: 50%;
    transition: all 0.1s linear;
  }
  .avatar_scale .cursor{
    position: absolute;
    height: 116%;
    top: -8%;
    transform: rotate(696.0339deg);
  }
  .avatar {
    width: 10vw;
    height: 10vw;
    margin: 0.7vw;
    border-radius: 500px;
  }
</style>
