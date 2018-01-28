<template>

  <div class="container themesPageContainer">
    <div class="row">
      <div class="content col">
        <div class="progressBarTheme">

        </div>
        <questionType0 v-if="getType()==0"
                       :questionData="questionData" @changeVal="changeVal"></questionType0>
        <questionType2 v-if="getType()==2"
                :questionData="questionData" @changeVal="changeVal"></questionType2>
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
                let v;
                if(this.questionData.UsetThemeTestId){
                    v=this.questionData.UsetThemeTestId;
                }else {
                    v=this.questionData.UserThemeTestId;
                }
                return {
                    SessionData: this.SessionData,
                    UserThemeTestId: v,
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
