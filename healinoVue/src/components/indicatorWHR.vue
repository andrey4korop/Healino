<template>
  <div class="indicators" v-on:click="start">
    <div class="title_indicator">
      <p>Waist to Hip</p><p> Ratio</p>
    </div>
    <div class="indicator indicatorWHR">
      <div class="plus" v-on:click="$emit('onDescription','6')"><img src="static/img/plus.png" alt=""></div>
      <div class="description" v-bind:class="(showDescription==6)?'on':''">
        <div class="text" v-lang.descriptionText="{WHR: rezultData.WHRatio, coment: getComent}"></div>
      </div>
      <div class="progress_bar6">
        <div class="sometext">
          <div class="txt">
            <p>Excellent</p>
            <p class="big"><{{rezultData.WHRatioScale[0].Value}}</p>
          </div>
          <div class="txt">
            <p class="big">>{{maxValue}}</p>
            <p>At Risk</p>
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
    props: ['rezultData','showDescription'],
    data () {
        return {
            animateVal:0 ,
            valArray:[],
        }
    },
    messages: {
        en: {
            descriptionText:
            "<p>Your waist-to-hip ratio is {WHR}.</p>"+
            "<p>Which corresponds to the possible {coment}</p>",
            com0: "severe thinness",
            com1: "moderate thinness",
            com2: "insufficient body weight",
            com3: "normal body weight",
            com4: "overweight (pre-fattening)",
            com5: "obesity of the Class I",
            com6: "obesity of the Class II",
            com7: "obesity of the Class III",
        },
        ru: {
            descriptionText:
            "<p>Ваш индекс соотношения талии к бедрам составляет {WHR}.</p>"+
            "<p>Что соответсвует возможному {coment}</p>",
            com0: "сильному дефициту массы тела",
            com1: "выраженному дефициту массы тела",
            com2: "недостаточной массы тела",
            com3: "нормальной массе тела",
            com4: "избыточной массы тела (предожирение)",
            com5: "ожирению первой степени",
            com6: "ожирению второй степени",
            com7: "ожирению третьей степени (морбидное)",
        },
        pl: {
            descriptionText:
            "<p>Stosunek talii do bioder wynosi {WHR}.</p>"+
            "<p>Co odpowiada {coment}</p>",
            com0: "to ciężkiemu deficytowi masy ciała",
            com1: "wyraźnemu deficytowi masy ciała",
            com2: "niewystarczającej masie ciała",
            com3: "normalnej masie ciała",
            com4: "nadwyżce masy ciała (wstępne tuczenie)",
            com5: "otyłości pierwszego stopnia",
            com6: "otyłości drugiego stopnia",
            com7: "otyłości trzeciego stopnia (chorobliwe)",
        }
    },
    computed:{
        minValue:function () {
            return Math.round(parseFloat(this.rezultData.WHRatioScale[0].Value - (this.rezultData.WHRatioScale[1].Value - this.rezultData.WHRatioScale[0].Value))*100)/100;
        },
        maxValue:function () {
            return this.rezultData.WHRatioScale[this.rezultData.WHRatioScale.length-1].Value;
        },
        WHRPresent:function(){
            if(this.animateVal<this.minValue){
                return  7;
            }
            if(this.animateVal>this.maxValue){
                return  93;
            }
            return (this.animateVal - this.minValue) * 86 / (this.maxValue - this.minValue) + 7;
        },
        getComent:function () {
            if(this.rezultData.WHRatio > this.maxValue){
                return this.translate( 'com'+(this.rezultData.WHRatioScale.length-1));
            }
            let ret = this.translate( 'com0');
            for( let i = 0; i < this.rezultData.WHRatioScale.length; i++){
                if(this.rezultData.WHRatio > this.rezultData.WHRatioScale[i].Value){
                    ret = this.translate( 'com'+(i+1));
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
        setTimeout(t.start, 4500);
    },
}
</script>

<style scoped>
  .indicator{
    position: relative;
  }
  .indicator:hover .plus{
    animation: anima 2s infinite ease-in-out;
  }
  @keyframes anima {
    from {box-shadow: unset;}
    50% { box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5)}
    to {box-shadow: unset;}
  }
  .plus{
    width: 30%;
    height: 10%;
    position: absolute;
    bottom: -12%;
    right: 32%;
    border-radius: 50%;
    z-index: 1;
    transition: all 1.5s ease-in-out;
  }
  .plus:hover{

    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);
    animation: unset !important;
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
  .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    right: 50%;
    top: 115%;
    width: 30vw;
    text-align: left;
    border-radius: 15px 0 15px 15px;
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
