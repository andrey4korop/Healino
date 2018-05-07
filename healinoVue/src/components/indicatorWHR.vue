<template>
  <div class="indicators" v-on:click="st">
    <div class="title_indicator" v-html="langString('title')"></div>
    <div class="indicator indicatorWHR">
      <div class="description" v-bind:style="{zIndex:hIndex}" v-bind:class="(showDescription==6)?'on':''">
        <div class="text" v-lang.descriptionText="{WHR: rezultData.WHRatio, coment: getComent}"></div>
      </div>
      <div class="progress_bar6">
        <img src="/static/img/indicator_4.png" alt="">
        <div class="plus" v-on:click="$emit('onDescription','6')"><img src="static/img/plus.png" alt=""></div>
        <div class="sometext">
          <div class="txt">
            <p>Excellent</p>
            <p class="big"><{{minValue}}</p>
          </div>
          <div class="txt">
            <p class="big">>{{maxValue}}</p>
            <p>At Risk</p>
          </div>
        </div>
        <div class="opacity" v-bind:style="{ height: deg + '%' }"></div>
        <div class="cursor" v-bind:style="{ top: deg + '%' }">
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
          deg:0,
            animateVal:0 ,
            valArray:[],
          hIndex:-10,
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
            title:"<p>Waist-to-hip</p><p>ratio</p>",
        },
        ru: {
            descriptionText:
            "<p>Ваш индекс соотношения талии к бедрам составляет {WHR}.</p>"+
            "<p>Что соответсвует {coment}</p>",
            com0: "сильному дефициту массы тела",
            com1: "выраженному дефициту массы тела",
            com2: "недостаточной массе тела",
            com3: "нормальной массе тела",
            com4: "избыточной массе тела (предожирение)",
            com5: "ожирению первой степени",
            com6: "ожирению второй степени",
            com7: "ожирению третьей степени (морбидное)",
            title:"<p>Отношение талии</p><p>к бедрам </p>",
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
            title:"<p>Stosunek talii</p><p>do bioder</p>",
        }
    },
    computed:{
        minValue:function () {
            return Math.round(parseFloat(this.rezultData.WHRatioScale[0].Value - (this.rezultData.WHRatioScale[1].Value - this.rezultData.WHRatioScale[0].Value))*100)/100;
        },
        maxValue:function () {
            return this.rezultData.WHRatioScale[this.rezultData.WHRatioScale.length-1].Value;
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
  watch:{
    showDescription:function (old, newVal) {
      let t = this;
      if(old==6){
        this.hIndex=15;
      }else{
        setTimeout(function(){
          t.hIndex=-10;
        },600);
      }
    }
  },
    methods:{
      st(){
        this.start2();
        this.start();
      },
      WHRPresent:function(val){
        if(val<this.minValue){
          return  17;
        }
        if(val>this.maxValue){
          return  82.5;
        }
        return (val - this.minValue) * 65.5 / (this.maxValue - this.minValue) + 17;
      },
      langString(string){
        return this.translate(string);
      },
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
                .start();
            this.animate()
        },
      start2(){
        let t = this;

        t.deg=t.WHRPresent(t.minValue);

        setTimeout(function () {
          t.deg=t.WHRPresent(t.maxValue);
        },700);
        setTimeout(function () {
          t.deg=t.WHRPresent(t.rezultData.WHRatio);
        },1400);
      }
    },
    created: function() {
      this.deg=this.WHRPresent(this.minValue);
        this.animateVal = this.minValue;
        this.valArray.push(this.minValue);
        this.valArray.push(this.maxValue);
        this.valArray.push(this.rezultData.WHRatio);
        var t = this;
        setTimeout(t.start, 4500);
        setTimeout(t.start2, 4500);
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
    top: 102%;
    right: 32%;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.5s ease-in-out;
  }
  .plus:hover, .description.on ~ div .plus{
    transform: rotate(45deg);
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
    transition: opacity 0.5s linear;
  }
  .description.on{
    z-index: 10;
    opacity: 1;
  }
  .description .text{
    max-height: 109px;
    padding: 3px;
    background: rgba(255,255,255,1);
    color: #585858;
  }
  .opacity, .cursor{
    transition: all 0.7s linear;
  }
</style>
