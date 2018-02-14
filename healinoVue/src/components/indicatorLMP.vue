<template>
  <div class="indicators" v-on:click="start">
    <div class="title_indicator">
      <p>Lean Body</p>
      <p>Mass  </p>
    </div>
    <div class="indicator indicatorLMP">
      <div class="progress_bar5">
        <div class="opacity" v-bind:style="{ height: LMPPresent + '%' }"></div>
        <div class="cursor">
          <img src="static/img/cursor_4.png" alt="">
          <div>
            <p class="big">{{LMP}}</p>
            <p>kg</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   props: ['LMP', 'LMPCategoryScale'],
    data () {
        return {
        LMPPresent: '0',
    }},

    watch: {
        LMPCategoryScale: function () {
            this.LMPPresent = 100 - (this.LMP - this.LMPCategoryScale[this.LMPCategoryScale.length -1].BF) * 100 / (this.LMPCategoryScale[0].BF - this.LMPCategoryScale[this.LMPCategoryScale.length -1].BF);
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

           var cursor = document.querySelector('.indicatorLMP .opacity');
           //var percent = document.querySelector('.indicatorLMP .percent');
           //console.log('start');
           var handler2 = function(){
               //console.log(this);
               this.classList.remove('fa-enter-active2');
               this.classList.add('fa-enter-active');
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
      setTimeout(this.start, 10);

    }
}
</script>

<style scoped>
  .fa-enter{
    height: 0% !important;
  }
  .fa-enter-active{
    transition: all 1s;
    transition-delay: 0.9s;
  }
  .fa-enter-active2{
    transition: all 2s cubic-bezier(0.5, 2, 0.6, 0.6);
  }
  .fa-enter-to{
    height: 100% !important;
  }

</style>
