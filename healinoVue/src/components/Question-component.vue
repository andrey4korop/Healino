<template>

  <div class="container themesPageContainer">
    <div class="header">
      <div class="headerContainer">
        <a href="/" class="logo_head"><img src="static/img/logoHeader.png" alt="" class=""></a>
        <a href="/" class="logo_head m"><img src="static/img/logoM.png" alt="" class=""></a>
        <a href="/">Home</a>
        <a href="/">Forum</a>
        <h3>77%</h3>
        <div class="lang">
          <img src="static/img/langUA.png" alt="" class="">
          <ul>
            <li><img src="static/img/langPL.png" alt=""></li>
            <li><img src="static/img/langUSA.png" alt=""></li>
            <li><img src="static/img/langUA.png" alt=""></li>
          </ul>
        </div>

        <img src="static/img/userAvatar.png" alt="" class="user_Avatar">
      </div>
    </div>
    <div class="row">
      <div class="content col">
        <div class="progressBarTheme">

        </div>
        <questionType0 v-if="getType()==0"
                       :questionData="questionData" @changeVal="changeVal"></questionType0>
        <questionType2 v-if="getType()==2"
                :questionData="questionData" @changeVal="changeVal"></questionType2>
        <questionType1 v-if="getType()==1"
                       :questionData="questionData" @changeVal="changeVal"></questionType1>
      </div>
      <div class="green">
        <button>BACK</button>
        <button v-on:click="nextQuestion">NEXT</button>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        props: ['SessionData', 'questionData'],
        data () {
            return {


                UserThemeTestId: 0,
                QuestionId: 0,
                AnswersId: 0,
                AnswerValue: 0,
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
                    QuestionId: this.QuestionId,
                    AnswersId: this.AnswersId,
                    AnswerValue: this.AnswerValue,
                }
            }
        },
        created: function() {
            this.QuestionId = this.questionData.QuestionId;
            this.UserThemeTestId = this.questionData.UserThemeTestId;
        },
        methods: {
            getType() {
                return this.questionData.QuestionTypeEnum;
            },
            changeVal(newVal){
                this.AnswersId= newVal.AnswersId;
                this.AnswerValue= newVal.AnswerValue;
            },
            nextQuestion(){

              this.$emit('nextQuestion', this.body);
            }
        }
    }
</script>

<style>

</style>
