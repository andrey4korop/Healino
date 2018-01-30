<template>
<div class="background">
  <bg1 v-if="num==1 || num2==1" :active="bg[1]"></bg1>
  <bg2 v-if="num==2 || num2==2" :active="bg[2]"></bg2>
  <bg3 v-if="num==3 || num2==3" :active="bg[3]"></bg3>
  <bg4 v-if="num==4 || num2==4" :active="bg[4]"></bg4>
  <bg5 v-if="num==5 || num2==5" :active="bg[5]"></bg5>
</div>
</template>

<script>
export default {
  //name: 'app',
   props: ['backgr'],
    data () {
        return {
            num: 1, //new
            num2: 1, //old
            bg:{
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
            }

        }
    },
    methods:{
      on(old){
          let t=this
          return function () {
              t.num2=t.num;
              t.bg[old]=true;
          }

      }
    },
    watch: {
        backgr: function (newS, old) {
            this.num = newS;
            console.log(old);
            this.bg[old]=false;
            setTimeout(this.on(old), 5000);
        }
    },
  created: function() {
      //this.num=this.backgr;

    }
}
</script>

<style scoped>

</style>
