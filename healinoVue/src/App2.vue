<template>
  <div class="indicators">
    <div class="title_indicator">
      <p>Body Fat (US Navy)</p>
    </div>
    <div class="indicator">
      <div class="progress_bar1">
        <img src="static/img/cursor_1.png" alt="" class="cursor"
             v-bind:style="{ left: FM/0.4 + '%' }">
        <span class="percent" v-bind:style="{ left: FM/0.4 + '%' }">{{FM}}%</span>
        <span class="shkala-1">10%</span>
        <span class="shkala-2">18%</span>
        <span class="shkala-3">24%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app2',
   data () {
    return {
        FM: '30'


    }
  },
  created: function() {
      (function() {
          console.log('start');
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



      function func() {

          function raf(fn) {
              window.requestAnimationFrame(function () {
                  window.requestAnimationFrame(function () {
                      fn();
                  });
              });
          }
          var cursor = document.querySelector('.progress_bar1 .cursor');
          var percent = document.querySelector('.progress_bar1 .percent');
          //console.log('start');
          var handler2 = function(){
              this.classList.remove('fa-enter-active2');
              this.removeEventListener('animationend', handler2);
          };
          var handler = function(){
              this.classList.remove('fa-enter-active');
              this.classList.add('fa-enter-active2');
              this.classList.remove('fa-enter-to');
              this.removeEventListener('animationend', handler);
              this.addEventListener('transitionend', handler2);
          };
          cursor.classList.add('fa-enter');
          percent.classList.add('fa-enter');

          raf(function(){
              cursor.classList.add('fa-enter-active');
              percent.classList.add('fa-enter-active');
              cursor.classList.add('fa-enter-to');
              percent.classList.add('fa-enter-to');
              cursor.classList.remove('fa-enter');
              percent.classList.remove('fa-enter');
          });

          cursor.addEventListener('transitionend', handler);
          percent.addEventListener('transitionend', handler);
      }

      setTimeout(func, 2000);
  }
}
</script>

<style>
#test{
  position: relative;
  top:10px;

}
.fa-enter{
  left: 0 !important;
}
.fa-enter-active{
  transition: all 5s;
}
.fa-enter-active2{
  transition: all 2s;
}
.fa-enter-to{
  left: 100% !important;
}


</style>
