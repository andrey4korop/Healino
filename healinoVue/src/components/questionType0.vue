<template>
  <div class="questionBlock type1" v-if="!questionData.ImageUrl">
    <h1>{{questionData.QText}}</h1>
    <div class="row" v-bind:class="(needMargin)? 'varyNeedMar':''">
      <selectBlock v-if="questionData.AnswerOptions.length>0"
                   :valueItem="selectId"
                   :selectOption="valForSelect"
                   :errorQuest="errorQuest"
                   @changeValSelect="changeValSelect"
                   @pushSelectOption="pushSelectOption"
      ></selectBlock>
      <label  v-if="questionData.QuestionTypeEnum==2">

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
  <div class="questionBlock type2" v-else="">

    <div class="row">
      <div class="imgQ">
        <img v-bind:src="questionData.ImageUrl" alt="">
      </div>
      <div class="right">
        <h1>{{questionData.QText}}</h1>
        <selectBlock v-if="questionData.AnswerOptions.length>0"
                     :valueItem="selectId"
                     :selectOption="valForSelect"
                     :errorQuest="errorQuest"
                     @changeValSelect="changeValSelect"
                     @pushSelectOption="pushSelectOption"
        ></selectBlock>

      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['questionData', 'errorQuest', 'answerSelectSelected'],
    data () {
        return {
            AnswersId:"",
            AnswerValue: "",
            selectId:"",

            showCheckInput: false,
            showLoadInput: true,
    }},
    computed:{
      needMargin:function () {
          return this.showSelectId && this.questionData.QuestionTypeEnum!=2
      },
      newVal:function () {
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
      }
    },

    methods:{
      pushSelectOption(opt){
        this.$emit('pushSelectOption', opt);
      },
        changeVal: function () {
            this.$emit('changeVal', this.newVal);
        },
        changeInput(){
            let t = this;
            this.showCheckInput = true;
            this.showLoadInput =true;
            this.changeVal();
            setTimeout( function () {
                t.showLoadInput = false;

            }, 1500);
        },
        changeValSelect(k){
          if(k && k>-1){
            this.AnswersId = this.questionData.AnswerOptions[k].Id
          }else{
            this.AnswersId = this.questionData.AnswerOptions[0].Id
          }
          this.changeVal();
        },
        setValueId(id, AnswersId, AnswerText, event){
            //event.preventDefault();
            if(event) {
                event.stopPropagation();
            }
            this.showSelectId = false;
            this.AnswersId = AnswersId;
            this.selectId = id;
        },
    },
    watch: {
        questionData: function(newVal, oldVal) { // watch it
            this.AnswersId = "";
            this.AnswerValue = "";

            this.showCheckInput= false;
            this.showLoadInput= true;
        }
    },
  created: function() {
      if (this.questionData.IsAnswered) {
          if (this.questionData.AnsValue) {
              this.AnswerValue = this.questionData.AnsValue;
              this.changeInput();
          }
          if(this.questionData.AnswerOptions.length>0){
              for(var opt in this.questionData.AnswerOptions){
                  if(this.questionData.AnswerOptions[opt].IsUserAnswered){
                      let t = this;
                    this.showSelectId = false;
                    this.AnswersId = t.questionData.AnswerOptions[opt].Id;
                    this.AnswerText = t.questionData.AnswerOptions[opt].AnswerText;
                    this.selectId = opt;
                  }
              }
          }
        this.changeVal();
      }else{
        let d = this.answerSelectSelected.reverse();
        let selectIn = 10000;
        var ind;
        $.each(this.questionData.AnswerOptions, function (index, value) {
          let q = d.indexOf(value.AnswerText);
          if(q<selectIn && q!=-1){
            selectIn = q;
            ind = index;
          }
        });
        this.answerSelectSelected.reverse();
        if(ind < this.questionData.AnswerOptions.length) {
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
