<template>
    <div class="bg1" v-bind:class="(active && is) ? 'fa-enter-to' : 'fa-enter'">
        <div class="p main5"></div>
        <div class="p layer32"></div>
        <div class="p layer33"></div>
        <div class="p layer34"></div>
        <div class="p layer35"></div>
        <div class="p layer36"></div>
        <div class="p layer37"></div>
        <div class="p layer38"></div>
        <div class="p layer39"></div>
        <div class="p layer40"></div>
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
                //$('.layer32').plaxmove({ratioH:0.05,ratioV:0.1});
                $('.layer33').plaxmove({ratioH:0.12,ratioV:0.08});
                $('.layer34').plaxmove({ratioH:0.1,ratioV:0.18});
                $('.layer35').plaxmove({ratioH:0.2,ratioV:0.1});
                $('.layer36').plaxmove({ratioH:0.016,ratioV:0.018});
                // $('.layer37').plaxmove({ratioH:0.011,ratioV:0.015});
                $('.layer38').plaxmove({ratioH:0.011,ratioV:0.015});
                $('.layer39').plaxmove({ratioH:0.011,ratioV:0.015});
                //$('.layer40').plaxmove({ratioH:0.011,ratioV:0.015});
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
