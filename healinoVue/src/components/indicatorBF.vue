<template>
  <div class="indicators">
    <div class="title_indicator">
      <p>Body Fat Percentage</p>
    </div>
    <div class="indicator indicatorBF">
      <div class="plus" v-on:click="$emit('onDescription','8')"><img src="static/img/plus.png" alt=""></div>
      <div class="description" v-bind:class="(showDescription==8)?'on':''">
        <div class="text" v-lang.descriptionText="{BFP: rezultData.BFP, coment: getComent, ideal: getIdeal}"></div>
      </div>
      <div class="progress_bar1" v-on:click="start">
        <img src="static/img/cursor_1.png" alt="" class="cursor"
             v-bind:style="{ left: BFPDeg + '%' }">
        <div class="opacity_cursor" v-bind:style="{ width: BFPDegOp + '%' }">

        </div>
        <div class="opacity_cursor2" v-bind:style="{ width: BFPDegOp2 + '%' }">

        </div>
        <span class="percent" v-bind:style="{ left: BFPDeg + '%' }">{{animateVal}}%</span>
        <!--<span class="shkala-1">10%</span>
        <span class="shkala-2">18%</span>
        <span class="shkala-3">24%</span>-->
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
            "<p>Your body fat percentage is {BFP}%. </p>"+
            "<p>You belong to the category {coment} </p>"+
            "<p>Your ideal percentage of fat {ideal}%</p>"+
            "<p>Note: that results of these calculations are only an estimate. For more accurate measurements of body fat, the use of instruments such as bioelectric impedance analysis or hydrostatic density testing is necessary.</p>",
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
            "<p>Ваш процент жира в организме составляет {BFP}%. </p>"+
            "<p>Вы относитесь к категории {coment} </p>"+
            "<p>Ваш идеальный процент жира {ideal}%</p>"+
            "<p>Оговорка: Результаты этих расчетов являются лишь приблизительной оценкой. Для более точных измерений жировых отложений необходимо использовать биоэлектрический импедансный анализ.</p>",
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
            "<p>Procent tkanki tłuszczowej wynosi {BFP}%. </p>"+
            "<p>Należysz do kategorii {coment} </p>"+
            "<p>Twój idealny procent tłuszczu {ideal}%</p>"+
            "<p>Zastrzeżenie: wyniki tych obliczeń są jedynie przybliżonym szacunkiem. W celu dokładniejszego pomiaru tkanki tłuszczowej należy zastosować analizę impedancji bioelektrycznej.</p>",
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
            return Math.round(parseFloat(this.rezultData.BFCategoryScale[0].BF - (this.rezultData.BFCategoryScale[1].BF - this.rezultData.BFCategoryScale[0].BF))*100)/100;
        },
        maxValue:function () {
            return this.rezultData.BFCategoryScale[this.rezultData.BFCategoryScale.length-1].BF;
        },
        BFPDeg:function(){
            if(this.animateVal<=this.minValue){
                return 0+1;
            }
            if(this.animateVal>=this.maxValue){
                return 100-1;
            }
            //return (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue)+2;
            for(var w=0; w<this.rezultData.BFCategoryScale.length; w++ ){
                if(this.animateVal < this.rezultData.BFCategoryScale[w].BF){
                    break;
                }
            }
            var howManyDegForScale = 100 / this.rezultData.BFCategoryScale.length;
            var per;
            if(w>0) {
                per = (this.animateVal - this.rezultData.BFCategoryScale[w-1].BF) / (this.rezultData.BFCategoryScale[w].BF - this.rezultData.BFCategoryScale[w - 1].BF) * howManyDegForScale + howManyDegForScale * (w);
            }else{
                per = (this.animateVal - this.minValue) / (this.rezultData.BFCategoryScale[w].BF - this.minValue) * howManyDegForScale;
            }
            return per;
        },
        BFPDegOp:function(){
            let t = (this.BFPDeg- (this.BFPDeg) % (100/9));
            if(t < 100/9){
                t=0;
            }
            if(t > 100/9*8){
                t=100/9*8;
            }
            return t;

        },
        BFPDegOp2:function(){


            return 100 - this.BFPDegOp - 100/9;
        },
        getComent:function () {
            if(this.rezultData.BFP > this.maxValue){
                return this.translate( 'com'+(this.rezultData.BFCategoryScale.length-1));
            }
            let ret = this.translate( 'com0');
            for( let i = 0; i < this.rezultData.BFCategoryScale.length; i++){
                if(this.rezultData.BFP > this.rezultData.BFCategoryScale[i].BF){
                    ret = this.translate( 'com'+(i+1));
                }else{
                    return ret;
                }
            }
        },
        getIdeal:function () {
            return this.rezultData.BFCategoryScale[1].BF
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
        this.valArray.push(this.rezultData.BFP);
        var t = this;
        setTimeout(t.start, 5500);
    },
}
</script>

<style scoped>
  .indicator{
    position: relative;
  }
  .plus{
    width: 5%;
    height: 80%;
    transition: all 1.5s ease-in-out;
    position: absolute;
    top: -90%;
    right: 4%;
    border-radius: 25%;
    z-index: 1;
  }
  .indicator:hover .plus{
    animation: anima 2s infinite ease-in-out;
  }
  @keyframes anima {
    from {box-shadow: unset;}
    50% { box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5)}
    to {box-shadow: unset;}
  }
  .plus:hover{
    box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5);
    animation: unset !important;
  }
  .progress_bar1{
    margin-top: 16px;
    border-radius: 15%;
    transition: all 0.1s linear;
    height: 31px;

    position: relative;
  }
  .progress_bar1:hover{
    box-shadow: 0 0 20px rgba(255, 255, 255, 1), inset 0 0 40px rgba(255, 255, 255, 0.7)
  }
  .cursor{
    top: -11px
  }
  .percent{
    top: -42px
  }
  .progress_bar1 .shkala-1, .progress_bar1 .shkala-2, .progress_bar1 .shkala-3 {
    bottom: 0;
  }
  .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    left: 100%;
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
  .opacity_cursor{
    position: absolute;
    top:0%;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: url("/static/img/indicator_6Cur.png") no-repeat;
    background-size: cover;
  }
  .opacity_cursor img{
    height: 100%;
  }
  .opacity_cursor2{
    position: absolute;
    top:0%;
    right: -1px;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    transform: rotate(180deg);
    background: url("/static/img/indicator_6Cur.png") no-repeat;
    background-size: cover;
  }
  @media screen and (max-width: 780px){
    .opacity_cursor2, .opacity_cursor{
      top:0;
      height: 5.7vw;
    }
  }
  .opacity_cursor2 img{
    height: 100%;
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
