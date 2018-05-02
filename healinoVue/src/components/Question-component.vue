<template>

  <div class="container themesPageContainer">
    <headerComponent
            :lang="lang"
            :audio_p="audio_p"
            :userData="userData"
            :QuestionsProgress="userData.QuestionsProgress"
            @changeLang="changeLang"
            @onToUser="$emit('onToUser')"
            @exit="$emit('exit')"
            @toStart="$emit('toStart')"
            @audio="$emit('audio')"></headerComponent>
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
                       :answerSelectSelected="answerSelectSelected"
                       @pushSelectOption="pushSelectOption"
                       @changeVal="changeVal"></questionType0>
        <questionType2 v-if="Type==2"
                       :questionData="questionData"
                       :errorQuest="errorQuest"
                       @pushSelectOption="pushSelectOption"
                       :answerSelectSelected="answerSelectSelected"
                       @changeVal="changeVal"></questionType2>
        <questionType1 v-if="Type==1"
                       :questionData="questionData"
                       :answerSelectSelected="answerSelectSelected"
                       @pushSelectOption="pushSelectOption"
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
        props: ['SessionData', 'questionData', 'userData', 'lang', 'errorQuest', 'audio_p', 'answerSelectSelected'],
        data () {
            return {
                AnswersId:"",
                AnswerValue: "",
                Type:-1,
              showPopupUser:false,

              touchstartX:0,
              touchendX:0,
              doPrevTouch:true,
             /*questionData:{"PreviusQuestionId":7,"QuestionId":8,"QuestionNum":2,"TotalQuestions":23,"QuestionTypeEnum":2,"UserThemeTestId":89,
                "IsAnswered":true,"AnsValue":10,"QText":"У Вас высокий уровень толерантности?\r\n","ImageUrl":null,
                "QuestionsProgress":22.0,
               "MinValue": 1,
               "MaxValue": 10,
               "ValueStep": 2,
                "AnswerOptions":[
                        {"Id":29,"ParrentId":null,"AnswerText":"Да","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":30,"ParrentId":null,"AnswerText":"Нет","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":31,"ParrentId":null,"AnswerText":"Нет","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":32,"ParrentId":null,"AnswerText":"кг","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":33,"ParrentId":null,"AnswerText":"фунт","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":34,"ParrentId":null,"AnswerText":"Иногда бывает длинный","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":35,"ParrentId":null,"AnswerText":"Иногда бывает длинный текст","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":36,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":37,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":38,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":39,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":false,"Children":null},
                        {"Id":40,"ParrentId":null,"AnswerText":"Иногда\r\n","ImageUrl":null,"IsUserAnswered":true,"Children":null},
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
        $(document).on('touchstart', '.ques', function(event) {
          if ($(event.target).parents('.ques').length &&
                  !($(event.target).parents('.selectBlock').length ||
                  $(event.target).parents('.selectBlockNeed').length ||
                  $(event.target).hasClass('selectBlockNeed')||
                  $(event.target).hasClass('selectBlock'))) {
            t.touchstartX = event.originalEvent.touches[0].screenX;
            t.doPrevTouch=true;
          }else{
            t.doPrevTouch=false;
          }
        });
        $(document).on('touchend', '.ques', function(event) {
          if ($(event.target).parents('.ques').length && t.doPrevTouch &&
                  !($(event.target).parents('.selectBlock').length ||
                  $(event.target).parents('.selectBlockNeed').length ||
                  $(event.target).hasClass('selectBlockNeed')||
                  $(event.target).hasClass('selectBlock'))) {
            t.touchendX = event.originalEvent.changedTouches[0].screenX;
            if((Math.abs(t.touchendX-t.touchstartX)>50)){
              if (t.touchendX > t.touchstartX) {
                if(t.questionData.QuestionNum > 1) {
                  t.prevQuestion();
                }
              }
            }
          }
        });
      },
      destroyed(){
        $(document).unbind('touchstart');
        $(document).unbind('touchend');
      },
        methods: {
          changeLang(lang){
            this.$emit('changeLang', lang);
          },
          pushSelectOption(opt){
            this.$emit('pushSelectOption', opt);
          },
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

<style scoped>
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
