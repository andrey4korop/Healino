<template>
<div class="background">

  <div class="bgMain"
       v-bind:style="{ marginLeft: 'calc(-'+bgpersent +'vw)', width:widthBgImg*countNeedBg +'px' }">
       <img v-for="i in bgArray" v-bind:src="'/static/img/bg4'+i+'.jpg'" v-bind:style="{width:widthBgImg + 'px'}">

       <!--<img src="/static/img/bg41.jpg" v-bind:style="{width:widthBgImg + 'px'}">
       <img src="/static/img/bg42.jpg" v-bind:style="{width:widthBgImg + 'px'}">
       <img src="/static/img/bg43.jpg" v-bind:style="{width:widthBgImg + 'px'}">
       <img src="/static/img/bg44.jpg" v-bind:style="{width:widthBgImg + 'px'}">
       <img src="/static/img/bg45.jpg" v-bind:style="{width:widthBgImg + 'px'}">
       <img src="/static/img/bg46.jpg" v-bind:style="{width:widthBgImg + 'px'}">-->
  </div>
  <bg class="big"
      v-for="(item, index) in bEl"
      :key="index"
      :urlImg="'/static/img/symbols/bSymbols/10Lg.png'"
      :posBG="{x:item.left,y:item.top}"
      :posMouse="posMouse"
      :Kof="{x:0.025,y:0.025}"
      :bgCurrent="bg"
      :random="random"></bg>
 <bg class="medium"
     v-for="(item, index) in mEl"
     :key="index+100"
     :urlImg="'/static/img/symbols/mSymbols/7M.png'"
     :posBG="{x:item.left,y:item.top}"
     :posMouse="posMouse"
     :Kof="{x:0.015,y:0.015}"
     :bgCurrent="bg"
     :random="random"></bg>
 <bg class="small"
     v-for="(item, index) in sEl"
     :key="index+1000"
     :urlImg="'/static/img/symbols/lSymbols/17L.png'"
     :posBG="{x:item.left,y:item.top}"
     :posMouse="posMouse"
     :Kof="{x:0.012,y:0.012}"
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
            posMouse:{x:0, y:0},
            posMouseTemp:{x:0, y:0},
            random:{x:0,y:true},
            heightWindow:window.screen.height,
            bEl:[],
            mEl:[],
            sEl:[],
            bgArray:[],
        }
    },
    computed: {
        bgpersent: function () {
            //return (6.64 + ( this.bg * 15.53 ))+'%';
            //return /*6.26 +*/ 14.2856*this.bg;
            return 5 *this.bg /*+ this.posMouseTemp.x / document.body.clientWidth*0.1*/;
        },
        countNeedBg:function () {
            this.bgArray=[];
            for(var i = 0; i<=this.bgpersent/100;i++ ){
                this.bgArray.push(i%7);
            }
            return  this.bgArray.length;
        },
        widthBgImg:function () {
         return 1.15 * 3420 * this.heightWindow / 1080;
        },
         translate2:function () {
            if(this.random.y){
                return '0%';
            }else{
                return '-10%';
            }
         }
    },
    methods:{
        /* mousemove(event) {
           if (document.attachEvent != null) {
               this.posMouseTemp = {x: window.event.clientX, y: window.event.clientY}
           } else if (!document.attachEvent && document.addEventListener) {
               this.posMouseTemp = {x: event.clientX, y: event.clientY}
           }
       },*/
        randomInteger(min, max) {
           var rand = min - 0.5 + Math.random() * (max - min + 1)
           rand = Math.round(rand);
           return rand;
       },
    },
 created: function() {
     var top = -20;
     for(var left = -20; left<300;){
        top=(top+this.randomInteger(-20, 100))%100;
        left+=this.randomInteger(0, 40);
        this.bEl.push({'top':top, 'left':left});
     }
     for(left = -20; left<300;){
          top=(top+this.randomInteger(-20, 100))%100;
          left+=this.randomInteger(0, 40);
          this.mEl.push({'top':top, 'left':left});
     }
     for(left = -20; left<300;){
         top=(top+this.randomInteger(-20, 100))%100;
         left+=this.randomInteger(0, 40);
         this.sEl.push({'top':top, 'left':left});
     }
 },
 mounted(){
     let t = this;
       $(window).on('resize',function () {
          t.heightWindow =  window.screen.height;
       });
      setTimeout(function () {
          t.random.y = !t.random.y;
      },200);
      setInterval( function () {
          t.random.y = !t.random.y;
      },8500);
     //$(document).on('mousemove', this.mousemove);
     /*setInterval( function () {
         t.posMouse.x = t.posMouseTemp.x;
         t.posMouse.y = t.posMouseTemp.y;
     },1000);*/
     },
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
    /*transition: all 2s cubic-bezier(.76,0,.5,1);*/
    /*transition-delay: 0s;*/
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    display: flex;
   /* animation: animationBG 5s ease-out infinite alternate;*/
   transition: all 9s ease-out;
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
   height: 400px;
   width: 400px;
   height: 20vw;
   width: 20vw;
   height: 20vmax;
   width: 20vmax;
   transition: all 3s linear;
   opacity: 0.7;
  }
  .medium{
   height: 200px;
   width: 200px;
   height: 10vw;
   width: 10vw;
   height: 10vmax;
   width: 10vmax;
   transition: all 5s linear;
   opacity: 0.8;
  }
  .small{
   height: 100px;
   width: 100px;
   height: 5vw;
   width: 5vw;
   height: 5vmax;
   width: 5vmax;
   transition: all 8s linear;
   opacity: 0.9;
  }
  .animaBG1{
   animation: animationBGBig 30s linear infinite normal, animationBG1 5s ease-out infinite alternate;
  }
  .animaBG2{
   animation: animationBGMedium 15s linear infinite normal, animationBG2 5s ease-out infinite alternate;
  }
  .animaBG3{
   animation: animationBGSmall 10s linear infinite normal, animationBG3 5s ease-out infinite alternate;
  }
  .animaBG4{
   animation: animationBGSmall1 20s linear infinite normal, animationBG1 5s ease-out infinite alternate;
  }
  .animaBG5{
   animation: animationBGSmall2 17s linear infinite normal, animationBG1 5s ease-out infinite alternate;
  }
  .bg{
   position: fixed;
  }
  .hide{
   display: none;
  }
  @keyframes animationBGBig {
   from {
    transform: /*rotate(0deg)*/ /*translateY(-40%)*/ translateX(0);
   }
   25%{
    transform:/* rotate(-15deg)*/ /*translateY(-25%) */translateX(25%);
   }
   50%{
    transform: /*rotate(-40deg)*/ /*translateY(0)*/ translateX(0);
   }
   75%{
    transform:/* rotate(-15deg)*/ /*translateY(-25%)*/ translateX(-25%);
   }
   to {
    transform:/* rotate(0deg) *//*translateY(-40%)*/ translateX(0);
   }
  }
  @keyframes animationBGMedium {
   from {
    transform:/* rotate(0deg) *//*translateY(-40%)*/ translateX(0);
   }
   25%{
    transform: /*rotate(15deg)*/ /*translateY(-25%)*/ translateX(25%);
   }
   50%{
    transform: /*rotate(40deg)*/ /*translateY(0)*/ translateX(0);
   }
   75%{
    transform: /*rotate(15deg)*/ /*translateY(-25%)*/ translateX(-25%);
   }
   to {
    transform:/*rotate(0deg)*//*translateY(-40%)*/ translateX(0);
   }
  }
  @keyframes animationBGSmall {
    from {
     transform: /*rotate(0deg)*/ /*translateY(-40%)*/ translateX(0);
    }
    25%{
     transform: /*rotate(-15deg)*/ /*translateY(-25%)*/ translateX(-25%);
    }
    50%{
     transform: /*rotate(-40deg)*/ /*translateY(0)*/ translateX(0);
    }
    75%{
     transform: /*rotate(-15deg)*//*translateY(-25%)*/ translateX(25%);
    }
    to {
     transform:/* rotate(0deg)*/ /*translateY(-40%)*/ translateX(0);
    }
   }
  @keyframes animationBGSmall1 {
   from {
    transform: /*rotate(0deg)*/ /*translateY(40%)*/ translateX(0);
   }
   25%{
    transform: /*rotate(-15deg)*/ /*translateY(25%)*/ translateX(25%);
   }
   50%{
    transform:/* rotate(-40deg)*/ /*translateY(0)*/ translateX(0);
   }
   75%{
    transform: /*rotate(-15deg)*/ /*translateY(25%)*/ translateX(-25%);
   }
   to {
    transform: /*rotate(0deg)*/ /*translateY(40%)*/ translateX(0);
   }
  }
  @keyframes animationBGSmall2 {
   from {
    transform: /*rotate(0deg) *//*translateY(-40%)*/ translateX(0);
   }
   25%{
    transform: /*rotate(15deg)*/ /*translateY(-25%)*/ translateX(-25%);
   }
   50%{
    transform: /*rotate(40deg)*/ /*translateY(0)*/ translateX(0);
   }
   75%{
    transform: /*rotate(15deg)*/ /*translateY(-25%)*/ translateX(25%);
   }
   to {
    transform: /*rotate(0deg) *//*translateY(-40%)*/ translateX(0);
   }
  }
</style>
