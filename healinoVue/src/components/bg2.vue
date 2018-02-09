<template>
    <div class="bg1" v-bind:class="(active && is) ? 'fa-enter-to' : 'fa-enter'">
        <div class="p main2"></div>
        <div class="p layer9"></div>
        <div class="p layer10"></div>
        <div class="p layer11"></div>
        <div class="p layer12"></div>
        <div class="p layer13"></div>
        <div class="p layer14"></div>
        <div class="p layer15"></div>
        <div class="p layer16"></div>
        <div class="p layer17"></div>
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
            /*jQuery(document).ready(function(){
                $('.layer9').plaxmove({ratioH:0.05,ratioV:0.1});
                $('.layer10').plaxmove({ratioH:0.12,ratioV:0.08});
                $('.layer11').plaxmove({ratioH:0.1,ratioV:0.18});
                $('.layer12').plaxmove({ratioH:0.2,ratioV:0.1});
                //$('.layer13').plaxmove({ratioH:0.016,ratioV:0.018});
                $('.layer14').plaxmove({ratioH:0.011,ratioV:0.015});
                $('.layer15').plaxmove({ratioH:0.011,ratioV:0.015});
                $('.layer16').plaxmove({ratioH:0.011,ratioV:0.015});
                // $('.layer17').plaxmove({ratioH:0.011,ratioV:0.015})
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
