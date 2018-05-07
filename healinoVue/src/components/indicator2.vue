<template>
  <div class="indicators">
    <div class="title_indicator" v-html="langString('title')"></div>
    <div class="indicator DaylyCallorie">
      <div class="description" v-bind:style="{zIndex:hIndex}" v-bind:class="(showDescription==2)?'on':''">
        <div class="text"v-lang.descriptionText="{Calorie_Counting: rezultData.DaylyCallorie, Calorie_CountingM: rezultData.DaylyCallorie-500, Calorie_CountingP: rezultData.DaylyCallorie+500,}">
        </div>
      </div>
      <div class="progress_bar3" v-on:click="st">
        <img src="/static/img/indicator_1.png" alt="">
        <div class="plus" v-on:click="$emit('onDescription','2')"><img src="static/img/plus.png" alt=""></div>
        <div class="cursor" v-bind:style="{ transform: 'rotate(' + deg + 'deg)' }"></div>
        <div class="opacity_cursor" v-bind:style="{ transform: 'rotate(' + deg2 + 'deg)' }"></div>
        <div class="opacity_cursor" v-if="curShow" v-bind:style="{ transform: 'rotate(' + deg2 + 'deg)' }" style="background: url(/static/img/indicator_1Cur2.png) no-repeat; background-size: cover;"></div>
        <div class="text_indicator">

          <p>{{animateVal}} Kcal</p>
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
            "<p>The daily requirement for calories is based on the weight, height and age of a person.</p>"+
            "<p>Your daily Calorie requirement is {Calorie_Counting} calories a day.</p>"+
            "<p>If you consume {Calorie_CountingM} calories a day, then your weight will go down by 0.45 kg per week.</p>"+
            "<p>If you consume {Calorie_CountingP} calories a day, then your weight will increase by 0.45 kg per week.</p>",
            title:"<p>&nbsp;</p><p>Calories Burned</p>",
        },
        ru: {
            descriptionText:
            "<p>Дневная потребность в калориях, основана на показателях веса, роста и возраста человека.</p>"+
            "<p>Ваша дневная потребность {Calorie_Counting} калорий в день.</p>"+
            "<p>Если Вы будете потреблять {Calorie_CountingM} калорий в день, то ваш вес будет снижаться на 0,45 кг в неделю.</p>"+
            "<p>Если Вы будете потреблять {Calorie_CountingP} калорий в день, то ваш вес будет увеличиваться на 0,45 кг в неделю.</p>",
            title:"<p>Дневная потребность</p><p>в калориях</p>",
        },
        pl: {
            descriptionText:
            "<p>Dzienne zapotrzebowanie na kalorie zależy od wagi, wzrostu i wieku danej osoby.</p>"+
            "<p>Twoje dzienne zapotrzebowanie na kalorie to {Calorie_Counting} kalorii dziennie.</p>"+
            "<p>Jeśli spożywasz {Calorie_CountingM} kalorii dziennie, Twoja waga spadnie o 0,45 kg na tydzień.</p>"+
            "<p>Jeśli spożywasz {Calorie_CountingP} kalorii dziennie, Twoja waga wzrośnie o 0,45 kg na tydzień.</p>",
            title:"<p>Codzienne zapotrzebowanie</p><p>na kalorie</p>",
        }
    },
    computed:{
        minValue:function () {
          return this.rezultData.CallorieScale[0].Callorie - (this.rezultData.CallorieScale[1].Callorie - this.rezultData.CallorieScale[0].Callorie);
        },
        maxValue:function () {
            return this.rezultData.CallorieScale[this.rezultData.CallorieScale.length-1].Callorie;
        },
        CallorieDeg:function(){
            if(this.animateVal<=this.minValue){
                return 3.6 * 0 -59;
            }
            if(this.animateVal>=this.maxValue){
                return 3.6 * 100 -61;
            }
            //return 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue) -60;
            for(var w=0; w<this.rezultData.CallorieScale.length; w++ ){
                if(this.animateVal < this.rezultData.CallorieScale[w].Callorie){
                    break;
                }
            }
            var howManyDegForScale = 360 / this.rezultData.CallorieScale.length;
            var per;
            if(w>0) {
                per = (this.animateVal - this.rezultData.CallorieScale[w-1].Callorie) / (this.rezultData.CallorieScale[w].Callorie - this.rezultData.CallorieScale[w - 1].Callorie) * howManyDegForScale + howManyDegForScale * (w);
            }else{
                per = (this.animateVal - this.minValue) / (this.rezultData.CallorieScale[w].Callorie - this.minValue) * howManyDegForScale;
            }
            return per-60;
        },

        /*getComent:function () {
            if(this.rezultData.DaylyCallorie > this.maxValue){
                return this.translate( 'com'+(this.rezultData.CallorieScale.length-1));
            }
            let ret = this.translate( 'com0');
            for( let i = 0; i < this.rezultData.CallorieScale.length; i++){
                if(this.rezultData.DaylyCallorie > this.rezultData.CallorieScale[i].Value){
                    ret = this.translate( 'com'+(i+1));
                }else{
                    return ret;
                }
            }
        }*/
    },
  watch:{
    showDescription:function (old, newVal) {
      let t = this;
      if(old==2){
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
      CDeg(val){
        if(val<=this.minValue){
          return 3.6 * 0 -59;
        }
        if(val>=this.maxValue){
          return 3.6 * 100 -61;
        }
        //return 3.6 * (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue) -60;
        for(var w=0; w<this.rezultData.CallorieScale.length; w++ ){
          if(val < this.rezultData.CallorieScale[w].Callorie){
            break;
          }
        }
        var howManyDegForScale = 360 / this.rezultData.CallorieScale.length;
        var per;
        if(w>0) {
          per = (val - this.rezultData.CallorieScale[w-1].Callorie) / (this.rezultData.CallorieScale[w].Callorie - this.rezultData.CallorieScale[w - 1].Callorie) * howManyDegForScale + howManyDegForScale * (w);
        }else{
          per = (val - this.minValue) / (this.rezultData.CallorieScale[w].Callorie - this.minValue) * howManyDegForScale;
        }
        return per-60;
      },
      CallorieDegOp(val) {
        let t = (this.CDeg(val) - (this.CDeg(val)) % 60);
        if(this.CDeg(val)>=0){
          t += 60;
        }
        return t;
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
                     t.animateVal = Math.round(this.tweeningNumber);
                 })
                 .start();
             this.animate()
          },
      start2(){
          let t = this;
          t.deg=t.CDeg(t.minValue);
        t.curShow=true;
          setTimeout(function () {
            t.deg=t.CDeg(t.maxValue);
          },700);
          setTimeout(function () {
            t.deg=t.CDeg(t.rezultData.DaylyCallorie);
          },1400);
        setTimeout(function () {
          t.curShow=false;
        },2150)
      }
    },
  created: function() {
      this.deg = this.deg=this.CDeg(this.minValue);
    this.deg2=this.CallorieDegOp(this.rezultData.DaylyCallorie);
      this.animateVal = this.minValue;
      this.valArray.push(this.minValue);
      this.valArray.push(this.maxValue);
      this.valArray.push(this.rezultData.DaylyCallorie);
      var t = this;
      setTimeout(t.start, 1000);
      setTimeout(t.start2, 1000);
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
    left: -7%;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.5s ease-in-out;
  }
  .plus:hover, .description.on ~ div .plus{
    animation: unset !important;
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);
    transform: rotate(45deg);
  }
  .progress_bar3{
    border-radius: 50%;
    transition: all 0.1s linear;
    position: relative;
  }
  .progress_bar3:hover{
    box-shadow: 0 0 35px rgba(255, 255, 255, 1), inset 0 0 200px rgba(255, 255, 255, 0.5);
  }
  .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    left: 18%;
    top: 0%;
    width: 40vw;
    text-align: left;
    border-radius: 0 15px 15px 15px;
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
    background: url("/static/img/indicator_1Cur.png") no-repeat;
    background-size: cover;
  }
  .cursor, .opacity_cursor{
    transition: all 0.666s linear;
  }
</style>
