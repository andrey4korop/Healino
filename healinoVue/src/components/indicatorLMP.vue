<template>
  <div class="indicators" v-on:click="st">
    <div class="title_indicator">
      <p></p>
      <p v-lang.title></p>
    </div>
    <div class="indicator indicatorLMP">

      <div v-if="isActive" class="description" v-bind:style="{zIndex:hIndex}"  v-bind:class="(showDescription==7)?'on':''">
        <div class="text" v-lang.descriptionText="{LMP: rezultData.LMP, coment: getComent, ideal:getIdeal}">
        </div>
      </div>
      <div class="progress_bar5">
        <img src="/static/img/indicator_5.png" alt="">
        <div v-if="isActive" class="plus" v-on:click="$emit('onDescription','7')"><img src="static/img/plus.png" alt=""></div>
        <div v-if="isActive" class="opacity" v-bind:style="{ height: deg + '%' }"></div>
        <div class="opacity_cursor3" v-if="!isActive" v-on:click="$emit('toTheme')"><p ><i class="fa fa-lock" aria-hidden="true"></i></p></div>
        <div v-if="isActive" class="cursor" v-bind:style="{ top: deg + '%' }">
          <img src="static/img/cursor_4.png" alt="">
          <div>
            <p class="big">{{animateVal}}%</p>

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
            "<p>Your percentage of Lean Mass in the body is {LMP} %.</p>"+
            "<p>You belong to the category {coment}</p>"+
            "<p>Your ideal percentage of Lean Mass should be {ideal} %</p>"+
            "<p>Note: that results of these calculations are only an estimate. For more accurate measurements, the use of instruments such as bioelectric impedance analysis or hydrostatic density testing is necessary.</p>",
            com0: "Essential fat",
            com1: "Athletes",
            com2: "Ideal",
            com3: "Fitness",
            com4: "Average",
            com5: "Overweight",
            com6: "Obese Class I",
            com7: "Obese Class II",
            com8: "Obese Class III",
            title:"Lean Mass Percentage",
          textNonActive:"some text"
        },
        ru: {
            descriptionText:
            "<p>Ваш процент мышечной массы в организме составляет {LMP} %.</p>"+
            "<p>Вы относитесь к категории {coment}</p>"+
            "<p>Ваш идеальный процент мышечной массы должен быть {ideal} %</p>"+
            "<p>Оговорка: Результаты этих расчетов являются лишь приблизительной оценкой. Для более точных измерений необходимо использовать биоэлектрический импедансный анализ.</p>",
            com0: "Недостаток жира",
            com1: "Спортсмен",
            com2: "Идеал",
            com3: "Фитнес",
            com4: "Средний",
            com5: "Избыточный вес",
            com6: "Ожирение I класса",
            com7: "Ожирение II класса",
            com8: "Ожирение III класса",
            title:"Мышечная масса",
          textNonActive:"some text"
        },
        pl: {
            descriptionText:
            "<p>Twój procent masy mięśniowej w ciele wynosi {LMP} %.</p>"+
            "<p>Należysz do kategorii {coment}</p>"+
            "<p>Twój idealny procent masy mięśniowej powinien być {ideal} %</p>"+
            "<p>Zastrzeżenie: wyniki tych obliczeń są jedynie przybliżonym szacunkiem. W celu dokładniejszego pomiaru należy zastosować analizę impedancji bioelektrycznej.</p>",
            com0: "Brak tłuszczu",
            com1: "Sportowiec",
            com2: "Idealny",
            com3: "Fitness",
            com4: "Średni",
            com5: "Nadwaga",
            com6: "Otyłość klasy I.",
            com7: "Otyłość klasy II",
            com8: "Otyłość stopnia III",
            title:"Masa mięśniowa",
          textNonActive:"some text"
        }
    },
    computed:{
      isActive:function () {
        if(true){
          return true;
        }else{
          return false;
        }
      },
        minValue:function () {
            return Math.round(parseFloat(this.rezultData.LMPCategoryScale[0].BF - (this.rezultData.LMPCategoryScale[1].BF - this.rezultData.LMPCategoryScale[0].BF))*100)/100;
        },
        maxValue:function () {
            return this.rezultData.LMPCategoryScale[this.rezultData.LMPCategoryScale.length-1].BF;
        },

        getComent:function () {
            if(this.rezultData.LMP < this.maxValue){
                return this.translate( 'com'+(this.rezultData.LMPCategoryScale.length-1));
            }
            let ret = this.translate( 'com0');
            for( let i = 0; i < this.rezultData.LMPCategoryScale.length; i++){
                if(this.rezultData.LMP < this.rezultData.LMPCategoryScale[i].BF){
                    ret = this.translate( 'com'+(i+1));
                }else{
                    return ret;
                }
            }
        },
        getIdeal:function () {
            return this.rezultData.LMPCategoryScale[1].BF
        }

    },
  watch:{
    showDescription:function (old, newVal) {
      let t = this;
      if(old==7){
        this.hIndex=15;
      }else{
        setTimeout(function(){
          t.hIndex=-10;
        },600);
      }
    }
  },
    methods:{
      LMPPresent(val){
        if(val>this.minValue){
          return 100 - (this.minValue - this.minValue) * 100 / (this.maxValue - this.minValue);
        }
        if(val<this.maxValue){
          return 100 - (this.maxValue - this.minValue) * 100 / (this.maxValue - this.minValue);
        }
        return 100 - (val - this.minValue) * 100 / (this.maxValue - this.minValue);
      },
        animate () {
            if (TWEEN.update()) {
                requestAnimationFrame(this.animate)
            }
        },
      st(){
        this.start2();
        this.start();
      },
        start(){
            var t = this;
            new TWEEN.Tween({ tweeningNumber: this.animateVal })
                .easing(TWEEN.Easing.Quadratic.InOut)
                .interpolation( TWEEN.Interpolation.Linear)
                .to({ tweeningNumber: this.valArray }, 2000)
                .onUpdate(function () {
                    t.animateVal = Math.round(parseFloat(this.tweeningNumber)*10)/10;
                })
                .start();
            this.animate()
        },
      start2(){
          let t = this;

          t.deg=t.LMPPresent(t.maxValue);

          setTimeout(function () {
            t.deg=t.LMPPresent(t.minValue);
          },700);
        setTimeout(function () {
          t.deg=t.LMPPresent(t.rezultData.LMP);
        },1400);
      }
    },
  mounted() {
    if(this.isActive) {
      this.animateVal = this.minValue;
      this.valArray.push(this.minValue);
      this.valArray.push(this.maxValue);
      this.valArray.push(this.rezultData.LMP);
      var t = this;
      setTimeout(t.start, 5000);
      setTimeout(t.start2, 5000);
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
    width: 30%;
    height: 10%;
    position: absolute;
    bottom: -12%;
    right: 32%;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.5s ease-in-out;
  }
  .plus:hover, .description.on ~ div .plus{
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);
    animation: unset !important;
    transform: rotate(45deg);
  }
  .progress_bar5{
    border-radius: 23%;
    transition: all 0.1s linear;
    box-sizing: border-box;
  }
  .progress_bar5:hover{
    box-shadow: 0 0 20px rgba(255, 255, 255, 1), inset 0 0 40px rgba(255, 255, 255, 0.7)
  }
  .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    left: 50%;
    top: 115%;
    width: 50vw;
    text-align: left;
    border-radius: 0 15px 15px 15px;
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
    padding: 3px;
    background: rgba(255,255,255,1);
    color: #585858;
  }
  .opacity, .cursor{
    transition: all 0.7s linear;
  }
  .opacity_cursor3{
    position: absolute;
    top:0%;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background: url("/static/img/opasity22.png") no-repeat;
    background-size: cover;
    text-align: center;
    color: #000;
    display: flex;
  }
  .opacity_cursor3 p{
    margin: auto;
  }
</style>
