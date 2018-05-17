<template>
  <div class="back_btn" ref="wind" v-on:click="callback">
    <i class="fa fa-chevron-circle-left"></i>
  </div>
</template>

<script>
  export default {
    props: ['callback'],
    mounted() {
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowHeight);
        this.getWindowHeight();
      })
    },
    destroyed() {
      window.removeEventListener('resize', this.getWindowHeight);
      $(this.$refs.wind).css({transform: ''});
    },
    methods:{
      getWindowHeight(event) {
        let heigth = document.documentElement.clientHeight;
        if(heigth > 1080){
          let scale = Math.round(parseFloat(heigth / 900)*10)/10;
          $(this.$refs.wind).css({transform: 'scale('+scale+')'});
        }else{
          $(this.$refs.wind).css({transform: ''});
        }
      },
    }
  }
</script>
