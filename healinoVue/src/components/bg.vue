<template>
    <div class="bg"
        v-if="!toHide"
         v-bind:class="[classS]"
         v-bind:style="{left: Xbg + '%', top: Ybg + '%' }">
        <div class="max"
             ref="o"
             v-bind:style="{background: 'url(/static/img/bubble.png) center center / cover', transform: translate1}"
            v-bind:class="[classAnimation]">
        </div>
    </div>
</template>

<script>
export default {
   props: ['posBG', 'posMouse', 'Kof', 'bgCurrent', 'urlImg', 'random' ],
    data () {
        return {
            toHide:false,
            classS:'',
            classAnimation:'',
        }},
    watch:{
        bgCurrent:function (old, newval) {
            if(this.Xbg<-30 || this.Xbg>130 ){
                this.toHide = true;
            }else{
                this.toHide = false;
            }
        }
    },
    computed: {
        Xbg: function () {
            let h = (this.posBG.x + /*( this.posMouse.x / document.body.clientWidth *10) +*/ ( this.Kof.x * 2000 * -this.bgCurrent));
            h = h % 1000;
            if(h<-200){
                h+=300;
            }
            if(h<-30 || h>130 ){
                this.toHide = true;
            }else{
                this.toHide = false;
            }
            return h;
        },
        Ybg: function () {
            return this.posBG.y //+ ( this.posMouse.y / document.body.clientHeight *10);
        },
        translate1:function () {
            if(this.random.y){
                return 'translateY(30%)';
            }else{
                return 'translateY(-30%)';
            }
        }
    },
    mounted: function() {
        var rand = 1 + Math.random() * 4;
        rand = Math.round(rand);
        this.classS = 'animaBG' + rand;
        rand = Math.round(Math.random()*20000)-10000;
        if(rand<0){
            this.classAnimation='opacityAnim';
            $(this.$refs.o).css({'animationDelay':rand-5000+'ms'});
        }else {
            setTimeout(()=> {
                this.classAnimation = 'opacityAnim'
            }, rand)
        }
    }
}
</script>

<style scoped>
    .opacityAnim{
       animation: opacitiAnim1 20s linear infinite alternate;
    }
    @keyframes opacitiAnim1 {
        from{
            opacity: 0;
        }
        15%{
            opacity: 0;
        }
        85%{
            opacity: 1;
        }
        to{
            opacity: 1;
        }
    }
    .max{
        height: 100%;
        width: 100%;
        transition: all 9s linear;
        opacity: 0;
       /* animation: animationBG10 5s ease-out infinite alternate;*/
    }
</style>