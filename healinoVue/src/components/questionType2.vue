<template>
  <div class="questionBlock type1">
    <h1>{{questionData.QText}}</h1>
    <div class="row">
      <label  v-if="questionData.AnswerOptions.length>0" >

        <div class="selectBlock"
             v-on:input="changeVal"
             v-on:click="setShowSelectId"
        >
          {{AnswerText}}
        </div>
        <div class="select" v-if="showSelectId">
          <p class="option" v-for="ans in questionData.AnswerOptions"
             v-on:click="setValueId(ans.Id, ans.AnswerText, $event)"
             v-bind:class="(ans.Id==AnswersId) ? 'active' : ''">{{ans.AnswerText}}</p>
        </div>
        <span class="check"  v-bind:class="(showLoadSelect==true) ? 'loading': ''" v-if="showCheckSelect">
          <i class="fa fa-check" aria-hidden="true"></i>
        </span>
      </label>
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
            AnswersId:"",
            AnswerValue: "",

            showCheckInput: false,
            showLoadInput: true,
            showCheckSelect: false,
            showLoadSelect: true,

            showSelectId:false,
            AnswerText:""
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

        changeInput(){
            let t = this;
            this.showCheckInput = true;
            this.showLoadInput =true;
            this.changeVal();
            setTimeout( function () {
                t.showLoadInput = false;

            }, 1500);
        },
        changeSelect(){
            let t = this;
            this.showCheckSelect = true;
            this.showLoadSelect =true;
            this.changeVal();
            setTimeout( function () {
                t.showLoadSelect = false;
            }, 1500);
        },
        setShowSelectId(event){
            //event.preventDefault();
            //$('select option').hide();

            if(event.target.className == "selectBlock") {
                this.showSelectId = true;
                setTimeout(function () {
                    if($('.active').length>0) {
                        $('.select').scrollTop($('.active').position().top - 40);
                    }else{
                        $('.select').scrollTop(0);
                    }
                },50)
            }
        },
        setValueId(id, AnswerText, event){
            //event.preventDefault();
            if(event) {
                event.stopPropagation();
            }
            this.showSelectId = false;
            this.AnswersId = id;
            this.AnswerText = AnswerText;
            this.changeSelect();
        }

    },
    watch: {
        questionData: function(newVal, oldVal) { // watch it
            this.AnswersId = "";
            this.AnswerValue = "";


            this.showCheckInput= false;
            this.showLoadInput= true;
            this.showCheckSelect= false;
            this.showLoadSelect= true;
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
                      setTimeout(function () {
                          t.setValueId(t.questionData.AnswerOptions[opt].Id, t.questionData.AnswerOptions[opt].AnswerText, t.$event);
                      },100);
                      return;
                  }
              }
          }
      }
    }
}
</script>

<style>

</style>
