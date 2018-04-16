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
                <li v-on:click="$emit('onToUser')">Edit profile</li>
                <li>Email rezults</li>
                <li v-on:click="$emit('exit')">Exit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row sm-margin">
      <div class="content">
        <div class="mar">
          <div class="themes">
            <div class="theme" v-for="list in List"
                 v-on:click.prevent="changeActive(list)"
                 v-bind:class="[(list.ThemeStatus=='3') ? 'disable' : '', (list.QuestionsTotal==list.QuestionsFinished) ? 'check' : '']" >
                <div class="buy" v-if="list.ThemeStatus==4">0.99$</div>
                <img v-bind:src="'static/img/theme_'+ list.Id +'.png'">
              <div class="filter" v-on:click="changeActive(list)">
                <img src="/static/img/activeTheme.png" alt="" v-if="(isActive(list.Id) && list.QuestionsTotal!=list.QuestionsFinished)" style="position: absolute" class="checktheme1">
                <img src="/static/img/theme_finish.png" alt=""  v-if="(list.QuestionsTotal==list.QuestionsFinished)">
                <div v-if="(list.QuestionsTotal==list.QuestionsFinished)" class="text_rezult" v-on:click.prevent="getRezult(list)">
                  <p> <img src="/static/img/mark.png" class="mark"> {{langString('rezult')}}</p>
                </div>
               <!-- <button v-on:click.prevent="getRezult(list)"  v-lang.rezult></button>-->
              </div>
            </div>
          </div>
        </div>
        <div class="descriptionTheme">
          <h1>{{Title}}</h1>
          <p>{{Description}} </p>
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
                /*List:[
                        {"Id":3,
                            "QuestionsFinished":3,
                            "QuestionsTotal":3,
                            "Title":"Общее состояния здоровья\r\n",
                            "ImageUrl":"http://img2.ntv.ru/home/schedule/2016/20160305/ed.jpg",
                            "Description":"\"Тест предназначен для самооценки состояния здоровья, напоминания о необходимости правильного образа жизни, снижения устранимых факторов риска или незамедлительного обращения к врачу. \nНаш организм самоисцеляется, и степень самоисцеления связана с характером питания и особенностями образа жизни, которые играют большую роль на протяжении всей его жизни. \nКаждый из нас в состоянии полностью контролировать устранимые факторы риска самостоятельно и управлять ими. К ним относят физическую нагрузку и упражнения, правильное питание, контроль за весом тела, отказ от курения и потребления алкоголя, стресс, повышенное давление, уровень холестерина и триглицеридов, диабет.\"\t\t\t\t\t\t\t\t\t\r\n",
                            "ThemeStatus":0},
                    {"Id":2,
                        "QuestionsFinished":0,
                        "QuestionsTotal":23,
                        "Title":"Реальный возраст\r\n",
                        "ImageUrl":"http://img2.ntv.ru/home/schedule/2016/20160305/ed.jpg",
                        "Description":"\"Тест предназначен для определения ментального и биологического  возраста.\nСравнените возрасты  с хронологическим возрастом\"\t\t\t\t\t\t\t\t\t\r\n",
                        "ThemeStatus":0},
                    {"Id":1,
                        "QuestionsFinished":0,
                        "QuestionsTotal":6,
                        "Title":"Риск возникновения атеросклеротического сердечно-сосудистого заболевания\r\n",
                        "ImageUrl":"http://img2.ntv.ru/home/schedule/2016/20160305/ed.jpg",
                        "Description":"\"Тест предназначен для оценки риска возникновения сердечно-сосудистого заболевания.\nПри этом горизонт риска - вся жизнь и ближайшие 10 лет\"\t\t\t\t\t\t\t\t\t\r\n",
                        "ThemeStatus":4}],*/
              showPopupUser:false,
            }
        },
        watch:{
            List:function (newVal, OldVal) {
                this.changeActive(newVal[0]);
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
        mounted(){
          let t = this;
          $(document).mouseup(function (e) {
            var container = $(".user_Avatar");
            if (container.has(e.target).length === 0){
              t.showPopupUser = false;
            }
          })
        },
        methods: {
            showPopupUserOn(){
              this.showPopupUser = true;
            },
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
    height: 27px;
    margin-left: 10px;
  }
  .row{
    margin-top: 70px;
  }
  .text_rezult{
    position: absolute;
    width: 20%;
    font-size: 10px;
    left: 4%;
    text-align: center;
    display: flex;
    height: 100%;
  }
  .text_rezult p{
    margin: auto;
  }
  .themesPageContainer .themes .theme.check .filter p .mark{
    opacity: 1;
    width: 40%;
  }
  .filter{
    position: absolute;
    top:0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .checktheme1{
    opacity: 1!important;
    height: 100%;
  }
    .buy{
        background: #79ce77;
        display: inline-block;
        padding: 5px 20px;
        border-radius: 20px;
        position: absolute;
        top: 29px;
        left: 135px;
        z-index: 1;
    }
    .buy + img{
        opacity: 0.6;
    }
</style>
