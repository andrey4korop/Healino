<template>
  <div class="header">
    <div class="headerContainer">
      <a href="/" class="logo_head" v-on:click.prevent="$emit('toStart')"><img src="static/img/logoHeader.png" alt="" class=""></a>
      <a href="/" class="logo_head m" v-on:click.prevent="$emit('toStart')"><img src="static/img/logoM.png" alt="" class=""></a>
      <a href="/" v-on:click.prevent="$emit('toStart')" v-lang.main></a>
      <a v-bind:href="langString('forumUrl')" target="_blank" v-lang.forum></a>
      <h3>{{QuestionsProgress}}%</h3>
      <div class="music_btn1" v-on:click="$emit('audio')">
        <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >
      </div>
      <div class="lang">
        <img src="static/img/langPL.png" alt="" v-if="lang=='pl'">
        <img src="static/img/langUSA.png" alt="" v-if="lang=='en'">
        <img src="static/img/langUA.png" alt="" v-if="lang=='ru'">
        <ul>
          <li v-on:click="$emit('changeLang', 'pl')" v-if="lang!='pl'"><img src="static/img/langPL.png" alt=""></li>
          <li v-on:click="$emit('changeLang', 'en')" v-if="lang!='en'"><img src="static/img/langUSA.png" alt=""></li>
          <li v-on:click="$emit('changeLang', 'ru')" v-if="lang!='ru'"><img src="static/img/langUA.png" alt=""></li>
        </ul>
      </div>
      <div class="user_Avatar">
        <div v-bind:style="{background: 'url(' + userIMG + ') center center / cover' }"
             v-on:click="showPopupUserOn()"
             class="user_Avatar1"></div>
        <div class="block_user_popup" v-bind:class="(showPopupUser)?'on':''">
          <div class="margin_op">
            <ul>
              <li v-on:click="$emit('onToUser')" v-lang.editUser></li>
              <li v-lang.getRezult></li>
              <li v-on:click="$emit('exit')" v-lang.exit></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['QuestionsProgress', 'audio_p', 'lang','userData'],
        data () {
            return {
              showPopupUser:false,
            }
        },
        messages: {
          en: {
            main: 'Home',
            forum: 'Forum',
            editUser:'Edit profile',
            getRezult:'Email results',
            exit:'Exit',
            forumUrl: 'https://www.healino.com/blog-us'
          },
          ru: {
            main: 'Главная',
            forum: 'Форум',
            editUser:'Редактировать профиль',
            getRezult:'Результаты электронной почты',
            exit:'Выход',
            forumUrl: 'https://www.healino.com/blog-ru'
          },
          pl: {
            main: 'Strona główna',
            forum: 'Forum',
            editUser:'Edytuj profil',
            getRezult:'Wyślij wyniki e-mailem',
            exit:'Wyjście',
            forumUrl: 'https://www.healino.com/blog-pl'
          }
        },
        methods:{
            langString(string){
                return this.translate(string);
            },
          showPopupUserOn(){
            this.showPopupUser = true;
          },
        },
      mounted(){
        let t = this;
        $(document).mouseup(function (e) {
          if ($(".user_Avatar").has(e.target).length === 0){
            t.showPopupUser = false;
          }
        })
      },
      destroyed(){
        $(document).unbind('mouseup');
      },
      computed:{
        userIMG: function () {
          if(this.userData.PhotoUrl){
            return this.userData.PhotoUrl;
          }
          else{
            return '../static/img/noIMG.png';
          }
        },
      }
    }

</script>

<style scoped>
  .music_btn1{
    width: 30px;
    height: 27px;
    margin-left: 10px;
  }
</style>
