<template>
<div>
    <wrapper v-if="width>760">
      <div class="row">
        <indicatorAvatar :rezultData="rezultData"
                         :img="photoImg"
                         :showDescription="showDescription"
                         @toTheme="back"
                         @onDescription="onDescription"></indicatorAvatar>
      </div>
      <div class="row">
        <div class="left">
          <indicatorLMP :rezultData="rezultData"
                        :showDescription="showDescription"
                        @toTheme="back(3)"
                        @onDescription="onDescription"></indicatorLMP>
        </div>
        <div class="center" v-bind:style="{background: 'url(/static/img/'+gender+') top center / contain no-repeat'}">
          <indicator2 :rezultData="rezultData"
                      :showDescription="showDescription"
                      @toTheme="back(3)"
                      @onDescription="onDescription"></indicator2>
          <indicatorBMI :rezultData="rezultData"
                        :showDescription="showDescription"
                        @toTheme="back(3)"
                        @onDescription="onDescription"></indicatorBMI>

          <div class="indicators">
            <div class="title_indicator" v-html="langString('titleCAge')"></div>
            <div class="indicator">
              <div v-if="isActiveAge" class="description" v-bind:style="{zIndex:descriptAge}" v-bind:class="(showDescription==4)?'on':''">
                <div class="text"
                     v-lang.AgeDescriptionText="{ChronologicalAge: rezultData.BioMentalAge.ChronologicalAge, MentalAge: rezultData.BioMentalAge.MentalAge, BiologicalAge: rezultData.BioMentalAge.BiologicalAge, txtMental:txtMental, txtBiological:txtBiological}">
                </div>
              </div>
              <div v-if="isActiveAge" class="plus" v-on:click="onDescription(4)"><img src="static/img/plus.png" alt=""></div>
              <div class="row_indicator">
                <indicator-real-age
                        @toTheme="back(2)"
                        :rezultData="rezultData"></indicator-real-age>
              </div>
              <div class="row_indicator rowt">
                <div class="title_indicator">
                  <p class="age" v-lang.titleBAge></p>
                </div>
                <div class="title_indicator">
                  <p class="age"  v-lang.titleMAge></p>
                </div>
              </div>
              <div class="row_indicator">
                <indicator-Chronologi-age
                        @toTheme="back(2)"
                        :rezultData="rezultData"></indicator-Chronologi-age>
                <indicator-Mental-age
                        @toTheme="back(2)"
                        :rezultData="rezultData"></indicator-Mental-age>

              </div>
            </div>
            <!--<div class="info_indicator">
              <p>({{rezultData.BioMentalAge.BiologicalAge}}) biological (body) age</p>
              <p>({{rezultData.BioMentalAge.ChronologicalAge}}) chronological age</p>
              <p>({{rezultData.BioMentalAge.MentalAge}}) mental age</p>
            </div>-->
          </div>
          <div class="indicators">
            <div class="title_indicator title_indicatorCVD">
              <p class="cvd" v-lang.titleCVD></p>
            </div>
            <div class="indicator">
              <div v-if="isActiveRASVD" class="description" v-bind:style="{zIndex:descriptRACVD}" v-bind:class="(showDescription==5)?'on':''">
                <div class="text" v-lang.CVDdescriptionText="{RASCVD: rezultData.RASCVD, TenYearsASCVDCalculated: rezultData.TenYearsASCVD.Calculated, TenYearsASCVDOptimal: rezultData.TenYearsASCVD.Optimal}"></div>
              </div>
              <div v-if="isActiveRASVD" class="plus" v-on:click="onDescription(5)"><img src="static/img/plus.png" alt=""></div>

              <div class="row_indicator">
                <indicator-CVD5
                        @toTheme="back(1)"
                        :rezultData="rezultData"></indicator-CVD5>

                <indicator-CVD10
                        @toTheme="back(1)"
                        :rezultData="rezultData"></indicator-CVD10>
              </div>
            </div>
            <!--<div class="info_indicator_top">
              <p class="cvd">82%</p>
              <p>RISK</p>
            </div>-->
          </div>
        </div>
        <div class="right">
          <div class="right_indicator">
            <indicatorWHR :rezultData="rezultData"
                          :showDescription="showDescription"
                          @toTheme="back(3)"
                          @onDescription="onDescription"></indicatorWHR>

          </div>
        </div>
      </div>
      <div class="row">
        <div class="bottom">
          <indicatorBF :rezultData="rezultData"
                       :showDescription="showDescription"
                       @toTheme="back(3)"
                       @onDescription="onDescription"></indicatorBF>

          <indicator1 :rezultData="rezultData"
                      :showDescription="showDescription"
                      @toTheme="back(3)"
                      @onDescription="onDescription"></indicator1>

        </div>
      </div>
      <div class="button_share">
        <button class="share" v-on:click.prevent="share" v-lang.share></button>
        <button class="share" v-on:click.prevent="invite" v-lang.invite></button>
      </div>
    </wrapper>


  <div class="containerMob sm" v-if="width<=760">
    <div class="pos1">
      <indicator2 :rezultData="rezultData"
                  :showDescription="showDescription"
                  @toTheme="back(3)"
                  @onDescription="onDescription"></indicator2>
    </div>
    <div class="pos2">
      <indicatorBMI :rezultData="rezultData"
                    :showDescription="showDescription"
                    @toTheme="back(3)"
                    @onDescription="onDescription"></indicatorBMI>
    </div>
    <div class="pos3">
      <indicatorAvatar :rezultData="rezultData"
                       :img="photoImg"
                       :showDescription="showDescription"
                       @toTheme="back"
                       @onDescription="onDescription"></indicatorAvatar>
    </div>

    <div class="pos4">
      <div class="indicators">
        <div class="title_indicator" v-html="langString('titleCAge')"></div>
        <div class="indicator">
          <div v-if="isActiveAge" class="description" v-bind:class="(showDescription==4)?'on':''" v-bind:style="{zIndex:descriptAge}">
            <div class="text"
                 v-lang.AgeDescriptionText="{ChronologicalAge: rezultData.BioMentalAge.ChronologicalAge, MentalAge: rezultData.BioMentalAge.MentalAge, BiologicalAge: rezultData.BioMentalAge.BiologicalAge, txtMental:txtMental, txtBiological:txtBiological}">
            </div>
          </div>
          <div v-if="isActiveAge" class="plus"  v-on:click="onDescription(4)"><img src="static/img/plus.png" alt=""></div>
          <div class="row_indicator">
            <indicator-real-age
                    @toTheme="back(2)"
                    :rezultData="rezultData"></indicator-real-age>
          </div>
          <div class="row_indicator">
            <div class="title_indicator">
              <p class="age" v-lang.titleBAge></p>
            </div>
            <div class="title_indicator">
              <p class="age" v-lang.titleMAge></p>
            </div>
          </div>
          <div class="row_indicator">
            <indicator-Chronologi-age
                    @toTheme="back(2)"
                    :rezultData="rezultData"></indicator-Chronologi-age>
            <indicator-Mental-age
                    @toTheme="back(2)"
                    :rezultData="rezultData"></indicator-Mental-age>
          </div>
        </div>
        <!--<div class="info_indicator">
          <p>({{rezultData.BioMentalAge.BiologicalAge}}) biological (body) age</p>
          <p>({{rezultData.BioMentalAge.ChronologicalAge}}) chronological age</p>
          <p>({{rezultData.BioMentalAge.MentalAge}}) mental age</p>
        </div>-->
      </div>
    </div>
    <div class="pos5">
      <div class="indicators">
        <div class="title_indicator">
          <p class="cvd" v-lang.titleCVD></p>
        </div>
        <div class="indicator">
          <div v-if="isActiveRASVD" class="description" v-bind:style="{zIndex:descriptRACVD}" v-bind:class="(showDescription==5)?'on':''">
            <div class="text" v-lang.CVDdescriptionText="{RASCVD: rezultData.RASCVD, TenYearsASCVDCalculated: rezultData.TenYearsASCVD.Calculated, TenYearsASCVDOptimal: rezultData.TenYearsASCVD.Optimal}"></div>
          </div>
          <div v-if="isActiveRASVD" class="plus" v-on:click="onDescription(5)"><img src="static/img/plus.png" alt=""></div>
          <div class="row_indicator">
            <indicator-CVD5
                    @toTheme="back(1)"
                    :rezultData="rezultData"></indicator-CVD5>
            <indicator-CVD10
                    @toTheme="back(1)"
                    :rezultData="rezultData"></indicator-CVD10>
          </div>
        </div>
        <!--<div class="info_indicator_top">
          <p class="cvd">82%</p>
          <p>RISK</p>
        </div>-->
      </div>
    </div>
    <div class="pos6">


      <indicatorBF :rezultData="rezultData"
                   :showDescription="showDescription"
                   @toTheme="back(3)"
                   @onDescription="onDescription"></indicatorBF>

      <indicator1 :rezultData="rezultData"
                  :showDescription="showDescription"
                  @toTheme="back(3)"
                  @onDescription="onDescription"></indicator1>

      <div class="button_share">
        <button class="share" v-on:click.prevent="share" v-lang.share></button>
        <button class="share" v-on:click.prevent="invite" v-lang.invite></button>
      </div>
    </div>
    <div class="pos7">
      <indicatorLMP :rezultData="rezultData"
                    :showDescription="showDescription"
                    @toTheme="back(3)"
                    @onDescription="onDescription"></indicatorLMP>
    </div>
    <div class="pos8">
      <indicatorWHR :rezultData="rezultData"
                    :showDescription="showDescription"
                    @toTheme="back(3)"
                    @onDescription="onDescription"></indicatorWHR>
    </div>
  </div>
  <div class="music_btn" v-on:click="$emit('audio')">
    <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >

  </div>
  <back_btn :callback="back"></back_btn>
