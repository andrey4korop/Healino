<template>

  <div class="avatar_scale"v-on:click="start">
    <div class="description" v-bind:style="{zIndex:hIndex}" v-bind:class="(showDescription==1)?'on':''">
      <div class="text" v-lang.descriptionText="{THR: rezultData.HealthRate, THR_Comment: getComent}">

      </div>
    </div>
    <div class="plus" v-on:click="$emit('onDescription','1')"><img src="static/img/plus.png" alt=""></div>
    <img src="static/img/cursor_2.png" alt="" class="cursor"
         v-bind:style="{ transform: 'rotate(' + HealthRateDeg + 'deg)' }">
    <div class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + HealthRateDegOp + 'deg)' }"></div>
    <div class="avatar">
      <div v-bind:style="{background: 'url(' + img + ') center center / cover' }" class="img" ></div>
    </div>
    <h1 v-lang.title></h1>
  </div>

</template>

<script>
export default {
    props: ['rezultData', 'img', 'showDescription'],
    data () {
        return {
            animateVal:0 ,
            valArray:[],
          hIndex:-10,
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
          title:"Index deviations from the norm (IDN)",
        },
        ru: {
            descriptionText: "<p>Ваш интегрированный индекс отклонения от нормативов составляет {THR}%.</p><p>Что соответсвует {THR_Comment}</p>",
            com0: "очень хорошему здоровью",
            com1: "хорошему здоровью",
            com2: "среднему здоровью",
            com3: "слабому здоровью",
            com4: "вероятной болезни",
            com5: "болезни",
            com6: "серьезной болезни",
          title:"Индекс отклонений от нормативов",
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
          title:"Indeks odchyleń od norm",
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
                return 3.6 *(this.minValue - this.minValue) * 100 / (this.maxValue - this.minValue) +78;
            }
            if(this.animateVal>this.maxValue){
                return 3.6 *(this.maxValue - this.minValue) * 100 / (this.maxValue - this.minValue) +78;
            }
            return 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue) +78;
        },
        HealthRateDegOp:function(){
            let t = (this.HealthRateDeg -78 - (this.HealthRateDeg-78) % (360/7));

            return t;
        },
        getComent:function () {
            if(this.rezultData.HealthRate > this.maxValue){
                return this.translate( 'com'+(this.rezultData.HealthRatioScale.length-1));
            }
            let ret = this.translate( 'com0');
            for( let i = 0; i < this.rezultData.HealthRatioScale.length; i++){
               if(this.rezultData.HealthRate > this.rezultData.HealthRatioScale[i].Value){
                  ret = this.translate( 'com'+(i+1));
               }else{
                   return ret;
               }
            }
        }
    },
  watch:{
    showDescription:function (old, newVal) {
      if(old==1){
        this.hIndex=10;
      }else{
        setTimeout(()=>{
          this.hIndex=-10;
        },600);
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
    width: 25%;
    height: 25%;
    position: absolute;
    top: -5%;
    right: -25%;
    border-radius: 25%;
    z-index: 1;
    transition: all 0.5s ease-in-out;
  }
  .plus:hover, .description.on ~ .plus{
    animation: unset !important;
    box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5);
    transform: rotate(45deg);
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
    margin: 3vw 0 1.5vw 0;
    border-radius: 50%;
    transition: all 0.1s linear;
    display: flex;
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
    margin: auto;
    width: 85%;
    height: 85%;
  }
  .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    left: 134%;
    top: 4%;
    width: 25vw;
    text-align: left;
    border-radius: 0px 15px 15px 15px;
    padding: 15px;
    z-index: -10;
    opacity: 0;
    transition: opacity 0.5s linear;
  }
  .description.on{
    z-index: 15;
    opacity: 1;
  }
  .description .text{
    max-height: 109px;
    padding: 3px;
    background: rgba(255,255,255,1);
    color: #585858;
  }
  h1{
    position: absolute;
    bottom: 105%;
    left: -15vw;
    right: -15vw;
    text-align: center;
    font-size: 14px;
  }
  @media screen and (max-width: 760px){
    h1 {
      font-size: 2vw;
    }
  }
  @media screen and (max-height: 768px), (orientation: landscape){
    .avatar_scale{
      width: 6.5vw;
      height: 6.5vw;
      margin: 2vw 0 0.5vw 0;
    }
  }
</style>
