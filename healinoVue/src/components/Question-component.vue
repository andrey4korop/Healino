<template>

  <div class="container themesPageContainer">
    <div class="header">
      <div class="headerContainer">
        <a href="/" class="logo_head"><img src="static/img/logoHeader.png" alt="" class=""></a>
        <a href="/" class="logo_head m"><img src="static/img/logoM.png" alt="" class=""></a>
        <a href="/">Home</a>
        <a href="/">Forum</a>
        <h3>{{questionData.QuestionsProgress}}%</h3>
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
    <div class="row sm" style="position: absolute; top: 100px;">
      <div id="grad1" class="progressBarTheme">
        <img src="static/img/curcor.png" class="cursor" alt="">
        <div class="white" v-bind:style="{width: per + '%'}"></div>
      </div>
    </div>
    <div class="row">
      <div class="content col">
        <div id="grad1" class="progressBarTheme pc">
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
        <button v-on:click="$emit('toTheme')">BACK</button>
        <button v-on:click="nextQuestion">NEXT</button>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        props: ['SessionData', 'questionData', 'userData', 'lang', 'errorQuest'],
        data () {
            return {


                //UserThemeTestId: 0,
                //QuestionId: 0,
                AnswersId:"",
                AnswerValue: "",
                Type:-1,
                //SessionData: "string",
                //IpAddress: "string",
                //Localization: "string"

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
            per: function(){
                return  100 - (this.questionData.QuestionNum - 1) / this.questionData.TotalQuestions * 100 ;


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
                console.log(this.Type);
                let t = this;
                setTimeout(function () {
                    t.Type = newVal.QuestionTypeEnum;
                    console.log(t.Type);
                },5);

                this.AnswersId = "";
                this.AnswerValue = "";
            }
        },
        methods: {
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

            }
        }
    }
</script>

<style>

</style>
