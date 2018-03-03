<template>
<div class="background">

  <div class="bgMain"
       v-bind:style="{ backgroundPositionX: 'calc('+bgpersent +'%)' }">

  </div>
  <bg class="big"
      :urlImg="'/static/img/symbols/bSymbols/10Lg.png'"
      :posBG="{x:-20,y:-30}"
      :posMouse="posMouse"
      :Kof="{x:-0.025,y:-0.025}"
      :bgCurrent="animatebg"
      :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/11Lg.png'"
     :posBG="{x:60,y:45}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/9Lg.png'"
     :posBG="{x:130,y:60}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/7Lg.png'"
     :posBG="{x:230,y:-10}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/8Lg.png'"
     :posBG="{x:290,y:-12}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/6Lg.png'"
     :posBG="{x:300,y:65}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/5Lg.png'"
     :posBG="{x:400,y:58}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/4Lg.png'"
     :posBG="{x:470,y:30}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/2Lg.png'"
     :posBG="{x:540,y:43}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/3Lg.png'"
     :posBG="{x:550,y:-22}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/8Lg.png'"
     :posBG="{x:590,y:60}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/1Lg.png'"
     :posBG="{x:620,y:-9}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="big"
     :urlImg="'/static/img/symbols/bSymbols/12Lg.png'"
     :posBG="{x:650,y:51}"
     :posMouse="posMouse"
     :Kof="{x:-0.025,y:-0.025}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>

 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/7M.png'"
     :posBG="{x:65,y:-10}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/6M.png'"
     :posBG="{x:10,y:60}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/4M.png'"
     :posBG="{x:100,y:50}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/5M.png'"
     :posBG="{x:150,y:-5}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/3M.png'"
     :posBG="{x:180,y:60}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/2M.png'"
     :posBG="{x:230,y:30}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/1M.png'"
     :posBG="{x:270,y:0}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/8M.png'"
     :posBG="{x:350,y:62}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/3M.png'"
     :posBG="{x:420,y:2}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/6M.png'"
     :posBG="{x:490,y:20}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/4M.png'"
     :posBG="{x:537,y:60}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/1M.png'"
     :posBG="{x:604,y:-3}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="medium"
     :urlImg="'/static/img/symbols/mSymbols/8M.png'"
     :posBG="{x:643,y:34}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>

 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/17L.png'"
     :posBG="{x:0,y:50}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/14L.png'"
     :posBG="{x:15,y:15}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/15L.png'"
     :posBG="{x:60,y:20}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/16L.png'"
     :posBG="{x:45,y:-5}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/6L.png'"
     :posBG="{x:100,y:50}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/12L.png'"
     :posBG="{x:125,y:1}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/11L.png'"
     :posBG="{x:173,y:2}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/9L.png'"
     :posBG="{x:164,y:80}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/8L.png'"
     :posBG="{x:218,y:16}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/5L.png'"
     :posBG="{x:261,y:47}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/16L.png'"
     :posBG="{x:301,y:76}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/13L.png'"
     :posBG="{x:349,y:3}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/3L.png'"
     :posBG="{x:382,y:57}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/4L.png'"
     :posBG="{x:431,y:15}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/18L.png'"
     :posBG="{x:476,y:86}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/1L.png'"
     :posBG="{x:506,y:-3}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/10L.png'"
     :posBG="{x:524,y:68}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/7L.png'"
     :posBG="{x:559,y:40}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/2L.png'"
     :posBG="{x:587,y:4}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
 <bg class="small"
     :urlImg="'/static/img/symbols/lSymbols/13L.png'"
     :posBG="{x:632,y:81}"
     :posMouse="posMouse"
     :Kof="{x:-0.012,y:-0.012}"
     :bgCurrent="animatebg"
     :random="animateVal"></bg>
</div>
</template>

<script>
export default {
  //name: 'app',
   props: ['bg'],
    data () {
        return {
            posMouse:{x:0, y:0},
            posMouseTemp:{x:0, y:0},
            posX:0,
            random:{x:0,y:0},
            animateVal:{x:0,y:0},
            animateVal1:0,
            animatebg:0
        }
    },
    computed: {
        bgpersent: function () {
            //return (6.64 + ( this.bg * 15.53 ))+'%';
            //return /*6.26 +*/ 14.2856*this.bg;
            return 1.4 *this.animateVal1 + this.posMouse.x / document.body.clientWidth*0.1;
        },

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
        animate() {
            if (TWEEN.update()) {
                requestAnimationFrame(this.animate)
            }
        },
    },
    watch:{
        random:function(newVal, oldVal){
            var t = this;
            t.animateVal = newVal;

        },
        bg:function(newVal, oldVal){
            var t = this;
            t.animatebg = newVal;
            t.animateVal1 = newVal;
        }
    },
  created: function() {
      //this.num=this.backgr;
     let t = this;
      setTimeout(function(){
          var ns4 = (document.layers)? true:false
          var ie4 = (document.all)? true:false

          if (ns4) {document.captureEvents(Event.MOUSEMOVE);}
          document.onmousemove=t.mousemove;
          t.random={x:t.randomInteger(-25,25),y:t.randomInteger(-25,25)};
          t.posX=t.posMouse.x;
          t.posMouse=t.posMouseTemp;
              $('.bg:nth-child(5)').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                  function(e) {
                      t.random={x:t.randomInteger(-25,25),y:t.randomInteger(-25,25)};
                      t.posX=t.posMouse.x;
                      t.posMouse=t.posMouseTemp;
                  })
      },100);
    }
}
</script>

<style scoped>
  .bgMain{
    background: url("/static/img/bg3.jpg");
    background-repeat: repeat-x;
    /*background-position-x: calc(6.64% + ( 0 * 15.53% ) );*/
    position: fixed;
    width: 100%;
    height: 100%;
   transition: all 4s cubic-bezier(.76,0,.5,1);
    transition-delay: 0s;
    /*-webkit-background-size: 100%;
    -moz-background-size: 100%;
    -o-background-size: 100%;
    background-size: 100%;*/
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    /*background-size: 100% auto;
    overflow: hidden;*/
  }

</style>