</div>

</template>

<script>
    export default {
        props:['rezultData','photoImg', 'audio_p', 'isPublic'],
        data () {
            return {
                width:0,
                showDescription:"none",
                descriptAge:-10,
                descriptRACVD:-10,
                //rezultData:{"BMI":22.49,"BMR":1602.5,"BFP":5.19,"FM":3.37,"LMP":94.81,"RASCVD":5.0,"WHRatio":4.2,"TenYearsASCVD":{"Calculated":0.0,"Optimal":0.03},"DaylyCallorie":2203.44,"HealthRate":22.0,"BioMentalAge":{"MentalAge":23,"BiologicalAge":23,"ChronologicalAge":23,"MentalAgeDiffPercentage":0.0,"BiologicalAgeDiffPercentage":0.0},"BMIScale":[{"Gender":0,"BMIScale":0,"BMI":16.0},{"Gender":0,"BMIScale":1,"BMI":17.0},{"Gender":0,"BMIScale":2,"BMI":18.5},{"Gender":0,"BMIScale":3,"BMI":25.0},{"Gender":0,"BMIScale":4,"BMI":30.0},{"Gender":0,"BMIScale":5,"BMI":35.0},{"Gender":0,"BMIScale":6,"BMI":40.0},{"Gender":0,"BMIScale":7,"BMI":45.0}],"BFCategoryScale":[{"Gender":0,"BFScale":0,"BF":2.5},{"Gender":0,"BFScale":1,"BF":4.9},{"Gender":0,"BFScale":2,"BF":7.3},{"Gender":0,"BFScale":3,"BF":9.5},{"Gender":0,"BFScale":4,"BF":13.6},{"Gender":0,"BFScale":5,"BF":17.0},{"Gender":0,"BFScale":6,"BF":21.2},{"Gender":0,"BFScale":7,"BF":24.4},{"Gender":0,"BFScale":8,"BF":25.8}],"FMCategoryScale":[{"Gender":0,"BFScale":0,"BF":1.7},{"Gender":0,"BFScale":1,"BF":3.3},{"Gender":0,"BFScale":2,"BF":5.0},{"Gender":0,"BFScale":3,"BF":6.5},{"Gender":0,"BFScale":4,"BF":9.2},{"Gender":0,"BFScale":5,"BF":11.6},{"Gender":0,"BFScale":6,"BF":14.4},{"Gender":0,"BFScale":7,"BF":16.6},{"Gender":0,"BFScale":8,"BF":17.5}],"LMPCategoryScale":[{"Gender":0,"BFScale":0,"BF":97.5},{"Gender":0,"BFScale":1,"BF":95.1},{"Gender":0,"BFScale":2,"BF":92.7},{"Gender":0,"BFScale":3,"BF":90.5},{"Gender":0,"BFScale":4,"BF":86.4},{"Gender":0,"BFScale":5,"BF":83.0},{"Gender":0,"BFScale":6,"BF":78.8},{"Gender":0,"BFScale":7,"BF":75.6},{"Gender":0,"BFScale":8,"BF":74.2}],"RASCVDScale":[{"RASCVDScale":0,"Value":5.0},{"RASCVDScale":1,"Value":36.0},{"RASCVDScale":2,"Value":46.0},{"RASCVDScale":3,"Value":50.0},{"RASCVDScale":4,"Value":69.0}],"TenYearsASCVDScale":[{"RASCVDScale":0,"Value":5.0},{"RASCVDScale":1,"Value":11.0},{"RASCVDScale":2,"Value":17.0},{"RASCVDScale":3,"Value":23.0},{"RASCVDScale":4,"Value":30.0}],"CallorieScale":[{"Gender":0,"Activity":0,"Callorie":1687.0},{"Gender":0,"Activity":1,"Callorie":2025.0},{"Gender":0,"Activity":2,"Callorie":2320.0},{"Gender":0,"Activity":3,"Callorie":2615.0},{"Gender":0,"Activity":4,"Callorie":2911.0},{"Gender":0,"Activity":5,"Callorie":3206.0}],"BioAgeScale":[{"Gender":0,"AgeScale":4,"AgePercent":-31.0},{"Gender":0,"AgeScale":4,"AgePercent":-20.0},{"Gender":0,"AgeScale":3,"AgePercent":-10.0},{"Gender":0,"AgeScale":3,"AgePercent":-4.0},{"Gender":0,"AgeScale":3,"AgePercent":3.0},{"Gender":0,"AgeScale":2,"AgePercent":9.0},{"Gender":0,"AgeScale":1,"AgePercent":19.0},{"Gender":0,"AgeScale":0,"AgePercent":30.0},{"Gender":0,"AgeScale":0,"AgePercent":40.0}],"MentalAgeScale":[{"Gender":0,"AgeScale":0,"AgePercent":-31.0},{"Gender":0,"AgeScale":1,"AgePercent":-20.0},{"Gender":0,"AgeScale":2,"AgePercent":-10.0},{"Gender":0,"AgeScale":3,"AgePercent":-4.0},{"Gender":0,"AgeScale":4,"AgePercent":3.0},{"Gender":0,"AgeScale":3,"AgePercent":9.0},{"Gender":0,"AgeScale":2,"AgePercent":19.0},{"Gender":0,"AgeScale":1,"AgePercent":30.0},{"Gender":0,"AgeScale":0,"AgePercent":40.0}],"CronologicalAgeScale":[{"Gender":0,"AgeScale":4,"AgePercent":24.0},{"Gender":0,"AgeScale":3,"AgePercent":48.0},{"Gender":0,"AgeScale":2,"AgePercent":72.0},{"Gender":0,"AgeScale":1,"AgePercent":96.0},{"Gender":0,"AgeScale":0,"AgePercent":120.0}],"HealthRatioScale":[{"IllnessScale":0,"Value":5.0},{"IllnessScale":1,"Value":10.0},{"IllnessScale":2,"Value":20.0},{"IllnessScale":3,"Value":30.0},{"IllnessScale":4,"Value":40.0},{"IllnessScale":5,"Value":50.0},{"IllnessScale":6,"Value":70.0}],"WHRatioScale":[{"WHRScale":0,"Value":0.7},{"WHRScale":1,"Value":0.75},{"WHRScale":2,"Value":0.8},{"WHRScale":3,"Value":0.85},{"WHRScale":4,"Value":0.9},{"WHRScale":5,"Value":0.99},{"WHRScale":6,"Value":1.1},{"WHRScale":7,"Value":1.15}],"IsFinished":true,"PublicHash":"5a66122bdcd3611be0e08b256c3ed832","PreviusQuestionId":0,"QuestionId":0,"QuestionNum":0,"TotalQuestions":0,"QuestionTypeEnum":0,"UserThemeTestId":0,"IsAnswered":false,"AnsValue":0.0,"QText":null,"ImageUrl":null,"QuestionsProgress":0.0,"AnswerOptions":null,"NextQuestionId":0,"ErrorCode":1,"DebugMessage":null,"UIMessage":null},
                gender:"body0.png",
                img:"",
              touchstartX:0,
              touchendX:0,
            }
        },
        messages: {
            en: {
                share: 'SHARE',
                invite: 'INVITE FRIENDS',
              textInvite:'',
                AgeDescriptionText:
                "<p>Your age:</p>"+
                "<p>Mental {MentalAge} years. {txtMental}</p>"+
                "<p>Biological {BiologicalAge} years. {txtBiological}</p>"+
                "<p>Chronological {ChronologicalAge} years. </p>",

                AgeBCom0: "It is necessary to see a doctor",
                AgeBCom1: "Your body is in great shape and younger",
                AgeBCom2: "Your body in great shape",
                AgeBCom3: "Your body is younger",
                AgeBCom4: "Your body corresponds to the norm",
                AgeBCom5: "You need to take care of yourself",
                AgeBCom6: "It is necessary to see a doctor",
                AgeBCom7: "It is necessary to see a doctor",
                AgeBCom8: "Urgent need to see a doctor",

                AgeMCom0: "You are in a state of detachment",
                AgeMCom1: "Consultation with a psychologist is necessary",
                AgeMCom2: "You need to communicate more",
                AgeMCom3: "Everything is fine",
                AgeMCom4: "Normal condition",
                AgeMCom5: "It is necessary to be surrounded by relatives / friends",
                AgeMCom6: "Consultation with a psychologist is necessary",
                AgeMCom7: "Psychological problems are possible",
                AgeMCom8: "High probability of psychological problems",

                CVDdescriptionText: '<p>Your risk of atherosclerotic cardiovascular disease is {RASCVD}%.</p>'+
                '<p>Over the next 10 years, your risk of atherosclerotic cardiovascular disease is {TenYearsASCVDCalculated}%.</p>'+
                '<p>You can reduce the risk of atherosclerotic cardiovascular disease to {TenYearsASCVDOptimal}%.</p>',
                titleCAge:"<p class='age'>Age chronological</p>",
                titleBAge:"Age biological",
                titleMAge:"Age mental",
                titleCVD:"Risks of atherosclerotic cardiovascular disease",
            },
            ru: {
                share: 'ПОДЕЛИТЬСЯ',
              invite: 'ПРИГЛАСИТЬ ДРУЗЕЙ',
              textInvite:'',
                AgeDescriptionText:
                "<p>Ваш возраст:</p>"+
                "<p>Ментальный {MentalAge} лет. {txtMental}</p>"+
                "<p>Биологический {BiologicalAge} лет. {txtBiological}</p>"+
                "<p>Хронологический {ChronologicalAge} лет.</p>",
                AgeBCom0: "Необходим осмотр врача",
                AgeBCom1: "Ваше тело в отличной форме и моложе",
                AgeBCom2: "Ваше тело в отличной форме",
                AgeBCom3: "Ваше тело моложе",
                AgeBCom4: "Ваше тело соответсвует норме",
                AgeBCom5: "Вам необходимо заняться собой",
                AgeBCom6: "Необходим осмотр врача",
                AgeBCom7: "Необходим осмотр врача",
                AgeBCom8: "Срочно необходим осмотр врача",

                AgeMCom0: "Вы в состоянии отрященности",
                AgeMCom1: "Необходима консультация с психологом",
                AgeMCom2: "Необходимо больше общаться",
                AgeMCom3: "Все в порядке.",
                AgeMCom4: "соответсвует норме",
                AgeMCom5: "Необходимо находится в окружении близких / друзей",
                AgeMCom6: "Необходима консультация с психологом",
                AgeMCom7: "Возможны  психологические проблемы",
                AgeMCom8: "Большая вероятность психологических проблем",

                CVDdescriptionText: '<p>В течение всей Вашей жизни Ваш риск атеросклеротических сердечно-сосудистых заболеваний составляет {RASCVD} %. </p>'+
                '<p>В течение 10 ближайших лет Ваш риск атеросклеротических сердечно-сосудистых заболеваний составляет {TenYearsASCVDCalculated}%.</p>'+
                '<p>Вы можете снизить риск  атеросклеротических сердечно-сосудистых заболеваний до {TenYearsASCVDOptimal}%.</p>',
                titleCAge:"<p class='age'>Хронологический</p><p class='age'>возраст</p>",
                titleBAge:"Биологический возраст",
                titleMAge:"Метнальный возраст",
                titleCVD:"Оценка риска сердечно-сосудистого заболевания",
            },
            pl: {
                share: 'DZIELIĆ SIĘ',
              invite: 'ZAPROSIĆ PRZYJACIÓŁ',
              textInvite:'',
                AgeDescriptionText:
                "<p>Twój wiek:</p>"+
                "<p>Mentalne {MentalAge}. {txtMental}</p>"+
                "<p>Biologiczne {BiologicalAge} lat. {txtBiological}</p>"+
                "<p>Chronologicznie {ChronologicalAge} lat.</p>",
                AgeBCom0: "Potrzebuje badanie lekarskie",
                AgeBCom1: "Twoje ciało jest w świetnej formie i młodsze",
                AgeBCom2: "Twoje ciało w świetnej formie",
                AgeBCom3: "Twoje ciało jest młodsze",
                AgeBCom4: "Twoje ciało odpowiada normie",
                AgeBCom5: "Musisz zadbać o siebie",
                AgeBCom6: "Potrzebuje badanie lekarskie",
                AgeBCom7: "Potrzebuje badanie lekarskie",
                AgeBCom8: "Pilnie potrzebne badanie lekarskie",

                AgeMCom0: "Jesteś w stanie oderwania",
                AgeMCom1: "Konieczna jest konsultacja z psychologiem",
                AgeMCom2: "Musisz komunikować się więcej",
                AgeMCom3: "Wszystko w porządku.",
                AgeMCom4: "Оdpowiada normie",
                AgeMCom5: "Trzeba być otoczonym przez krewnych / przyjaciół",
                AgeMCom6: "Konieczna jest konsultacja z psychologiem",
                AgeMCom7: "Problemy psychologiczne są możliwe",
                AgeMCom8: "Wysokie prawdopodobieństwo problemów psychologicznych",

                CVDdescriptionText: '<p>Przez całe życie ryzyko wystąpienia miażdżycowej choroby sercowo-naczyniowej wynosi {RASCVD}%</p>'+
                '<p>W ciągu najbliższych 10 lat ryzyko wystąpienia miażdżycowej choroby sercowo-naczyniowej wynosi {TenYearsASCVDCalculated}%.</p>'+
                '<p>Możesz zmniejszyć ryzyko wystąpienia miażdżycowej choroby sercowo-naczyniowej do {TenYearsASCVDOptimal}%.</p>',
                titleCAge:"<p class='age'>Wiek chronologiczny</p>",
                titleBAge:"Wiek biologiczny",
                titleMAge:"Wiek psychiczny",
                titleCVD:"Ocena ryzyka sercowo-naczyniowego ",
            }
        },
        computed: {
          isActiveAge:function () {
            if(this.rezultData.FinishedTests.indexOf(2)>-1){
              return true;
            }else{
              return false;
            }
          },
          isActiveRASVD:function () {
            if(this.rezultData.FinishedTests.indexOf(1)>-1){
              return true;
            }else{
              return false;
            }
          },
            txtMental:function () {
                if(this.rezultData.BioMentalAge.MentalAgeDiffPercentage > this.rezultData.MentalAgeScale[this.rezultData.MentalAgeScale.length-1].AgePercent){
                    return this.translate( 'AgeMCom'+(this.rezultData.MentalAgeScale.length-1));
                }
                let ret = this.translate( 'AgeMCom0');
                for( let i = 0; i < this.rezultData.MentalAgeScale.length; i++){
                    if(this.rezultData.BioMentalAge.MentalAgeDiffPercentage > this.rezultData.MentalAgeScale[i].AgePercent){
                        ret = this.translate( 'AgeMCom'+(i+1));
                    }else{
                        return ret;
                    }
                }
            },
            txtBiological:function () {
                if(this.rezultData.BioMentalAge.BiologicalAge > this.rezultData.BioAgeScale[this.rezultData.BioAgeScale.length-1].AgePercent){
                    return this.translate( 'AgeBCom'+(this.rezultData.BioAgeScale.length-1));
                }
                let ret = this.translate( 'AgeBCom0');
                for( let i = 0; i < this.rezultData.BioAgeScale.length; i++){
                    if(this.rezultData.BioMentalAge.BiologicalAgeDiffPercentage > this.rezultData.BioAgeScale[i].AgePercent){
                        ret = this.translate( 'AgeBCom'+(i+1));
                    }else{
                        return ret;
                    }
                }
            },

        },
        created: function() {
            this.img = this.photoImg || '../static/img/noIMG.png';
            this.gender = "body"+this.rezultData.BMIScale[0].Gender+".png";
        },
      watch:{
        showDescription:function (old, newVal) {
          let t = this;
          if(old==5){
            this.descriptRACVD=15;
          }else if(old==4){
            this.descriptAge=15;
          }else{
            setTimeout(function(){
              t.descriptRACVD=-10;
              t.descriptAge=-10;
            },600);
          }
        }
      },
        mounted() {
          let t = this;
          $(document).on('touchstart', '.containerMob, .container', function(event) {
              t.touchstartX = event.originalEvent.touches[0].screenX;
          });
          $(document).on('touchend', '.containerMob, .container', function(event) {
              t.touchendX = event.originalEvent.changedTouches[0].screenX;
              if((Math.abs(t.touchendX-t.touchstartX)>100)){
                if (t.touchendX > t.touchstartX) {
                  t.back();
                }
              }
          });
          window.addEventListener('resize', this.getWindowWidth);
            this.$nextTick(function() {
                this.getWindowWidth();
            })
        },
      destroyed() {
          window.removeEventListener('resize', this.getWindowWidth);
          $(document).unbind('touchstart');
          $(document).unbind('touchend');
        },
        methods:{
          back(id){
            if(this.isPublic){
              this.$emit('toStart');
            }else{
              this.$emit('toTheme', id, '', true);
            }
          },
          invite(){
            FB.ui({ method: 'apprequests',
              message: 'Тест здоровья'
            });
          },
          langString(string){
            return this.translate(string);
          },
            getWindowWidth(event) {
                this.width = document.documentElement.clientWidth;
            },
            share(){
                FB.ui({
                    method: 'share',
                    mobile_iframe: true,
                    href: window.location.origin,
                }, function(response){});
            },
            onDescription(val){
                if(this.showDescription == val){
                    this.showDescription = "none";
                }else{
                    this.showDescription = val;
                }
            }
        }
    }
