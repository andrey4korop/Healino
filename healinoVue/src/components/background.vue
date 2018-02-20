<template>
<div class="background">
 <!-- <bg1 v-if="num==2 || num2==2" :active="bg[1]"></bg1>
  <bg2 v-if="num==1 || num2==1" :active="bg[2]"></bg2>
  <bg3 v-if="num==3 || num2==3" :active="bg[3]"></bg3>
  <bg4 v-if="num==4 || num2==4" :active="bg[4]"></bg4>
  <bg5 v-if="num==5 || num2==5" :active="bg[5]"></bg5>-->
  <div class="bgMain"
       v-bind:style="{ backgroundPositionX: 'calc('+bgpersent +'% - '+ bgpersent +'vw)' }">

  </div>
</div>
</template>

<script>
export default {
  //name: 'app',
   props: ['backgr' , 'bg'],
    data () {
        return {
            num: 1, //new
            num2: 1, //old


        }
    },
    computed: {
        bgpersent: function () {
            //return (6.64 + ( this.bg * 15.53 ))+'%';
            return 6.26 + 14.2856*this.bg;
        },
    },
    methods:{
      on(old, newS){
          let t=this
          return function () {
              t.num2=newS;
              t.bg[old]=true;
          }

      }
    },
    watch: {
       /* backgr: function (newS, old) {
            let t = this
            setTimeout(function () {
                t.num = newS;
                t.bg[old]=false;
            }, 100);
            //this.num = newS;
            //console.log(old);
            //this.bg[old]=false;
            setTimeout(this.on(old, newS), 5000);
        }*/
    },
  created: function() {
      //this.num=this.backgr;

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
    transition: all 0.5s ease;
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
