<template>

  <div class="questionBlock type3" v-if="!questionData.ImageUrl">
    <h1>{{questionData.QText}}</h1>
    <div class="row">

      <div class="imgAnswer" v-for="ans in questionData.AnswerOptions"
           v-on:click.prevent="changeActive(ans)"
           v-bind:style="{background: 'url(' + ans.ImageUrl + ') center center / cover' }"
           v-bind:class="(AnswersId == ans.Id) ? 'check' : ''">
      </div>

    </div>
  </div>
  <div class="questionBlock type4" v-else>

    <div class="row">
      <div class="imgQ">
        <h1>{{questionData.QText}}</h1>
        <img v-bind:src="questionData.ImageUrl" alt="">
      </div>
      <div class="right">
        <h1>Answers:</h1>
        <div class="answer">

          <div class="imgAnswer" v-for="ans in questionData.AnswerOptions"
               v-on:click.prevent="changeActive(ans)"
               v-bind:style="{background: 'url(' + ans.ImageUrl + ') center center / cover' }"
               v-bind:class="(AnswersId==ans.Id) ? 'check' : ''">
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['questionData'],
    data () {
        return {
            AnswersId:"",
            AnswerValue: "",
    }},
    computed:{
      newVal:function () {
          return {
              AnswersId: this.AnswersId,
              AnswerValue: this.AnswerValue,
          }
      }
    },

    methods:{
        changeVal: function () {
            this.$emit('changeVal', this.newVal);
        },
        changeActive(ans){
            this.AnswersId = ans.Id;
            this.changeVal();
        }
    },
    watch: {
        questionData: function(newVal, oldVal) { // watch it

            this.AnswersId = "";
            this.AnswerValue = "";
        }
    },
  created: function() {
      if (this.questionData.IsAnswered) {
          if (this.questionData.AnsValue) {
              this.AnswerValue = this.questionData.AnsValue;
              this.changeVal();
          }
          if(this.questionData.AnswerOptions.length>0){
              for(var opt in this.questionData.AnswerOptions){
                  if(this.questionData.AnswerOptions[opt].IsUserAnswered){
                      this.changeActive(this.questionData.AnswerOptions[opt]);
                  }
              }
          }
      }
    }
}
</script>

<style>

</style>
