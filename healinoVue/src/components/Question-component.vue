<template>

  <div class="container themesPageContainer">
    <div class="header">
      <div class="headerContainer">
        <a href="/" class="logo_head"><img src="static/img/logoHeader.png" alt="" class=""></a>
        <a href="/" class="logo_head m"><img src="static/img/logoM.png" alt="" class=""></a>
        <a href="/" v-lang.main></a>
        <a v-bind:href="langString('forumUrl')" target="_blank" v-lang.forum></a>
        <h3>{{questionData.QuestionsProgress}}%</h3>
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
            }
        },
        messages: {
            en: {
                main: 'Home',
                forum: 'Forum',
                back: 'BACK',
                next: 'NEXT',
                finish: 'FINISH',
                forumUrl: 'https://www.healino.com/blog-us'
            },
            ru: {
                main: 'Главная',
                forum: 'Форум',
                back: 'НАЗАД',
                next: 'СЛЕДУЮЩИЙ',
                finish: 'ФИНИШ',
                forumUrl: 'https://www.healino.com/blog-ru'
            },
            pl: {
                main: 'Strona główna',
                forum: 'Forum',
                back: 'NAZAD',
                next: 'NASTĘPNY',
                finish: 'FINISZ',
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
        methods: {
            langString(string){
                return this.translate(string);
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

              if(this.AnswersId == 0 && this.questionData.AnswerOptions.length > 0){
                error=true;
              }
              if(!this.AnswerValue && this.questionData.QuestionTypeEnum==2){
                  error=true;
              }
              if(!error){
                  this.$emit('nextQuestion', this.body);
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
    margin: auto;
  }
</style>
