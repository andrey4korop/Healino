<template>
    <div class="bg"

         v-bind:class="(toHide)?'hide':''"
         v-bind:style="{background: 'url('+ urlImg +') center center / cover', left: Xbg + '%', top: Ybg + '%', transform: 'rotate(' + rotDeg + 'deg)' }">

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

    methods:{

    },
  created: function() {


    },
    computed: {

        Xbg: function () {
            let h = this.posBG.x + ( this.posMouse.x / document.body.clientWidth * Math.abs(this.Kof.x) *200) + (Math.abs(this.Kof.x) * this.random.x)+ ( Math.abs(this.Kof.x) * 2000 * -this.bgCurrent);

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
            return this.posBG.y + ( this.posMouse.y / document.body.clientHeight * Math.abs(this.Kof.y) *100)+ (Math.abs(this.Kof.y) * this.random.y);
        },
        rotDeg: function () {
            return (this.posMouse.y + this.posMouse.x) * this.constKof - this.random.x*this.Kof.x;
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
  }
  .medium{
      height: 390px;
      width: 390px;
      height: 30vw;
      width: 30vw;
      height: 30vmax;
      width: 30vmax;
     /* filter: blur(4px);*/
  }
  .small{
      height: 200px;
      width: 200px;
      height: 15vw;
      width: 15vw;
      height: 15vmax;
      width: 15vmax;
  }
  .bg{
      position: fixed;
      transition: all 2s cubic-bezier(.76,0,.5,1);
  }
.hide{
    display: none;
}

</style>
