<template>
    <div class="bg"
        v-if="!toHide"

         v-bind:style="{background: 'url('+ urlImg +') center center / cover', left: Xbg + '%', top: Ybg + '%' }">

    </div>
</template>

<script>
export default {
  //name: 'app',
   props: ['posBG', 'posMouse', 'Kof', 'bgCurrent', 'urlImg', 'random' ],

    data () {
        return {
            toHide:false,
        }},

    watch:{
        bgCurrent:function () {
            if(this.Xbg<-100 || this.Xbg>200 ){
                this.toHide = true;
            }else{
                this.toHide = false;
            }
        }
    },
  created: function() {


    },
    computed: {

        Xbg: function () {
            let h = this.posBG.x + ( this.posMouse.x / document.body.clientWidth * Math.abs(this.Kof.x) *200) + ( Math.abs(this.Kof.x) * 2000 * -this.bgCurrent);

            h = h % 700;
            if(h<-200){
                h+=700;
            }
            if(h<-100 || h>200 ){
                this.toHide = true;
            }else{
                this.toHide = false;
            }
            return h;
        },
        Ybg: function () {
            return this.posBG.y + ( this.posMouse.y / document.body.clientHeight * Math.abs(this.Kof.y) *100);
        },
        rotDeg: function () {
            return (this.posMouse.y + this.posMouse.x) * this.constKof;
        },
        constKof:function () {
            if(this.Kof.x>0) {
                return Math.pow(this.Kof.x * 100, this.Kof.x * 100) / 250;
            }else{
                return -Math.pow(Math.abs(this.Kof.x) * 100, Math.abs(this.Kof.x) * 100) / 250;
            }
        }
    },
}
</script>

<style scoped>

  .big{
      height: 640px;
      width: 640px;
      height: 50vw;
      width: 50vw;
      height: 50vmax;
      width: 50vmax;
      /*filter: blur(10px);*/
      transition: all 3s linear;
      animation: animationBGBig 30s linear infinite normal;
  }
  .medium{
      height: 390px;
      width: 390px;
      height: 30vw;
      width: 30vw;
      height: 30vmax;
      width: 30vmax;
     /* filter: blur(4px);*/
      transition: all 5s linear;
      animation: animationBGMedium 15s linear infinite normal;
  }
  .small{
      height: 200px;
      width: 200px;
      height: 15vw;
      width: 15vw;
      height: 15vmax;
      width: 15vmax;
      transition: all 8s linear;
      animation: animationBGSmall 10s linear infinite normal;
  }
  .bg{
      position: fixed;
      /*transition: all 2s cubic-bezier(.76,0,.5,1);*/
  }
.hide{
    display: none;
}

</style>
