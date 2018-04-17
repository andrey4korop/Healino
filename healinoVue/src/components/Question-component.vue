<template>

  <div class="container themesPageContainer">
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
    <div class="row sm">
      <div id="grad1" class="progressBarTheme">

        <img src="static/img/kl.png" alt="" id="hren">
        <img src="static/img/curcor.png" class="cursor" alt="">
        <div class="white" v-bind:style="{width: per + '%'}"></div>
      </div>
    </div>
    <div class="row ques">
      <div class="content col">
        <div id="grad1" class="progressBarTheme pc">
          <img src="static/img/kl.png" alt="" id="hren">
          <img src="static/img/curcor.png" class="cursor" alt="">
          <div class="white" v-bind:style="{width: per + '%'}"></div>
        </div>
        <questionType0 v-if="Type==0"
                       :questionData="questionData"
                       :errorQuest="errorQuest"
                       @changeVal="changeVal"></questionType0>
        <questionType2 v-if="Type==2"
                       :questionData="questionData"
                       :errorQuest="errorQuest"
                       @changeVal="changeVal"></questionType2>
        <questionType1 v-if="Type==1"
                       :questionData="questionData"
                       @changeVal="changeVal"></questionType1>
      </div>
      <div class="green">
        <button v-if="(questionData.QuestionNum > 1)"
                v-on:click="prevQuestion" v-lang.back></button>
        <button v-on:click="nextQuestion"
                v-if="(questionData.TotalQuestions!=this.questionData.QuestionNum)"
                v-lang.next></button>
        <button v-on:click="nextQuestion"
                v-if="(questionData.TotalQuestions==this.questionData.QuestionNum)"
                v-lang.finish></button>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        props: ['SessionData', 'questionData', 'userData', 'lang', 'errorQuest', 'audio_p'],
        data () {
            return {
                AnswersId:"",
                AnswerValue: "",
                Type:-1,
              showPopupUser:false,
             /*questionData:{"PreviusQuestionId":7,"QuestionId":8,"QuestionNum":2,"TotalQuestions":23,"QuestionTypeEnum":2,"UserThemeTestId":89,
                "IsAnswered":false,"AnsValue":5,"QText":"У Вас высокий уровень толерантности?\r\n","ImageUrl":null,
                "QuestionsProgress":22.0,
                "AnswerOptions":[
                        {"Id":29,"ParrentId":null,"AnswerText":"Да","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":30,"ParrentId":null,"AnswerText":"Нет","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":31,"ParrentId":null,"AnswerText":"Нет","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":32,"ParrentId":null,"AnswerText":"Нет","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":33,"ParrentId":null,"AnswerText":"Нет","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":34,"ParrentId":null,"AnswerText":"Нет","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":35,"ParrentId":null,"AnswerText":"Иногда бывает длинный текст","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":36,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":37,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":38,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":39,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":40,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":41,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":42,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},],
                "NextQuestionId":14,"ErrorCode":1,"DebugMessage":null,"UIMessage":null},*/
            }
        },
        messages: {
            en: {
                main: 'Home',
                forum: 'Forum',
                back: 'BACK',
                next: 'NEXT',
                finish: 'FINISH',
              editUser:'Edit profile',
              getRezult:'Email results',
              exit:'Exit',
                forumUrl: 'https://www.healino.com/blog-us'
            },
            ru: {
                main: 'Главная',
                forum: 'Форум',
                back: 'НАЗАД',
                next: 'СЛЕДУЮЩИЙ',
                finish: 'ФИНИШ',
              editUser:'Редактировать профиль',
              getRezult:'Результаты электронной почты',
              exit:'Выход',
                forumUrl: 'https://www.healino.com/blog-ru'
            },
            pl: {
                main: 'Strona główna',
                forum: 'Forum',
                back: 'NAZAD',
                next: 'NASTĘPNY',
                finish: 'FINISZ',
              editUser:'Edytuj profil',
              getRezult:'Wyślij wyniki e-mailem',
              exit:'Wyjście',
                forumUrl: 'https://www.healino.com/blog-pl'
            }
        },
        computed: {
            body: function () {

                return {
                    SessionData: this.SessionData,
                    UserThemeTestId: this.questionData.UserThemeTestId,
                    QuestionId: this.questionData.QuestionId,
                    AnswersId: this.AnswersId,
                    AnswerValue: this.AnswerValue,
                }
            },
            prevBody: function () {

                return {
                    SessionData: this.SessionData,
                    Argument: this.questionData.UserThemeTestId,
                    QuestionId: this.questionData.PreviusQuestionId,

                }
            },
            per: function(){
                return  100 - (this.questionData.QuestionNum) / this.questionData.TotalQuestions * 100 ;


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
            /*this.QuestionId = this.questionData.QuestionId;
            this.UserThemeTestId = this.questionData.UserThemeTestId;*/
            this.Type = this.getType();
        },
        watch: {
            questionData: function(newVal, oldVal) { // watch it
                this.Type = -1;
                let t = this;
                setTimeout(function () {
                    t.Type = newVal.QuestionTypeEnum;
                },5);

                this.AnswersId = "";
                this.AnswerValue = "";
            }
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
            langString(string){
                return this.translate(string);
            },
          showPopupUserOn(){
            this.showPopupUser = true;
          },
            getType() {
                return this.questionData.QuestionTypeEnum;
            },
            changeVal(newVal){
                this.AnswersId= newVal.AnswersId;
                this.AnswerValue= newVal.AnswerValue;
                this.$emit('clearnError');
            },
            nextQuestion(){
                let error = false;

              if((!this.AnswersId || this.AnswersId == 0) && this.questionData.AnswerOptions.length > 0){
                error=true;
              }
              if(!this.AnswerValue && this.questionData.QuestionTypeEnum==2){
                  error=true;
              }
              if(!error){
                  this.$emit('nextQuestion', this.body);
              }else{
                this.$emit('setErrorQuestion');
              }
            },
            prevQuestion(){
                this.$emit('prevQuestion');
            }
        }
    }
</script>

<style>
  .music_btn1{
    width: 30px;
    height: 27px;
    margin-left: 10px;
  }
  .row.sm{
    position: unset;
    top: 100px;
    margin-bottom: 20px;
    margin-top: 80px;
  }
  .themesPageContainer{
    justify-content: flex-start;
  }
  .ques{
    margin: auto 5px;
    /*margin-top: 70px; TODO  */
  }
  .col{
    position: relative;
    z-index:1;
    margin-top: 80px;
  }
  .themesPageContainer label {
    margin: 4% calc(100% / 24);
  }
  @media screen and (max-width: 760px) {
    .themesPageContainer label {
       margin: 40px calc(100% / 24);
     }
    .themesPageContainer label:nth-child(2) {
      margin: 10px calc(100% / 24);
    }
    .themesPageContainer .content.col {
      margin-top: 0;
    }
  }
</style>
