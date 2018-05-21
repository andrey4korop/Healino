<template>
  <div class="indicators">
    <div class="title_indicator">
      <p>&nbsp;</p>
      <p v-lang.title></p>
    </div>
    <div class="indicator">

      <div v-if="isActive" class="description" v-bind:style="{zIndex:hIndex}"  v-bind:class="(showDescription==3)?'on':''">
        <div class="text" v-lang.descriptionText="{BMI: rezultData.BMI, coment: getComent}"></div>
      </div>
      <div class="progress_bar4"  v-on:click="st">
        <img src="/static/img/indicator_2.png" alt="">
        <div v-if="isActive" class="plus"v-on:click="$emit('onDescription','3')"><img src="static/img/plus.png" alt=""></div>
        <div v-if="isActive" class="cursor" v-bind:style="{ transform: 'rotate(' + deg + 'deg)' }"></div>
        <div v-if="isActive" class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + deg2 + 'deg)' }"></div>
        <div v-if="isActive && curShow" class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + deg2 + 'deg)' }" style="background: url(/static/img/indicator_2Cur2.png) no-repeat; background-size: cover;"></div>
        <div class="opacity_cursor3" v-if="!isActive" v-on:click="$emit('toTheme')"><p ><i class="fa fa-lock" aria-hidden="true"></i></p></div>
        <div v-if="isActive" class="text_indicator">
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
          deg:0,
          deg2:0,
          curShow:true,
            animateVal:0 ,
            valArray:[],
          hIndex:-10,
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
            title:"Body Mass Index",
          textNonActive:"some text"
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
            title:"Индекс массы тела",
          textNonActive:"some text"
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
            title:"Wskaźnik masy ciała",
          textNonActive:"some text"
        }
    },
    computed:{
      isActive:function () {
        if(this.rezultData.FinishedTests.indexOf(3)>-1){
          return true;
        }else{
          return false;
        }
      },
        minValue:function () {
          return this.rezultData.BMIScale[0].BMI - (this.rezultData.BMIScale[1].BMI - this.rezultData.BMIScale[0].BMI);
        },
        maxValue:function () {
            return this.rezultData.BMIScale[this.rezultData.BMIScale.length-1].BMI;
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
  watch:{
    showDescription:function (old, newVal) {
      let t = this;
      if(old==3){
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
      CallorieDeg(val){
        if(val<=this.minValue){
          return 91 + 3.6 *0;
        }
        if(val>=this.maxValue){
          return 89 + 3.6 *100;
        }
        //return 90 + 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue);

        for(var w=0; w<this.rezultData.BMIScale.length; w++ ){
          if(val < this.rezultData.BMIScale[w].BMI){
            break;
          }
        }
        var howManyDegForScale = 360 / this.rezultData.BMIScale.length;
        var per;
        if(w>0) {
          per = (val - this.rezultData.BMIScale[w-1].BMI) / (this.rezultData.BMIScale[w].BMI - this.rezultData.BMIScale[w - 1].BMI) * howManyDegForScale + howManyDegForScale * (w);
        }else{
          per = (val - this.minValue) / (this.rezultData.BMIScale[w].BMI - this.minValue) * howManyDegForScale;
        }
        return 90+per;
      },
      CallorieDegOp (val) {
        return (this.CallorieDeg(val) - (this.CallorieDeg(val)) % 45)-90 +0.5;
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
        t.deg=t.CallorieDeg(t.minValue);
        t.curShow=true;
        setTimeout(function () {
          t.deg=t.CallorieDeg(t.maxValue);
        },700);
        setTimeout(function () {
          t.deg=t.CallorieDeg(t.rezultData.BMI);
        },1400);
        setTimeout(function () {
          t.curShow=false;
        },2150)
      }
    },
  mounted() {
    if(this.isActive) {
      this.deg = this.deg = this.CallorieDeg(this.minValue);
      this.deg2 = this.CallorieDegOp(this.rezultData.BMI);
      this.animateVal = Math.round(parseFloat(this.minValue) * 100) / 100;
      this.valArray.push(this.minValue);
      this.valArray.push(this.maxValue);
      this.valArray.push(this.rezultData.BMI);
      var t = this;
      setTimeout(t.start, 1500);
      setTimeout(t.start2, 1500);
    }
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
    width: 20%;
    height: 20%;
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
    right: 20%;
    top: 4%;
    width: 40vw;
    text-align: left;
    border-radius: 15px 0 15px 15px;
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
  .cursor, .opacity_cursor{
    transition: all 0.666s linear;
  }
  .opacity_cursor3{
    position: absolute;
    top:0%;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background: url("/static/img/indicator_3Cur_op.png") no-repeat;
    background-size: cover;
    text-align: center;
    color: #000;
    display: flex;
    flex-direction: column;
  }
  .opacity_cursor3 p{
    margin: auto;
  }
</style>
