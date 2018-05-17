<template>
<div class="prostoTask">
  <div class="container firstPageContainer"  ref="wind">
    <div class="row">
      <div class="logo">
        <img src="static/img/logo.png" alt="">
      </div>
    </div>
    <div class="row">
      <div class="langs">
        <div class="lang"
             v-bind:class="[(lang == 'pl') ? 'active' : '']"
             v-on:click="$emit('changeLang','pl')">
          <img src="static/img/langPl.png" alt="">
          <p v-lang.pl></p>
        </div>
        <div class="lang"
             v-bind:class="[(lang == 'en') ? 'active' : '']"
             v-on:click="$emit('changeLang', 'en')">
          <img src="static/img/langUSA.png" alt="">
          <p v-lang.en></p>
        </div>
        <div class="lang"
             v-bind:class="[(lang == 'ru') ? 'active' : '']"
             v-on:click="$emit('changeLang', 'ru')">
          <img src="static/img/langUA.png" alt="">
          <p v-lang.ru>RU</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="firstPage pc_sm">
        <button  v-on:click.prevent="$emit('onRegister')"
                 v-if="!SessionData"
                 v-lang.singIn></button>
        <button  v-on:click.prevent="$emit('onLogin')"
                 v-if="!SessionData"
                 v-lang.login></button>
        <button  v-on:click.prevent="$emit('onUser')"
                 v-if="SessionData"
                 v-lang.start></button>
        <!--<button  v-on:click.prevent="$emit('nextBack')"

                 >Next Background</button>-->

      </div>
    </div>

  </div>
  <div class="music_btn" v-on:click="$emit('audio')">
    <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >

  </div>
</div>
</template>

<script>
    export default {
        props: ['SessionData', 'lang', 'audio_p'],
        data () {
            return {

            }
        },
        messages: {
            en: {
                start: 'START',
                login: 'LOGIN',
                singIn: 'SIGN IN',
                en: 'US',
                ru: 'RU',
                pl: 'PL'
            },
            ru: {
                start: 'СТАРТ',
                login: 'ВХОД',
                singIn: 'РЕГИСТРАЦИЯ',
                en: 'US',
                ru: 'RU',
                pl: 'PL'
            },
            pl: {
                start: 'START',
                login: 'ZALOGUJ',
                singIn: 'REJESTRACJA',
                en: 'US',
                ru: 'RU',
                pl: 'PL'
            }
        },
        computed: {
          hasSesionData: function () {
              if(this.SessionData){
                  return true;
              }else{
                  return false;
              }
          }
        },
        created: function() {
          this.$emit('changeLang', getCookie('lang'));
        },
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
        methods: {
          getWindowHeight(event) {
            let heigth = document.documentElement.clientHeight;
            if(heigth > 1080){
              let scale = Math.round(parseFloat(heigth / 1000)*10)/10;
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

<style scoped>
  @media screen and (max-height: 500px) and (orientation: portrait) {
    .container {
      transform: scale(0.8);
      margin: -10%;
    }
    .prostoTask{
      height: 100vh;
    }
  }
.music_btn{
  width: 30px;
  height: 30px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 100;
}
</style>
