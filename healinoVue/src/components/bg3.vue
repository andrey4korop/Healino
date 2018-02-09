<template>
    <div class="bg1" v-bind:class="(active && is) ? 'fa-enter-to' : 'fa-enter'">
        <div class="p main3"></div>
        <div class="p layer18"></div>
        <div class="p layer19"></div>
        <div class="p layer20"></div>
        <div class="p layer21"></div>
        <div class="p layer22"></div>
        <div class="p layer23"></div>
        <div class="p layer24"></div>
        <div class="p layer25"></div>
        <div class="p layer26"></div>
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
           /* jQuery(document).ready(function(){
                $('.layer18').plaxmove({ratioH:0.05,ratioV:0.1});
                $('.layer19').plaxmove({ratioH:0.12,ratioV:0.08});
                $('.layer20').plaxmove({ratioH:0.1,ratioV:0.18});
                $('.layer21').plaxmove({ratioH:0.2,ratioV:0.1});
                //$('.layer22').plaxmove({ratioH:0.016,ratioV:0.018});
                $('.layer23').plaxmove({ratioH:0.011,ratioV:0.015});
                $('.layer24').plaxmove({ratioH:0.011,ratioV:0.015});
                $('.layer25').plaxmove({ratioH:0.011,ratioV:0.015});
                //$('.layer26').plaxmove({ratioH:0.011,ratioV:0.015})
            });*/
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
