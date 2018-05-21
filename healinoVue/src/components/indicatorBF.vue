<template>
  <div class="indicators">
    <div class="title_indicator">
      <p v-lang.title></p>
    </div>
    <div class="indicator indicatorBF">
      <div v-if="isActive" class="description" v-bind:style="{zIndex:hIndex}"  v-bind:class="(showDescription==8)?'on':''">
        <div class="text" v-lang.descriptionText="{BFP: rezultData.BFP, coment: getComent, ideal: getIdeal}"></div>
      </div>
      <div class="progress_bar1" v-on:click="st">
        <img src="static/img/indicator_6.png" alt="">
        <div  v-if="isActive" class="plus" v-on:click="$emit('onDescription','8')"><img src="static/img/plus.png" alt=""></div>
        <img  v-if="isActive" src="static/img/cursor_1.png" alt="" class="cursor"
             v-bind:style="{ left: deg + '%' }">
        <div  v-if="isActive && !curShow" class="opacity_cursor" v-bind:style="{ width: 'calc('+BFPDegOp + '% + 1px)' }"></div>
        <div  v-if="isActive && !curShow" class="opacity_cursor2" v-bind:style="{ width: 'calc('+BFPDegOp2 + '% + 1px)' }"></div>
        <div v-if="isActive && curShow" class="opacity_cursor2" style="width: calc(100% + 1px);"></div>
        <div class="opacity_cursor3" v-if="!isActive" v-on:click="$emit('toTheme')"><p ><i class="fa fa-lock" aria-hidden="true"></i></p></div>
        <span  v-if="isActive" class="percent" v-bind:style="{ left: deg + '%' }">{{animateVal}}%</span>
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
          hIndex:-10,
          curShow:true,
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
            title:"Body Fat Percentage",
          textNonActive:"some text"
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
            title:"Процент жировой ткани",
          textNonActive:"some text"
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
            title:"Odsetek tkanki tłuszczowej",
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
            return Math.round(parseFloat(this.rezultData.BFCategoryScale[0].BF - (this.rezultData.BFCategoryScale[1].BF - this.rezultData.BFCategoryScale[0].BF))*100)/100;
        },
        maxValue:function () {
            return this.rezultData.BFCategoryScale[this.rezultData.BFCategoryScale.length-1].BF;
        },
        BFPDeg:function(){
            if(this.rezultData.BFP<=this.minValue){
                return 0;
            }
            if(this.rezultData.BFP>=this.maxValue){
                return 100;
            }
            //return (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue)+2;
            for(var w=0; w<this.rezultData.BFCategoryScale.length; w++ ){
                if(this.rezultData.BFP < this.rezultData.BFCategoryScale[w].BF){
                    break;
                }
            }
            var howManyDegForScale = 100 / this.rezultData.BFCategoryScale.length;
            var per;
            if(w>0) {
                per = (this.rezultData.BFP - this.rezultData.BFCategoryScale[w-1].BF) / (this.rezultData.BFCategoryScale[w].BF - this.rezultData.BFCategoryScale[w - 1].BF) * howManyDegForScale + howManyDegForScale * (w);
            }else{
                per = (this.rezultData.BFP - this.minValue) / (this.rezultData.BFCategoryScale[w].BF - this.minValue) * howManyDegForScale;
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
  watch:{
    showDescription:function (old, newVal) {
      let t = this;
      if(old==8){
        this.hIndex=15;
      }else{
        setTimeout(function(){
          t.hIndex=-10;
        },600);
      }
    }
  },
    methods:{
      BDeg:function(val){
        if(val<=this.minValue){
          return 0;
        }
        if(val>=this.maxValue){
          return 100;
        }
        //return (this.animateVal - this.minValue) * 100 / (this.maxValue - this.minValue)+2;
        for(var w=0; w<this.rezultData.BFCategoryScale.length; w++ ){
          if(val < this.rezultData.BFCategoryScale[w].BF){
            break;
          }
        }
        var howManyDegForScale = 100 / this.rezultData.BFCategoryScale.length;
        var per;
        if(w>0) {
          per = (val - this.rezultData.BFCategoryScale[w-1].BF) / (this.rezultData.BFCategoryScale[w].BF - this.rezultData.BFCategoryScale[w - 1].BF) * howManyDegForScale + howManyDegForScale * (w);
        }else{
          per = (val - this.minValue) / (this.rezultData.BFCategoryScale[w].BF - this.minValue) * howManyDegForScale;
        }
        return per;
      },
      st(){
        this.start2();
        this.start();
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
        t.deg = t.BDeg(t.minValue);
        t.curShow = true;

        setTimeout(function () {
          t.deg = t.BDeg(t.maxValue);
        }, 700);
        setTimeout(function () {
          t.deg = t.BDeg(t.rezultData.BFP);
        }, 1400);
        setTimeout(function () {
          t.curShow = false;
        }, 2150)
      },
    },
    created: function() {
      if(this.isActive) {
        this.deg = this.deg = this.BDeg(this.minValue);
        this.animateVal = this.minValue;
        this.valArray.push(this.minValue);
        this.valArray.push(this.maxValue);
        this.valArray.push(this.rezultData.BFP);
        var t = this;
        setTimeout(t.start, 5500);
        setTimeout(t.start2, 5500);
      }
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
    transition: all 0.5s ease-in-out;
    position: absolute;
    top: -90%;
    left: 100%;
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
  .plus:hover, .description.on ~ div .plus{
    box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5);
    animation: unset !important;
    transform: rotate(45deg);
  }
  .progress_bar1{
    margin-top: 16px;
    border-radius: 15%;
    transition: all 0.1s linear;

    position: relative;
  }
  .progress_bar1:hover{
    box-shadow: 0 0 20px rgba(255, 255, 255, 1), inset 0 0 40px rgba(255, 255, 255, 0.7)
  }
  .cursor{
    top: -11px
  }

  .progress_bar1 .shkala-1, .progress_bar1 .shkala-2, .progress_bar1 .shkala-3 {
    bottom: 0;
  }
  .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    right: 1%;
    bottom: 140%;
    width: 40vw;
    text-align: left;
    border-radius: 15px 15px 0 15px;
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
  @media screen and (max-width: 760px){
    .opacity_cursor2, .opacity_cursor{
      top:0;
      /*height: 5.7vw;*/
    }
  }
  .opacity_cursor2 img{
    height: 100%;
  }
  .opacity_cursor3{
    position: absolute;
    top:0%;
    left: -1px;
    width: calc(100% + 2px);
    height: 100%;
    opacity: 0.8;
    background: url("/static/img/indicator_6Cur_op.png") no-repeat;
    background-size: cover;
    text-align: center;
    color: #000;
    display: flex;
  }
  .opacity_cursor3 p{
    margin: auto;
  }
  .opacity_cursor3, .percent, .cursor{
    transition: all 0.666s linear;
  }
</style>
