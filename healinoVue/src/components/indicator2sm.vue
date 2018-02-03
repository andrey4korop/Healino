<template>
  <div class="indicators">
    <div class="title_indicator">
      <p>&nbsp;</p>
      <p>Calories Burned</p>
    </div>
    <div class="indicator DaylyCallorie">
      <div class="progress_bar3">
        <div class="cursor" v-bind:style="{ transform: 'rotate(' + CallorieDeg + 'deg)' }"></div>
        <div class="text_indicator">
          <p class="big">{{CalloriePersent}}%</p>
          <p>{{DaylyCallorie}} Kcal</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //name: 'app',
   props: ['DaylyCallorie', 'CallorieScale'],
    data () {
        return {

        }},
    computed:{
        CallorieDeg:function () {
            return 3.6 * (this.DaylyCallorie - this.CallorieScale[0].Callorie) * 100 / (this.CallorieScale[this.CallorieScale.length-1].Callorie - this.CallorieScale[0].Callorie);
        },
        CalloriePersent:function() {
            return Math.round((180 - 70) * (this.DaylyCallorie - this.CallorieScale[0].Callorie) * 100 / (this.CallorieScale[this.CallorieScale.length - 1].Callorie - this.CallorieScale[0].Callorie) / 100 + 70);
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

           var cursor = document.querySelector('.sm .DaylyCallorie .cursor');
           //var percent = document.querySelector('.indicator1 .progress_bar1 .percent');
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
               //percent.classList.add('fa-enter-to');
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
    transform: rotate(0deg) !important;
  }
  .fa-enter-active{
    transition: all 1s;
    transition-delay: 0.1s;
  }
  .fa-enter-active2{
    transition: all 2s cubic-bezier(0.5, 2, 0.6, 0.6);
  }
  .fa-enter-to{
    transform: rotate(360deg) !important;
  }

</style>
