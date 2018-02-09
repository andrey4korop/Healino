<template>
  <div class="questionBlock type1">
    <h1>{{questionData.QText}}</h1>
    <div class="row">
      <label  v-if="questionData.QuestionTypeEnum==2">

        <input type="text"
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
      <label  v-if="questionData.AnswerOptions.length>0">

        <select v-model="AnswersId"
                v-on:input="changeVal"
                v-on:change="changeSelect"
               >
          <option v-for="ans in questionData.AnswerOptions" v-bind:value="ans.Id" >{{ans.AnswerText}}</option>

        </select>
        <span class="check"  v-bind:class="(showLoadSelect) ? 'loading': ''" v-if="showCheckSelect">
          <i class="fa fa-check" aria-hidden="true"></i>
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
            //console.log(t);
            this.showCheckInput = true;
            this.showLoadInput =true;
            this.changeVal();
            setTimeout( function () {
                t.showLoadInput = false;

            }, 1500);
        },
        changeSelect(){
            let t = this;
            //console.log(t);
            this.showCheckSelect = true;
            this.showLoadSelect =true;
            this.changeVal();
            setTimeout( function () {
                t.showLoadSelect = false;


            }, 1500);
        },

    },
    watch: {
        questionData: function(newVal, oldVal) { // watch it
            console.log(newVal);
            this.AnswersId = "";
            this.AnswerValue = "";

            this.showCheckInput= false;
            this.showLoadInput= true;
            this.showCheckSelect= false;
            this.showLoadSelect= true;
        }
    },
  created: function() {
        //console.log('type0');

    }
}
</script>

<style>

</style>
