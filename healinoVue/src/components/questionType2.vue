<template>
  <div class="questionBlock type1">
    <h1>{{questionData.QText}}</h1>
    <div class="row">
      <label  v-if="questionData.AnswerOptions.length>0" >

        <div class="selectBlock"
             v-on:input="changeVal"
             v-on:click="setShowSelectId"
             v-bind:class="(showSelectId?'hidden':'')"
        >
          {{AnswerText}}
        </div>
        <div class="selectBlockNeed" v-if="showSelectId" v-on:click="changeSelectColor()">
          <div class="select">
            <p class="option" v-for="ans in questionData.AnswerOptions"
               v-on:click="setValueId(ans.Id, ans.AnswerText, $event)"
               v-bind:class="(ans.Id==AnswersId) ? 'active' : ''">{{ans.AnswerText}}</p>
          </div>
          <div class="colorActive" v-if="showSelectId" v-on:click="changeSelectColor()"></div>
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
          touchstartX : 0,
          touchstartY : 0,
          touchendX : 0,
          touchendY : 0,

          anchors: [],
          currentAnchor: 0,
          isAnimating : false,

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
      changeSelectColor(){
        this.showSelectId = false;
        this.changeSelect();
      },
      setShowSelectId(event){
        //event.preventDefault();
        //$('select option').hide();

        if(event.target.className == "selectBlock") {
          this.showSelectId = true;
          let t = this;
            setTimeout(function () {
                if(t.currentAnchor==0){
                    t.currentAnchor=0;
                    t.AnswersId = t.questionData.AnswerOptions[t.currentAnchor].Id;
                    t.AnswerText = t.questionData.AnswerOptions[t.currentAnchor].AnswerText;
                    t.changeVal();
                }

                t.updateAnchors();
                $('.colorActive').css({'height':$('.option')[t.currentAnchor].offsetHeight});
                $('.colorActive').css({'top':(150-$('.option')[t.currentAnchor].offsetHeight)/2});
                if($('.active').length>0) {
                    $('.select').scrollTop($('.active').position().top - (150-$('.option')[t.currentAnchor].offsetHeight)/2);
                    t.currentAnchor =$('.active').index();
                }else{
                    t.AnswersId = t.questionData.AnswerOptions[0].Id;
                    t.AnswerText = t.questionData.AnswerOptions[0].AnswerText;
                    t.changeVal();
                    $('.select').scrollTop(0);
                    t.currentAnchor =0;
                }

            },10)
        }
      },
      updateAnchors() {
        this.anchors = [];
        let t = this;
        $('p.option').each(function(i, element){
          t.anchors.push( $(element).position().top );
        });

      },
      handleGesure(k) {
        let t = this;
        if( t.isAnimating ) {
          return false;
        }
        t.isAnimating  = true;
        if((Math.abs(t.touchendY-t.touchstartY)>10)) {
          if (this.touchendY < this.touchstartY) {
            //alert( 'up!');
            if (t.questionData.AnswerOptions.length - 1 != t.currentAnchor) {
              t.currentAnchor++;
            }
            t.AnswersId = t.questionData.AnswerOptions[t.currentAnchor].Id;
            t.AnswerText = t.questionData.AnswerOptions[t.currentAnchor].AnswerText;
            t.changeVal();
            if (t.currentAnchor > (t.anchors.length - 1)
                    || t.currentAnchor < 0) {
              t.currentAnchor = 0;
            }
            t.isAnimating = true;
            $('.colorActive').css({'height': $('.option')[t.currentAnchor].offsetHeight});
            $('.colorActive').css({'top': (150 - $('.option')[t.currentAnchor].offsetHeight) / 2});
            $('.select').animate({
              scrollTop: parseInt(t.anchors[t.currentAnchor] - (150 - $('.option')[t.currentAnchor].offsetHeight) / 2)//55
            }, 200, 'swing', function () {
              t.isAnimating = false;

            });
            if (k == '1') {
              t.touchstartY = t.touchendY;
            }
          }
          if (this.touchendY > this.touchstartY) {
            //alert( 'down!');
            if (t.currentAnchor != 0) {
              t.currentAnchor--;
            }
            t.AnswersId = t.questionData.AnswerOptions[t.currentAnchor].Id;
            t.AnswerText = t.questionData.AnswerOptions[t.currentAnchor].AnswerText;
            t.changeVal();
            if (t.currentAnchor > (t.anchors.length - 1)
                    || t.currentAnchor < 0) {
              t.currentAnchor = 0;
            }
            t.isAnimating = true;
            $('.colorActive').css({'height': $('.option')[t.currentAnchor].offsetHeight});
            $('.colorActive').css({'top': (150 - $('.option')[t.currentAnchor].offsetHeight) / 2});
            $('.select').animate({
              scrollTop: parseInt(t.anchors[t.currentAnchor] - (150 - $('.option')[t.currentAnchor].offsetHeight) / 2)//55
            }, 200, 'swing', function () {

              t.isAnimating = false;
            });
            if (k == '1') {
              t.touchstartY = t.touchendY;
            }

          }
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
    destroyed(){
        $(document).unbind('touchstart');
        $(document).unbind('touchend');
        $(document).unbind('touchmove');
        $('body').unbind('mousewheel');
        $('body').unbind('mousewheel');
    },
  mounted(){
    let t = this;
    t.touchstartX = 0;
    t.touchstartY = 0;
    t.touchendX = 0;
    t.touchendY = 0;

    $(document).on('touchstart', '.selectBlockNeed, .colorActive', function(event) {
      t.isAnimating = false;
      t.touchstartY = event.originalEvent.touches[0].screenY;
    });

    $(document).on('touchend', '.selectBlockNeed, .colorActive', function(event) {
      t.touchendY = event.originalEvent.changedTouches[0].screenY;
      t.handleGesure();
    });
    $(document).on('touchmove', '.selectBlockNeed, .colorActive', function(event) {
      if((Math.abs(event.originalEvent.changedTouches[0].screenY-t.touchstartY)>20)) {
        t.touchendY = event.originalEvent.changedTouches[0].screenY;
        t.handleGesure('1');
      }
    });


    //let t = this;
    $('body').on('mousewheel', '.selectBlockNeed, .colorActive', function(e){
      e.preventDefault();
      e.stopPropagation();

      if( t.isAnimating ) {
        return false;
      }
      t.isAnimating  = true;
      // Increase or reset current anchor
      if( e.originalEvent.wheelDelta >= 0 ) {
        if (t.currentAnchor != 0) {
          t.currentAnchor--;
        }
      }else{
        if(t.questionData.AnswerOptions.length-1!=t.currentAnchor) {
          t.currentAnchor++;
        }
      }
      t.AnswersId = t.questionData.AnswerOptions[t.currentAnchor].Id;
      t.AnswerText = t.questionData.AnswerOptions[t.currentAnchor].AnswerText;
      t.changeVal();
      if( t.currentAnchor > (t.anchors.length - 1)
              || t.currentAnchor < 0 ) {
        t.currentAnchor = 0;
      }
      t.isAnimating  = true;
      $('.colorActive').css({'height':$('.option')[t.currentAnchor].offsetHeight});
      $('.colorActive').css({'top':(150-$('.option')[t.currentAnchor].offsetHeight)/2});
      $('.select').animate({
        scrollTop: parseInt( t.anchors[t.currentAnchor]-(150-$('.option')[t.currentAnchor].offsetHeight)/2 )//55
      }, 200, 'swing', function(){
        t.isAnimating  = false;
      });
    });
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
  @media screen and (max-width: 760px) {
    .varyNeedMar {
      /*margin-bottom: 70px !important;*/
    }
  }
</style>
