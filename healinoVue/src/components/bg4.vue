<template>
    <div class="bg1" v-bind:class="(active && is) ? 'fa-enter-to' : 'fa-enter'">
        <div class="p main4"></div>
        <div class="p layer27"></div>
        <div class="p layer28"></div>
        <div class="p layer29"></div>
        <div class="p layer30"></div>
        <div class="p layer31"></div>

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
                $('.layer27').plaxmove({ratioH:0.05,ratioV:0.1});
                $('.layer28').plaxmove({ratioH:0.12,ratioV:0.08});
                $('.layer29').plaxmove({ratioH:0.1,ratioV:0.18});
                //$('.layer30').plaxmove({ratioH:0.1,ratioV:0.18})
                //$('.layer31').plaxmove({ratioH:0.2,ratioV:0.1})

            });**/
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
