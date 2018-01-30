<template>
  <div class="indicators">
    <div class="title_indicator">
      <p>Waist to Hip</p><p> Ratio</p>
    </div>
    <div class="indicator indicatorWHR">
      <div class="progress_bar6">
        <div class="sometext">
          <div class="txt">
            <p class="big">>0.95</p>
            <p>At Risk</p>
          </div>
          <div class="txt">
            <p>Exelent</p>
            <p class="big"><0.85</p>
          </div>
        </div>
        <div class="opacity" v-bind:style="{ height: WHRPresent + '%' }"></div>
        <div class="cursor">
          <img src="static/img/cursor_4.png" alt="">
          <div>
            <p class="big">{{WHRatio}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   props: ['WHRatio'],
    data () {
        return {
            WHRPresent: '0',
            //WHR:'0'
    }},

    watch: {
        WHRatio: function () {
            this.WHRPresent = 100 - (this.WHRatio - 0.85) * 100 / (0.95 - 0.85);
        }
    },
    methods:{

       start(){
           (function() {
               var lastTime = 0;
               var vendors = ['ms', 'moz', 'webkit', 'o'];
               for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                   window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                   window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                       || window[vendors[x]+'CancelRequestAnimationFrame'];
               }

               if (!window.requestAnimationFrame)
                   window.requestAnimationFrame = function(callback, element) {
                       var currTime = new Date().getTime();
                       var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                       var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                           timeToCall);
                       lastTime = currTime + timeToCall;
                       return id;
                   };

               if (!window.cancelAnimationFrame)
                   window.cancelAnimationFrame = function(id) {
                       clearTimeout(id);
                   };
           }());

           function raf(fn) {
               window.requestAnimationFrame(function () {
                   window.requestAnimationFrame(function () {
                       fn();
                   });
               });
           };

           var cursor = document.querySelector('.indicatorWHR .opacity');
           //var percent = document.querySelector('.indicatorLMP .percent');
           //console.log('start');
           var handler2 = function(){
               //console.log(this);
               this.classList.remove('fa-enter-active2');
               this.removeEventListener('transitionend', handler2);
           };
           var handler = function(){
               this.classList.remove('fa-enter-active');
               this.classList.add('fa-enter-active2');
               this.classList.remove('fa-enter-to');
               this.removeEventListener('transitionend', handler);
               this.addEventListener('transitionend', handler2);
           };
           //console.log(percent);
           cursor.classList.add('fa-enter');
           //percent.classList.add('fa-enter');

           raf(function(){
               cursor.classList.add('fa-enter-active');
               //percent.classList.add('fa-enter-active');
               cursor.classList.add('fa-enter-to');
              // percent.classList.add('fa-enter-to');
               cursor.classList.remove('fa-enter');
               //percent.classList.remove('fa-enter');
           });

           cursor.addEventListener('transitionend', handler);
           //percent.addEventListener('transitionend', handler);
       }
    },
  created: function() {
      this.start();

    }
}
</script>

<style scoped>
  .fa-enter{
    height: 0% !important;
  }
  .fa-enter-active{
    transition: all 1s;
    transition-delay: 0.8s;
  }
  .fa-enter-active2{
    transition: all 2s cubic-bezier(0.5, 2, 0.6, 0.6);
  }
  .fa-enter-to{
    height: 100% !important;
  }

</style>
