<template>
    <div class="bg"
        v-if="!toHide"
         v-bind:class="classS"
         v-bind:style="{background: 'url('+ urlImg +') center center / cover', left: Xbg + '%', top: Ybg + '%' }">
    </div>
</template>

<script>
export default {
   props: ['posBG', 'posMouse', 'Kof', 'bgCurrent', 'urlImg', 'random' ],
    data () {
        return {
            toHide:false,
            classS:'',
        }},
    watch:{
        bgCurrent:function () {
            if(this.Xbg<-70 || this.Xbg>150 ){
                this.toHide = true;
            }else{
                this.toHide = false;
            }
        }
    },
    computed: {
        Xbg: function () {
            let h = this.posBG.x + /*( this.posMouse.x / document.body.clientWidth * Math.abs(this.Kof.x) *200) +*/ ( Math.abs(this.Kof.x) * 2000 * -this.bgCurrent);
            h = h % 700;
            if(h<-200){
                h+=700;
            }
            if(h<-70 || h>150 ){
                this.toHide = true;
            }else{
                this.toHide = false;
            }
            return h;
        },
        Ybg: function () {
            return this.posBG.y;// + ( this.posMouse.y / document.body.clientHeight * Math.abs(this.Kof.y) *100);
        },
    },
    created: function() {
        var rand = 1 + Math.random() * 4;
        rand = Math.round(rand);
        this.classS = 'animaBG' + rand;
    }
}
</script>