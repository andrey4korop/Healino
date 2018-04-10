<template>
<div class="background">

  <div class="bgMain"
       v-bind:style="{ marginLeft: 'calc(-'+bgpersent +'vw)', width:widthBgImg*7 +'px' }">
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
      :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/11Lg.png'"
     :posBG="{x:60,y:45}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/9Lg.png'"
     :posBG="{x:130,y:60}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/7Lg.png'"
     :posBG="{x:230,y:-10}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/8Lg.png'"
     :posBG="{x:290,y:-12}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/6Lg.png'"
     :posBG="{x:300,y:65}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/5Lg.png'"
     :posBG="{x:400,y:58}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/4Lg.png'"
     :posBG="{x:470,y:30}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/2Lg.png'"
     :posBG="{x:540,y:43}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/3Lg.png'"
     :posBG="{x:550,y:-22}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/8Lg.png'"
     :posBG="{x:590,y:60}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/1Lg.png'"
     :posBG="{x:620,y:-9}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/12Lg.png'"
     :posBG="{x:650,y:51}"
     :posMouse="posMouseB"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="bg"
     :random="randomB"></bg>

 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/7M.png'"
     :posBG="{x:65,y:-10}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/6M.png'"
     :posBG="{x:10,y:60}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/4M.png'"
     :posBG="{x:100,y:50}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/5M.png'"
     :posBG="{x:150,y:-5}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/3M.png'"
     :posBG="{x:180,y:60}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/2M.png'"
     :posBG="{x:230,y:30}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/1M.png'"
     :posBG="{x:270,y:0}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/8M.png'"
     :posBG="{x:350,y:62}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/3M.png'"
     :posBG="{x:420,y:2}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/6M.png'"
     :posBG="{x:490,y:20}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/4M.png'"
     :posBG="{x:537,y:60}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/1M.png'"
     :posBG="{x:604,y:-3}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/8M.png'"
     :posBG="{x:643,y:34}"
     :posMouse="posMouseM"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="randomM"></bg>

 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/17L.png'"
     :posBG="{x:0,y:50}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/14L.png'"
     :posBG="{x:15,y:15}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/15L.png'"
     :posBG="{x:60,y:20}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/16L.png'"
     :posBG="{x:45,y:-5}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/6L.png'"
     :posBG="{x:100,y:50}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/12L.png'"
     :posBG="{x:125,y:1}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/11L.png'"
     :posBG="{x:173,y:2}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/9L.png'"
     :posBG="{x:164,y:80}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/8L.png'"
     :posBG="{x:218,y:16}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/5L.png'"
     :posBG="{x:261,y:47}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/16L.png'"
     :posBG="{x:301,y:76}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/13L.png'"
     :posBG="{x:349,y:3}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/3L.png'"
     :posBG="{x:382,y:57}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/4L.png'"
     :posBG="{x:431,y:15}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/18L.png'"
     :posBG="{x:476,y:86}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/1L.png'"
     :posBG="{x:506,y:-3}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/10L.png'"
     :posBG="{x:524,y:68}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/7L.png'"
     :posBG="{x:559,y:40}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/2L.png'"
     :posBG="{x:587,y:4}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/13L.png'"
     :posBG="{x:632,y:81}"
     :posMouse="posMouseS"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="bg"
     :random="randomS"></bg>
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
            randomB:{x:0,y:0},
            randomM:{x:0,y:0},
            randomS:{x:0,y:0},
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
         return 1.5 * 3420 * this.heightWindow / 1080;
        }
    },
    methods:{
         mousemove(event) {

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
       },
    },
 mounted(){
     let t = this;
   $(window).on('resize',function () {
    t.heightWindow =  window.screen.height;
   })
 },
  created: function() {
     let t = this;

      setTimeout(function(){
          var ns4 = (document.layers)? true:false
          var ie4 = (document.all)? true:false

          if (ns4) {document.captureEvents(Event.MOUSEMOVE);}
          document.onmousemove=t.mousemove;
          t.randomB={x:t.randomInteger(-150,150),y:t.randomInteger(-150,150)};
          t.posMouseB=t.posMouseTemp;
              $('body').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', '.bg.big:nth-child(3n)',
                  function(e) {
                      t.randomB={x:t.randomInteger(-150,150),y:t.randomInteger(-150,150)};
                      t.posMouseB=t.posMouseTemp;
                  })
      },100);
      setTimeout(function(){
          t.randomM={x:t.randomInteger(-150,150),y:t.randomInteger(-150,150)};
          t.posMouseM=t.posMouseTemp;
          $('body').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', '.bg.medium:nth-child(5n)',
              function(e) {
                  t.randomM={x:t.randomInteger(-150,150),y:t.randomInteger(-150,150)};
                  t.posMouseM=t.posMouseTemp;
              })
      },800);
      setTimeout(function(){
          t.randomS={x:t.randomInteger(-150,150),y:t.randomInteger(-150,150)};
          t.posMouseS=t.posMouseTemp;
          $('body').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', '.bg.small:nth-child(5n)',
              function(e) {
                  t.randomS={x:t.randomInteger(-150,150),y:t.randomInteger(-150,150)};
                  t.posMouseS=t.posMouseTemp;
              })
      },1500);
    }
}
</script>

<style scoped>
  .bgMain{
   /* background: url("/static/img/bg40.jpg");*/
    background-repeat: repeat-x;
    position: fixed;
   width: max-content;
    height: 150%;
   transition: all 2s cubic-bezier(.76,0,.5,1);
    transition-delay: 0s;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
   display: flex;
    animation: animationBG 5s ease-out infinite normal;
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
        margin-top: -2.8vw;
    }
    50%{
     margin-top: 0vw;
    }
    to {
     margin-top: -2.8vw;
    }
}
</style>
