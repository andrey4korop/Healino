<template>

  <div class="container themesPageContainer ">
    <div class="header">
      <div class="headerContainer">
        <a href="/" class="logo_head"><img src="static/img/logoHeader.png" alt="" class=""></a>
        <a href="/" class="logo_head m"><img src="static/img/logoM.png" alt="" class=""></a>
        <a href="/" v-lang.main></a>
        <a v-bind:href="langString('forumUrl')" target="_blank" v-lang.forum></a>
        <h3>{{userData.QuestionsProgress}}%</h3>
        <div class="music_btn1" v-on:click="$emit('audio')">
          <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >
        </div>
        <div class="lang">
          <img src="static/img/langPL.png" alt=""   v-if="lang=='pl'">
          <img src="static/img/langUSA.png" alt=""  v-if="lang=='en'">
          <img src="static/img/langUA.png" alt=""   v-if="lang=='ru'">
          <ul>
            <li v-on:click="$emit('changeLang', 'pl')" v-if="lang!='pl'"><img src="static/img/langPL.png" alt=""></li>
            <li v-on:click="$emit('changeLang', 'en')" v-if="lang!='en'"><img src="static/img/langUSA.png" alt=""></li>
            <li v-on:click="$emit('changeLang', 'ru')" v-if="lang!='ru'"><img src="static/img/langUA.png" alt=""></li>
          </ul>
        </div>
        <div v-bind:style="{background: 'url(' + userIMG + ') center center / cover' }" class="user_Avatar" ></div>
      </div>
    </div>
    <div class="row sm-margin">
      <div class="content">
        <div class="mar">
          <div class="themes">

            <div class="theme" v-for="list in List"
                 v-on:click.prevent="changeActive(list)"
                 v-bind:style="{background: 'url(' + list.ImageUrl + ') center center / cover' }"
                 v-bind:class="[(list.ThemeStatus=='3') ? 'disable' : '', (list.QuestionsTotal==list.QuestionsFinished) ? 'check' : '', (isActive(list.Id)) ? 'active' : '' ]" >
              <div class="filter" v-on:click="changeActive(list)">
                <img src="static/img/mark.png" alt="">
                <button v-on:click.prevent="getRezult(list)"  v-lang.rezult></button>
              </div>
            </div>

          </div>
        </div>
        <div class="description">
          <h1>{{Title}}</h1>
          <p>{{Description}} </p>
          <!--<h4>Lorem ipsum dolor sit amet.</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi asperiores cumque dicta
            dignissimos distinctio eius esse, id illo numquam omnis perferendis provident quod repellendus sequi
            veritatis?</p>-->
        </div>
      </div>
      <div class="green">
        <button v-on:click="$emit('toQuestion', activeId)" v-lang.start></button>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        props: ['SessionData', 'List', 'userData', 'lang', 'audio_p'],
        data () {
            return {
                activeId:0,
                Description:"",
                Title:"",

            }
        },
        watch:{
            List:function (newVal, OldVal) {
                this.changeActive(newVal[this.activeId]);
            }
        },
        messages: {
            en: {
                main: 'Home',
                forum: 'Forum',
                rezult: 'VIEW RESULT',
                start: 'START',
                forumUrl: 'https://www.healino.com/blog-us'
            },
            ru: {
                main: 'Главная',
                forum: 'Форум',
                rezult: 'СМОТРЕТЬ РЕЗУЛЬТАТ',
                start: 'СТАРТ',
                forumUrl: 'https://www.healino.com/blog-ru'
            },
            pl: {
                main: 'Strona główna',
                forum: 'Forum',
                rezult: 'ZOBACZYĆ  REZULTAT',
                start: 'START',
                forumUrl: 'https://www.healino.com/blog-pl'
            }
        },
        computed: {
            body: function () {
                return {
                    SessionData: this.SessionData,
                }
            },
            userIMG: function () {

                if(this.userData.PhotoUrl){
                    return this.userData.PhotoUrl;
                }
                else{
                    return '../static/img/noIMG.png';
                }
            },

        },
        created: function() {
            this.changeActive(this.List[0]);
        },
        methods: {
            langString(string){
                return this.translate(string);
            },
            changeActive: function (list) {
                this.$emit('changeActiveTheme', list);
                if(list.ThemeStatus == 0 || list.ThemeStatus == 1 || list.ThemeStatus == 2 ) {
                    this.activeId = list.Id;
                    this.Description = list.Description;
                    this.Title = list.Title;
                    this.$emit('chAc', list.Id);
                }
            },
            isActive: function (id) {
                if(this.activeId == id){
                    return true;
                }else {
                    return false;
                }
            },
            getRezult:function (list) {
                this.$emit('changeActiveTheme', list);
                let t = this;
                $.post( '/api/Theme/GetThemeTestResult',  this.bodyForResult(list)  )
                    .done(function( data ){
                        t.$emit('toRezult',data);
                    });
            },
            bodyForResult: function (list) {
                return {
                    SessionData: this.SessionData,
                    Argument: list.Id,
                }
            },
        }
    }
</script>

<style>
  .filter img {
    opacity: 0.7;
    width: 40%;
  }
  .music_btn1{
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
</style>
