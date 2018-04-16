<template>
  <div class="questionBlock type1">
    <h1>{{questionData.QText}}</h1>
    <div class="row">
      <selectBlock v-if="questionData.AnswerOptions.length>0"
                   :valueItem="selectId"
                   :selectOption="valForSelect"
                   @changeValSelect="changeValSelect"
      ></selectBlock>
      <label>

        <input type="number"
               v-model="AnswerValue"
               v-on:input="changeVal"
               v-on:change="changeInput">
        <span class="check"  v-bind:class="(showLoadInput) ? 'loading': ''" v-if="showCheckInput && !errorQuest">
          <i class="fa fa-check" aria-hidden="true"></i>
        </span>
        <span class="check" v-bind:class="(errorQuest) ? 'error' : ''" v-if="errorQuest">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['questionData', 'errorQuest'],
  data () {
    return {
      AnswersId: "",
      AnswerValue: "",
      selectId: "",

      showCheckInput: false,
      showLoadInput: true,
      showCheckSelect: false,

      AnswerText: ""
    }
  },
  computed: {
    needMargin: function () {
      return this.showSelectId && this.questionData.QuestionTypeEnum != 2
    },
    newVal: function () {

      return {
        AnswersId: this.AnswersId,
        AnswerValue: this.AnswerValue,
      }
    },
    valForSelect: function () {
      let r = [];
      for (var item in this.questionData.AnswerOptions) {
        r.push({
          key: item,
          title: this.questionData.AnswerOptions[item].AnswerText,
          Id: this.questionData.AnswerOptions[item].Id
        });
      }
      return r;
    }
  },

  methods: {
    changeVal: function () {
      this.$emit('changeVal', this.newVal);
    },

    changeInput(){
      let t = this;
      this.showCheckInput = true;
      this.showLoadInput = true;
      this.changeVal();
      setTimeout(function () {
        t.showLoadInput = false;

      }, 1500);
    },
    changeValSelect(k){
      if (k && k > -1) {
        this.AnswersId = this.questionData.AnswerOptions[k].Id
      } else {
        this.AnswersId = this.questionData.AnswerOptions[0].Id
      }
      this.changeVal();
    },
    setValueId(id, AnswersId, AnswerText, event){
      //event.preventDefault();
      if (event) {
        event.stopPropagation();
      }
      this.showSelectId = false;
      this.AnswersId = AnswersId;
      this.selectId = id;
    },
  },
  watch: {
    questionData: function (newVal, oldVal) { // watch it
      this.AnswersId = "";
      this.AnswerValue = "";

      this.showCheckInput = false;
      this.showLoadInput = true;
    }
  },
  created: function () {
    if (this.questionData.IsAnswered) {
      if (this.questionData.AnsValue) {
        this.AnswerValue = this.questionData.AnsValue;
        this.changeInput();
      }
      if (this.questionData.AnswerOptions.length > 0) {
        for (var opt in this.questionData.AnswerOptions) {
          if (this.questionData.AnswerOptions[opt].IsUserAnswered) {
            let t = this;
            this.showSelectId = false;
            this.AnswersId = t.questionData.AnswerOptions[opt].Id;
            this.AnswerText = t.questionData.AnswerOptions[opt].AnswerText;
            this.selectId = opt;
          }
        }
      }
      this.changeVal();
    }
  }
}
</script>

<style>
  .option:first-child{
    margin-top: 55px;
  }
  .option:last-child{
    margin-bottom: 55px;
  }
  .colorActive{
    background-color: #79cd77;
    opacity: 0.43;
    height: 40px;
    width: 100%;
    position: absolute;
    z-index: 100;
    top:56px;
    transition: all 0.2s linear;
  }
  .nocolorActive{
    background-color: transparent;
    opacity: 0;
    height: 40px;
    width: 100%;
    position: absolute;
    z-index: 100;
    top:0px;
  }
  .nocolorActive:last-child{
    background-color: transparent;
    opacity: 0;
    height: 40px;
    width: 100%;
    position: absolute;
    z-index: 100;
    top:100px;
  }
  .selectBlockNeed{
    position: absolute;
    width: 100%;
    box-shadow: inset 0px 10px 30px 0px #fff, inset 0px -10px 30px 0px #fff;
    height: 150px;
    top: -50px;
    border-radius: 15px;
  }
  .hidden{
    visibility: hidden;
  }
</style>
