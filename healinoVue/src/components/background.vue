<template>
<div class="background">

  <div class="bgMain"
       v-bind:style="{ marginLeft: 'calc(-'+bgpersent +'vw)', width:widthBgImg*7 +'px', top: translate }">
   <img src="/static/img/bg40.jpg" v-bind:style="{width:widthBgImg + 'px'}">
   <img src="/static/img/bg41.jpg" v-bind:style="{width:widthBgImg + 'px'}">
   <img src="/static/img/bg42.jpg" v-bind:style="{width:widthBgImg + 'px'}">
   <img src="/static/img/bg43.jpg" v-bind:style="{width:widthBgImg + 'px'}">
   <img src="/static/img/bg44.jpg" v-bind:style="{width:widthBgImg + 'px'}">
   <img src="/static/img/bg45.jpg" v-bind:style="{width:widthBgImg + 'px'}">
   <img src="/static/img/bg46.jpg" v-bind:style="{width:widthBgImg + 'px'}">
  </div>
  <bg class="big"
      :urlImg="'/static/img/symbols/bSymbols/10Lg.png'"
      :posBG="{x:-20,y:-30}"
      :posMouse="posMouseB"
      :Kof="{x:-0.025,y:-0.025}"
      :bgCurrent="bg"
      :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/11Lg.png'"
     :posBG="{x:60,y:45}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/9Lg.png'"
     :posBG="{x:130,y:60}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/7Lg.png'"
     :posBG="{x:230,y:-10}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/8Lg.png'"
     :posBG="{x:290,y:-12}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/6Lg.png'"
     :posBG="{x:300,y:65}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/5Lg.png'"
     :posBG="{x:400,y:58}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/4Lg.png'"
     :posBG="{x:470,y:30}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/2Lg.png'"
     :posBG="{x:540,y:43}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/3Lg.png'"
     :posBG="{x:550,y:-22}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/8Lg.png'"
     :posBG="{x:590,y:60}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/1Lg.png'"
     :posBG="{x:620,y:-9}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/12Lg.png'"
     :posBG="{x:650,y:51}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="random"></bg>

 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/7M.png'"
     :posBG="{x:65,y:-10}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/6M.png'"
     :posBG="{x:10,y:60}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/4M.png'"
     :posBG="{x:100,y:50}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/5M.png'"
     :posBG="{x:150,y:-5}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/3M.png'"
     :posBG="{x:180,y:60}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/2M.png'"
     :posBG="{x:230,y:30}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/1M.png'"
     :posBG="{x:270,y:0}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/8M.png'"
     :posBG="{x:350,y:62}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/3M.png'"
     :posBG="{x:420,y:2}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/6M.png'"
     :posBG="{x:490,y:20}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/4M.png'"
     :posBG="{x:537,y:60}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/1M.png'"
     :posBG="{x:604,y:-3}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/8M.png'"
     :posBG="{x:643,y:34}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>

 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/17L.png'"
     :posBG="{x:0,y:50}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/14L.png'"
     :posBG="{x:15,y:15}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/15L.png'"
     :posBG="{x:60,y:20}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/16L.png'"
     :posBG="{x:45,y:-5}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/6L.png'"
     :posBG="{x:100,y:50}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/12L.png'"
     :posBG="{x:125,y:1}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/11L.png'"
     :posBG="{x:173,y:2}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/9L.png'"
     :posBG="{x:164,y:80}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/8L.png'"
     :posBG="{x:218,y:16}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/5L.png'"
     :posBG="{x:261,y:47}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/16L.png'"
     :posBG="{x:301,y:76}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/13L.png'"
     :posBG="{x:349,y:3}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/3L.png'"
     :posBG="{x:382,y:57}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/4L.png'"
     :posBG="{x:431,y:15}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/18L.png'"
     :posBG="{x:476,y:86}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/1L.png'"
     :posBG="{x:506,y:-3}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/10L.png'"
     :posBG="{x:524,y:68}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/7L.png'"
     :posBG="{x:559,y:40}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/2L.png'"
     :posBG="{x:587,y:4}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/13L.png'"
     :posBG="{x:632,y:81}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="random"></bg>
</div>
</template>

<script>
export default {
  //name: 'app',
   props: ['bg'],
    data () {
        return {
            posMouseB:{x:0, y:0},
            posMouseM:{x:0, y:0},
            posMouseS:{x:0, y:0},
            posMouseTemp:{x:0, y:0},
            random:{x:0,y:true},
            heightWindow:window.screen.height,
        }
    },
    computed: {
        bgpersent: function () {
            //return (6.64 + ( this.bg * 15.53 ))+'%';
            //return /*6.26 +*/ 14.2856*this.bg;
            return 5 *this.bg /*+ this.posMouseTemp.x / document.body.clientWidth*0.1*/;
        },
        widthBgImg:function () {
         return 1.15 * 3420 * this.heightWindow / 1080;
        },
     translate:function () {
      return (this.random.y)?'0%':'-10%'
     }
    },
    methods:{
        /* mousemove(event) {

           if (document.attachEvent != null) {
               this.posMouseTemp = {x: window.event.clientX, y: window.event.clientY}
           } else if (!document.attachEvent && document.addEventListener) {
               this.posMouseTemp = {x: event.clientX, y: event.clientY}
           }
       },
        randomInteger(min, max) {
           var rand = min - 0.5 + Math.random() * (max - min + 1)
           rand = Math.round(rand);
           return rand;
       },*/
    },
 mounted(){
     let t = this;
   $(window).on('resize',function () {
    t.heightWindow =  window.screen.height;
   })
  setTimeout(function () {
   t.random.y = !t.random.y;
  },200)
  setInterval( function () {
   t.random.y = !t.random.y;
  },4500);
 },
  created: function() {

    }
}
</script>

