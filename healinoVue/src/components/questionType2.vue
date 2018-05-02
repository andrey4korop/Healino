<template>
  <div class="questionBlock type1">
    <h1>{{questionData.QText}}</h1>
    <div class="row">
      <selectBlock v-if="questionData.AnswerOptions.length>0"
                   :valueItem="selectId"
                   :selectOption="valForSelect"
                   :errorQuest="errorQuest"
                   :selectedBlock="selectedBlock"
                   @changeValSelect="changeValSelect"
                   @pushSelectOption="pushSelectOption"
      ></selectBlock>
      <selectBlock v-if="questionData.ValueStep"
                   :valueItem="selectId2"
                   :selectOption="valForSelect2"
                   :errorQuest="errorQuest"
                   :selectedBlock="selectedBlock"
                   @changeValSelect="changeValSelect2"
      ></selectBlock>
      <label  v-if="questionData.ValueStep==0">
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
  props: ['questionData', 'errorQuest', 'answerSelectSelected'],
  data () {
    return {
      AnswersId: "",
      AnswerValue: "",
      selectId: "",
      selectId2: "",

      selectedBlock:"",

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
    valForSelect:function () {
      let r =[];
      jQuery.each(this.questionData.AnswerOptions, function (i, val) {
        r.push({key: i, title: val.AnswerText, Id:val.Id});
      });
      return r;
    },
    valForSelect2:function () {
      let r =[];
      if(this.questionData.ValueStep){
        for (var val = this.questionData.MinValue, i = 0; val <= this.questionData.MaxValue; val += this.questionData.ValueStep, i++) {
          r.push({key: i, title: Math.round(val * 100) / 100, Id: Math.round(val * 100) / 100});
        }
      }
      return r;
    }
  },

  methods: {
    changeVal: function () {
      this.$emit('changeVal', this.newVal);
    },
    pushSelectOption(opt){
      this.$emit('pushSelectOption', opt);
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
    changeValSelect2(k){
        this.AnswerValue = this.valForSelect2[k].Id;
        this.selectId2 = k;
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
        if(this.questionData.ValueStep) {
          if (this.questionData.AnsValue > this.questionData.MaxValue) {
            this.selectId2 = this.valForSelect2.length - 1;
            this.AnswerValue = this.valForSelect2[this.valForSelect2.length - 1];
          } else {
            for (var opt in this.valForSelect2) {
              if (this.questionData.AnsValue <= this.valForSelect2[opt].Id) {
                this.AnswerValue = this.valForSelect2[opt].Id;
                this.selectId2 = opt;
                break;
              }
            }
          }
          this.changeInput();
        }else{
          this.AnswerValue = this.questionData.AnsValue;
          this.changeInput();
        }
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
    }else {
      let d = this.answerSelectSelected.reverse();
      let selectIn = 10000;
      var ind;
      $.each(this.questionData.AnswerOptions, function (index, value) {
        let q = d.indexOf(value.AnswerText);
        if (q < selectIn && q != -1) {
          selectIn = q;
          ind = index;
        }
      });
      this.answerSelectSelected.reverse();
      if (ind < this.questionData.AnswerOptions.length) {
        this.AnswersId = this.questionData.AnswerOptions[ind].Id;
        this.AnswerText = this.questionData.AnswerOptions[ind].AnswerText;
        this.selectId = ind;
        this.changeVal();
      }
    }
  }
}
</script>

<style scoped>
  .hidden{
    visibility: hidden;
  }
</style>
