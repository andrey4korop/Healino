<template>
  <div class="indicators" v-on:click="start">
    <div class="title_indicator">
      <p>Lean Body</p>
      <p>Mass  </p>
    </div>
    <div class="indicator indicatorLMP">
      <div class="plus" v-on:click="$emit('onDescription','7')"><img src="static/img/plus.png" alt=""></div>
      <div class="description" v-bind:class="(showDescription==7)?'on':''">
        <div class="text" v-lang.descriptionText="{LMP: rezultData.LMP, coment: getComent, ideal:getIdeal}">
        </div>
      </div>
      <div class="progress_bar5">
        <div class="opacity" v-bind:style="{ height: LMPPresent + '%' }"></div>
        <div class="cursor">
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
            animateVal:0 ,
            valArray:[],
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
        },
        ru: {
            descriptionText:
            "<p>Ваш процент мышечной массы в организме составляет {LMP} %.</p>"+
            "<p>Вы относитесь к категории  {coment}</p>"+
            "<p>Ваша идеальный процент мышечной массы должен быть {ideal} %</p>"+
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
        },
        pl: {
            descriptionText:
            "<p>Twój procent masy mięśniowej w ciele wynosi {LMP} %.</p>"+
            "<p>Należysz do kategorii {coment}</p>"+
            "<p>Twój idealny procent masy mięśniowej powinien być{ideal} %</p>"+
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
        }
    },
    computed:{
        minValue:function () {
            return Math.round(parseFloat(this.rezultData.LMPCategoryScale[0].BF - (this.rezultData.LMPCategoryScale[1].BF - this.rezultData.LMPCategoryScale[0].BF))*100)/100;
        },
        maxValue:function () {
            return this.rezultData.LMPCategoryScale[this.rezultData.LMPCategoryScale.length-1].BF;
        },
        LMPPresent:function(){
            if(this.animateVal>this.minValue){
                return 100 - (this.minValue - this.minValue) * 100 / (this.maxValue - this.minValue);
            }
            if(this.animateVal<this.maxValue){
                return 100 - (this.maxValue - this.minValue) * 100 / (this.maxValue - this.minValue);
            }
            return 100 - (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue);
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
        this.valArray.push(this.rezultData.LMP);
        var t = this;
        setTimeout(t.start, 5000);
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
  .progress_bar5{
    border-radius: 23%;
    transition: all 0.1s linear;
  }
  .progress_bar5:hover{
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
    width: 33vw;
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
    max-height: 150px;
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