<style scoped>
 .background{
  position: fixed;
 }
  .bgMain{
    position: fixed;
   width: max-content;
    height: 115vh;
    transition: all 2s cubic-bezier(.76,0,.5,1);
    transition-delay: 0s;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    display: flex;
   /* animation: animationBG 5s ease-out infinite alternate;*/
   transition: all 5s ease-out;
  }
  .bgMain img{
   height: 100%;
   width: auto;
   margin: 0;
   margin-left: -1px;
   padding: 0;
   border: none;
   outline: none;
  }
@keyframes animationBG {
    from {
     /*transform: translateY(0%);
     margin-top:0%;*/
     top:0;
    }
    to {
     /*ransform: translateY(-10%);
     margin-top:-10%;*/
     top:-10%;
    }
}
  /*@keyframes animationBG1 {
    from {
     margin-top:5%;
    }
    to {
     margin-top:-5%;
    }
   }

  @keyframes animationBG2 {
   from {
    margin-top:5%;
   }
   to {
    margin-top:-5%;
   }
  }
  @keyframes animationBG3 {
   from {
    margin-top:5%;
   }
   to {
    margin-top:-5%;
   }
  }*/
  .big{
   height: 640px;
   width: 640px;
   height: 50vw;
   width: 50vw;
   height: 50vmax;
   width: 50vmax;
   transition: all 3s linear;
  }
  .medium{
   height: 390px;
   width: 390px;
   height: 30vw;
   width: 30vw;
   height: 30vmax;
   width: 30vmax;
   transition: all 5s linear;
  }
  .small{
   height: 200px;
   width: 200px;
   height: 15vw;
   width: 15vw;
   height: 15vmax;
   width: 15vmax;
   transition: all 8s linear;
  }
  .animaBG1{
   animation: animationBGBig 30s ease-out infinite normal, animationBG1 5s ease-out infinite alternate;
  }
  .animaBG2{
   animation: animationBGMedium 15s ease-out infinite normal, animationBG2 5s ease-out infinite alternate;
  }
  .animaBG3{
   animation: animationBGSmall 10s ease-out infinite normal, animationBG3 5s ease-out infinite alternate;
  }
  .animaBG4{
   animation: animationBGSmall1 20s ease-out infinite normal, animationBG1 5s ease-out infinite alternate;
  }
  .animaBG5{
   animation: animationBGSmall2 17s ease-out infinite normal, animationBG1 5s ease-out infinite alternate;
  }
  .bg{
   position: fixed;
  }
  .hide{
   display: none;
  }
  @keyframes animationBGBig {
   from {
    transform: rotate(0deg) /*translateY(-40%)*/ translateX(0);
   }
   25%{
    transform: rotate(-15deg) /*translateY(-25%) */translateX(15%);
   }
   50%{
    transform: rotate(-40deg) /*translateY(0)*/ translateX(0);
   }
   75%{
    transform: rotate(-15deg) /*translateY(-25%)*/ translateX(-15%);
   }
   to {
    transform: rotate(0deg) /*translateY(-40%)*/ translateX(0);
   }
  }
  @keyframes animationBGMedium {
   from {
    transform: rotate(0deg) /*translateY(-40%)*/ translateX(0);
   }
   25%{
    transform: rotate(15deg) /*translateY(-25%)*/ translateX(15%);
   }
   50%{
    transform: rotate(40deg) /*translateY(0)*/ translateX(0);
   }
   75%{
    transform: rotate(15deg) /*translateY(-25%)*/ translateX(-15%);
   }
   to {
    transform: rotate(0deg) /*translateY(-40%)*/ translateX(0);
   }
  }
  @keyframes animationBGSmall {
    from {
     transform: rotate(0deg) /*translateY(-40%)*/ translateX(0);
    }
    25%{
     transform: rotate(-15deg) /*translateY(-25%)*/ translateX(-15%);
    }
    50%{
     transform: rotate(-40deg) /*translateY(0)*/ translateX(0);
    }
    75%{
     transform: rotate(-15deg) /*translateY(-25%)*/ translateX(15%);
    }
    to {
     transform: rotate(0deg) /*translateY(-40%)*/ translateX(0);
    }
   }
  @keyframes animationBGSmall1 {
   from {
    transform: rotate(0deg) /*translateY(40%)*/ translateX(0);
   }
   25%{
    transform: rotate(-15deg) /*translateY(25%)*/ translateX(15%);
   }
   50%{
    transform: rotate(-40deg) /*translateY(0)*/ translateX(0);
   }
   75%{
    transform: rotate(-15deg) /*translateY(25%)*/ translateX(-15%);
   }
   to {
    transform: rotate(0deg) /*translateY(40%)*/ translateX(0);
   }
  }
  @keyframes animationBGSmall2 {
   from {
    transform: rotate(0deg) /*translateY(-40%)*/ translateX(0);
   }
   25%{
    transform: rotate(15deg) /*translateY(-25%)*/ translateX(-15%);
   }
   50%{
    transform: rotate(40deg) /*translateY(0)*/ translateX(0);
   }
   75%{
    transform: rotate(15deg) /*translateY(-25%)*/ translateX(15%);
   }
   to {
    transform: rotate(0deg) /*translateY(-40%)*/ translateX(0);
   }
  }
</style>
