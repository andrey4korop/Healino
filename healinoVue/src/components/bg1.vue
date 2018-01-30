<template>
    <div class="bg1" v-bind:class="(active && is) ? 'fa-enter-to' : 'fa-enter'">
        <div class="p main1"></div>
        <div class="p layer1"></div>
        <div class="p layer2"></div>
        <div class="p layer3"></div>
        <div class="p layer4"></div>
        <div class="p layer5"></div>
        <div class="p layer6"></div>
        <div class="p layer7"></div>
        <div class="p layer8"></div>
    </div>
</template>

<script>
export default {
  //name: 'app',
   props: ['active'],

    data () {
        return {
            //active:false,
            is:false,
        }},
    methods:{
        on(){
            this.is= true;
            jQuery(document).ready(function(){

                $('.layer1').plaxmove({ratioH:0.05,ratioV:0.1});
                $('.layer2').plaxmove({ratioH:0.12,ratioV:0.08});
                $('.layer3').plaxmove({ratioH:0.1,ratioV:0.18});
                $('.layer4').plaxmove({ratioH:0.2,ratioV:0.1});
                $('.layer6').plaxmove({ratioH:0.016,ratioV:0.018});
                $('.layer7').plaxmove({ratioH:0.011,ratioV:0.015});


            });
        }
    },
  created: function() {
      this.is=false;
      setTimeout(this.on, 5);

    }
}
</script>

<style scoped>
  .fa-enter{
    opacity: 0;
  }
  .bg1{
    transition: all 5s ease;
    transition-delay: 0s;
  }
  .fa-enter-to{
    opacity: 1;
  }

</style>
