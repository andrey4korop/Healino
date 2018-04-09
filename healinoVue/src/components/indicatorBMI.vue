<template>
  <div class="indicators">
    <div class="title_indicator">
      <p>BMI</p>
      <p>(body mass index)</p>
    </div>
    <div class="indicator">

      <div class="description" v-bind:class="(showDescription==3)?'on':''">
        <div class="text" v-lang.descriptionText="{BMI: rezultData.BMI, coment: getComent}"></div>
      </div>
      <div class="progress_bar4" v-on:click="start">
        <img src="/static/img/indicator_2.png" alt="">
        <div class="plus"v-on:click="$emit('onDescription','3')"><img src="static/img/plus.png" alt=""></div>
        <div class="cursor" v-bind:style="{ transform: 'rotate(' + CallorieDeg + 'deg)' }"></div>
        <div class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + CallorieDegOp + 'deg)' }">

        </div>
        <div class="text_indicator">
          <p class="big">{{animateVal}}</p>
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
            "<p>The overall indicator determining the completeness and physique of a person, is based on weight and height and is determined for different ages of a person.</p>"+
            "<p>Your BMI is {BMI} that corresponds to {coment}</p>",
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
            "<p>Общий показатель определяющий полноту и телосложение, основан на показателях веса и роста, и определен для разного возраста человека.</p>"+
            "<p>Ваше значение {BMI} что соотвествует {coment}</p>",
            com0: "сильному дефициту массы тела",
            com1: "выраженному дефициту массы тела",
            com2: "недостаточной массе тела",
            com3: "нормальной массе тела",
            com4: "избыточной массе тела (предожирение)",
            com5: "ожирению первой степени",
            com6: "ожирению второй степени",
            com7: "ожирению третьей степени (морбидное)",
        },
        pl: {
            descriptionText:
            "<p>Ogólny wskaźnik określający kompletność i budowę ciała, jest oparty na wadze i wysokości i jest określany dla różnych grup wiekowych.</p>"+
            "<p>Twoj BMI {BMI} odpowiada {coment}</p>",
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
          return this.rezultData.BMIScale[0].BMI - (this.rezultData.BMIScale[1].BMI - this.rezultData.BMIScale[0].BMI);
        },
        maxValue:function () {
            return this.rezultData.BMIScale[this.rezultData.BMIScale.length-1].BMI;
        },
        CallorieDeg:function(){
            if(this.animateVal<=this.minValue){
                return 91 + 3.6 *0;
            }
            if(this.animateVal>=this.maxValue){
                return 89 + 3.6 *100;
            }
            //return 90 + 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue);

            for(var w=0; w<this.rezultData.BMIScale.length; w++ ){
              if(this.animateVal < this.rezultData.BMIScale[w].BMI){
                  break;
              }
            }
            var howManyDegForScale = 360 / this.rezultData.BMIScale.length;
            var per;
            if(w>0) {
                per = (this.animateVal - this.rezultData.BMIScale[w-1].BMI) / (this.rezultData.BMIScale[w].BMI - this.rezultData.BMIScale[w - 1].BMI) * howManyDegForScale + howManyDegForScale * (w);
            }else{
                 per = (this.animateVal - this.minValue) / (this.rezultData.BMIScale[w].BMI - this.minValue) * howManyDegForScale;
            }
            return 90+per;
        },
        CallorieDegOp:function () {
          return (this.CallorieDeg - (this.CallorieDeg) % 45)-90 +0.5;
        },
        getComent:function () {
            if(this.rezultData.BMI > this.maxValue){
                return this.translate( 'com'+(this.rezultData.BMIScale.length-1));
            }
            let ret = this.translate( 'com0');
            for( let i = 0; i < this.rezultData.BMIScale.length; i++){
                if(this.rezultData.BMI > this.rezultData.BMIScale[i].BMI){
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
      this.valArray.push(this.rezultData.BMI);
      var t = this;
      setTimeout(t.start, 1500);
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
    width: 15%;
    height: 15%;
    position: absolute;
    top: -7%;
    right: -7%;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.5s ease-in-out;
  }
  .plus:hover, .description.on ~ div .plus{
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);
    animation: unset !important;
    transform: rotate(45deg);
  }
  .progress_bar4{
    border-radius: 50%;
    transition: all 0.1s linear;
    position: relative;
  }
  .progress_bar4:hover{
    box-shadow: 0 0 35px rgba(255, 255, 255, 1), inset 0 0 200px rgba(255, 255, 255, 0.5);
  }
  .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    left: 112%;
    bottom: 104%;
    width: 22vw;
    text-align: left;
    border-radius: 15px 15px 15px 0;
    padding: 15px;
    z-index: -10;
    opacity: 0;
    transition: all 0.5s linear;
  }
  .description.on{
    z-index: 15;
    opacity: 1;
  }
  .description .text{
    overflow-x: hidden;
    overflow-y: auto;
    padding: 3px;
    background: rgba(255,255,255,1);
    color: #585858;
  }
  .opacity_cursor{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: url("/static/img/indicator_2Cur.png") no-repeat;
    background-size: cover;
  }
</style>
