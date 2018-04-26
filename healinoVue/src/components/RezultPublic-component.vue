<template>
  <rezultComponentMini
          :rezultData="rezultData"
          :photoImg="img"
          :audio_p="audio_p"
          :isPublic="true"
          @audio="$emit('audio')"
          @toTheme="$emit('toTheme')"
          @toStart="$emit('toStart')"
  ></rezultComponentMini>
</template>

<script>
    export default {
        props:['rezultData','audio_p'],
        data () {
            return {

            }
        },
        computed: {
          img:function(){
            return this.rezultData.UserPhotoUrl || '../static/img/noIMG.png';
          }
        },
    }
</script>

<style scoped>

</style>
