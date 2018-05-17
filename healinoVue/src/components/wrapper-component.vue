<template>
  <div class="container pc"  ref="wind">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowHeight);
        this.getWindowHeight();
      })
    },
    destroyed() {
      window.removeEventListener('resize', this.getWindowHeight);
      $(this.$refs.wind).css({transform: ''});
      $('body').css({overflow: ''});
    },
    methods:{
      getWindowHeight(event) {
        let heigth = document.documentElement.clientHeight;
        if(heigth > 1080){
          let scale = Math.round(parseFloat(heigth / 1300)*10)/10;
          $(this.$refs.wind).css({transform: 'scale('+scale+')'});
          $('body').css({overflow: 'hidden'});
        }else{
          $(this.$refs.wind).css({transform: ''});
          $('body').css({overflow: ''});
        }
      },
    }
  }
</script>