</script>

<style scoped>
  .avatar .img{
    cursor: default;
  }
  div.center > div:nth-child(3) > div.indicator > div.plus{
    width:20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.5s ease-in-out;
  }
  @media screen and (max-width: 780px){
    .plus {
      width: 30%;
      height: 16%;
      bottom: -57%;
      top: unset;
    }
  }
  div.center > div:nth-child(3) > div.indicator > div.plus:hover, .description.on ~ .plus{
    transform: rotate(45deg);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);
  }
  div.indicator{
    position: relative;
  }
  div.center > div:nth-child(3) .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    left: 20%;
    bottom: 92%;
    width: 40vw;
    text-align: left;
    border-radius: 15px 15px 15px 0;
    padding: 15px;
    z-index: -10;
    opacity: 0;
    transition: opacity 0.5s linear;
  }
  div.center > div:nth-child(3) .description.on{
    z-index: 15;
    opacity: 1;
  }
  div.center > div:nth-child(4) > div.indicator > div.plus{
    width:20px;
    height: 20px;
    position: absolute;
    bottom: 105%;
    left: 98%;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.5s linear;
  }
  div.center > div:nth-child(4) > div.indicator > div.plus:hover, .description.on ~ .plus{
    transform: rotate(45deg);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);
  }
  div.center > div:nth-child(4) .description{
    background: rgba(255,255,255,0.5);
    position: absolute;
    right: 10%;
    bottom: 120%;
    width: 40vw;
    text-align: left;
    border-radius: 15px 15px 0 15px;
    padding: 15px;
    z-index: -10;
    opacity: 0;
    transition: opacity 0.5s linear;
  }
  div.center > div:nth-child(4) .description.on{
    z-index: 15;
    opacity: 1;
  }
  .description .text{
    overflow-x: hidden;
    overflow-y: auto;
    padding: 3px;
    background: rgba(255,255,255,1);
    color: #585858;
  }
  .bottom {
    margin-bottom: 15px;
    width: calc(51% - 5px);
  }
  .music_btn{
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 50;
  }
  .indicator:hover .plus{
    animation: anima 2s infinite ease-in-out;
  }
  @keyframes anima {
    from {box-shadow: unset;}
    50% { box-shadow: 0 0px 20px rgba(255, 255, 255, 1), inset 0 0 80px rgba(255, 255, 255, 0.5)}
    to {box-shadow: unset;}
  }
  .rowt .title_indicator{
    left: 0;
    width: 45%;
  }
  .row {
    margin-top: 0;
  }
  .rowt{
    position: relative;
    left: -25%;
    right: -25%;
    width: 150%;
    justify-content: center!important;
  }
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .bottom .indicators{
    margin: 0 0 15px 0;
  }
  .bottom .indicators:nth-child(2){
    margin: 0;
  }
  .plus:hover{
    transform: rotate(45deg);
  }
  @media screen and (max-height: 768px) and (orientation: landscape){
    .container{
      transform: scale(0.95);
    }
    .row{
      width: 78%;
      margin: 0 auto;
    }
    .progress_bar2 p {
      font-size: 8px;
    }
    .progress_bar2 p.big {
      font-size: 17px;
      line-height: 17px;
    }
    .center .indicators .title_indicator .age{
      font-size: 10px;
    }
  }
</style>
