<template>

  <div class="avatar_scale"v-on:click="start">
    <div class="plus" v-on:click="$emit('onDescription','1')"><img src="static/img/plus.png" alt=""></div>
    <div class="description" v-bind:class="(showDescription==1)?'on':''">
      <div class="text" v-lang.descriptionText="{THR: rezultData.HealthRate, THR_Comment: getComent}">

      </div>
    </div>
    <img src="static/img/cursor_2.png" alt="" class="cursor"
         v-bind:style="{ transform: 'rotate(' + HealthRateDeg + 'deg)' }">
    <div class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + HealthRateDegOp + 'deg)' }"></div>
    <div class="avatar">
      <div v-bind:style="{background: 'url(' + img + ') center center / cover' }" class="img" ></div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['rezultData', 'img', 'showDescription'],
    data () {
        return {
            animateVal:0 ,
            valArray:[],
        }
    },
    messages: {
        en: {
            descriptionText: '<p>Your integrated deviation index is {THR}%.</p><p>Which corresponds to the possible {THR_Comment}</p>',
            com0: "very good health",
            com1: "good health",
            com2: "average health",
            com3: "poor health",
            com4: "disease",
            com5: "diseases",
            com6: "serious illness",
        },
        ru: {
            descriptionText: "<p>Ваш интегрированный индекс отклонения от нормативов составляет {THR}%.</p><p>Что соответсвует {THR_Comment}</p>",
            com0: "очень хорошему здоровью",
            com1: "хорошему здоровью",
            com2: "среднему здоровью",
            com3: "плохому здоровье",
            com4: "вероятной болезни",
            com5: "болезни",
            com6: "серьезной болезни",
        },
        pl: {
            descriptionText: "<p>Twój zintegrowany indeks odchylenia wynosi {THR}%.</p><p>Co odpowiada {THR_Comment}</p>",
            com0: "bardzo dobremu zdrowiu",
            com1: "dobremu zdrowiu",
            com2: "średniemu zdrowiu",
            com3: "słabemu zdrowiu",
            com4: "prawdopodobnej chorobie",
            com5: "chorobie",
            com6: "poważnej chorobie",
        }
    },
    computed:{
        minValue:function () {
            return this.rezultData.HealthRatioScale[0].Value - (this.rezultData.HealthRatioScale[1].Value - this.rezultData.HealthRatioScale[0].Value);
        },
        maxValue:function () {
            return this.rezultData.HealthRatioScale[this.rezultData.HealthRatioScale.length-1].Value;
        },
        HealthRateDeg:function(){
            if(this.animateVal<this.minValue){
                return 3.6 *(this.minValue - this.minValue) * 100 / (this.maxValue - this.minValue) +69;
            }
            if(this.animateVal>this.maxValue){
                return 3.6 *(this.maxValue - this.minValue) * 100 / (this.maxValue - this.minValue) +69;
            }
            return 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue) +69;
        },
        HealthRateDegOp:function(){
            let t = (this.HealthRateDeg -69 - (this.HealthRateDeg-69) % (360/7));

            return t;
        },
        getComent:function () {
            if(this.rezultData.HealthRate > this.maxValue){
                return this.translate( 'com'+(this.rezultData.HealthRatioScale.length-1));
            }
            let ret = this.translate( 'com0');
            //console.log(ret);
            for( let i = 0; i < this.rezultData.HealthRatioScale.length; i++){
                //console.log(this.rezultData.HealthRatioScale[i].Value);
               if(this.rezultData.HealthRate > this.rezultData.HealthRatioScale[i].Value){
                  ret = this.translate( 'com'+(i+1));
                   //console.log(ret);
               }else{
                   return ret;
               }
            }
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
                .to({ tweeningNumber: this.valArray }, 3000)
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
        setTimeout(t.start, 500);
    },
}
</script>

<style scoped>
  .plus{
    width: 15%;
    height: 15%;
    position: absolute;
    top: -5%;
    right: -5%;
    border-radius: 25%;
    z-index: 1;
    transition: all 1.5s ease-in-out;
  }
  .plus:hover{
    animation: unset !important;
    box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5)

  }
  .avatar_scale:hover{
    box-shadow: 0 0 50px rgba(255, 255, 255, 1), inset 0 0 50px rgba(255, 255, 255, 0.5);
  }
  .avatar_scale:hover .plus{
    animation: anima 2s infinite ease-in-out;
  }
  @keyframes anima {
    from {box-shadow: unset;}
    50% { box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5)}
    to {box-shadow: unset;}
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
  .opacity_cursor{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: url("/static/img/indiator_7Cur.png") no-repeat;
    background-size: cover;
  }
  .avatar {
    width: 10vw;
    height: 10vw;
    margin: 0.7vw;
    border-radius: 500px;
  }
  .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    left: 112%;
    top: 0%;
    width: 22vw;
    text-align: left;
    border-radius: 0px 15px 15px 15px;
    padding: 15px;
    z-index: -10;
    opacity: 0;
    transition: all 0.5s linear;
  }
  .description.on{
    z-index: 10;
    opacity: 1;
  }
  .description .text{
    max-height: 109px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 3px;
    background: rgba(255,255,255,1);
    color: #585858;
    scrollbar-base-color: rgba(109,207,77,1);
    scrollbar-3dlight-color:rgba(109,207,77,1);
    scrollbar-highlight-color: rgba(109,207,77,1);
    scrollbar-track-color: rgba(109,207,77,0.5);
    scrollbar-arrow-color: rgba(109,207,77,0.5);
    scrollbar-shadow-color: rgba(109,207,77,1);
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
</style>
