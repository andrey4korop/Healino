<template>
<rezultComponentMini
        :rezultData="rezultData"
        :photoImg="img"
        :audio_p="audio_p"
        :isPublic="false"
        @audio="$emit('audio')"
        @toTheme="toTheme"
        @toStart="$emit('toStart')"
></rezultComponentMini>
</template>

<script>
    export default {
        props:['rezultData','userData', 'themeActiveObj', 'audio_p'],
        data () {
            return {

            }
        },
        computed: {
          img:function() {
            return this.userData.PhotoUrl || '../static/img/noIMG.png';
          }
        },
        methods:{
            toTheme(q, i, j){
                this.$emit('toTheme', q, i, j);
            }
        }
    }
</script>

<style scoped>

</style>
