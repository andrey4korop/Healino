<template>
<div>
    <div class="container pc">
      <div class="row">
        <indicatorAvatar :rezultData="rezultData"
                          :img="img"></indicatorAvatar>
      </div>
      <div class="row">
        <div class="left">
          <div class="theme">
            <p>{{themeActiveObj.Title}}</p>
            <div class="img"
                    v-bind:style="{background: 'url(' + themeActiveObj.ImageUrl + ') center center / cover' }" alt=""></div>
          </div>
        </div>
        <div class="center">
          <indicator2 :rezultData="rezultData"></indicator2>
          <indicatorBMI :rezultData="rezultData"></indicatorBMI>

          <div class="indicators">
            <div class="title_indicator">
              <p class="age">Real Age</p>
            </div>
            <div class="indicator">
              <div class="plus"><img src="static/img/plus.png" alt=""></div>
              <div class="row_indicator">
                <indicator-real-age :rezultData="rezultData"></indicator-real-age>
              </div>
              <div class="row_indicator">
                <indicator-Chronologi-age :rezultData="rezultData"></indicator-Chronologi-age>
                <indicator-Mental-age :rezultData="rezultData"></indicator-Mental-age>

              </div>
            </div>
            <div class="info_indicator">
              <p>({{rezultData.BioMentalAge.BiologicalAge}}) biological (body) age</p>
              <p>({{rezultData.BioMentalAge.ChronologicalAge}}) chronological age</p>
              <p>({{rezultData.BioMentalAge.MentalAge}}) mental age</p>
            </div>
          </div>
          <div class="indicators">
            <div class="title_indicator">
              <p class="cvd">CVD</p>
            </div>
            <div class="indicator">
              <div class="plus"><img src="static/img/plus.png" alt=""></div>
              <div class="row_indicator">
                <indicator-CVD15 :TenYearsASCVD="TenYearsASCVD" style="visibility: hidden"></indicator-CVD15>
              </div>
              <div class="row_indicator">
                <indicator-CVD5 :rezultData="rezultData"></indicator-CVD5>

                <indicator-CVD10 :rezultData="rezultData"></indicator-CVD10>
              </div>
            </div>
            <div class="info_indicator_top">
              <p class="cvd">82%</p>
              <p>RISK</p>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right_indicator">
            <indicatorWHR :rezultData="rezultData"></indicatorWHR>
            <indicatorLMP :rezultData="rezultData"></indicatorLMP>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="bottom">
          <indicatorBF :rezultData="rezultData"></indicatorBF>

          <indicator1 :rezultData="rezultData"></indicator1>
          <indicatorBMR :BMR="BMR" style="visibility: hidden; display: none;"></indicatorBMR>
        </div>
      </div>
      <div class="button_share" v-on:click.prevent="share">
        <img src="static/img/active 150x45.png" alt="">
      </div>
    </div>


  <div class="containerMob sm">
    <div class="pos1">
      <indicator2 :rezultData="rezultData"></indicator2>
    </div>
    <div class="pos2">
      <div class="indicators">
        <div class="title_indicator">
          <p>BMI</p>
          <p>(body mass index)</p>
        </div>
        <div class="indicator">
          <div class="progress_bar4">
            <div class="cursor"></div>
            <div class="text_indicator">
              <p class="big">{{BMI}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pos3">
      <div class="avatar">
        <div v-bind:style="{background: 'url(' + img + ') center center / cover' }" class="img" ></div>
      </div>
    </div>

    <div class="pos4">
      <div class="indicators">
        <div class="title_indicator">
          <p class="age">Real Age</p>
        </div>
        <div class="indicator">
          <div class="plus"><img src="static/img/plus.png" alt=""></div>
          <div class="row_indicator">
            <indicator-real-age :rezultData="rezultData"></indicator-real-age>
          </div>
          <div class="row_indicator">
            <indicator-Chronologi-age :rezultData="rezultData"></indicator-Chronologi-age>
            <indicator-Mental-age :rezultData="rezultData"></indicator-Mental-age>
          </div>
        </div>
        <div class="info_indicator">
          <p>({{rezultData.BioMentalAge.BiologicalAge}}) biological (body) age</p>
          <p>({{rezultData.BioMentalAge.ChronologicalAge}}) chronological age</p>
          <p>({{rezultData.BioMentalAge.MentalAge}}) mental age</p>
        </div>
      </div>
    </div>
    <div class="pos5">
      <div class="indicators">
        <div class="title_indicator">
          <p class="cvd">CVD</p>
        </div>
        <div class="indicator">
          <div class="plus"><img src="static/img/plus.png" alt=""></div>
          <div class="row_indicator">
            <indicator-CVD15 :TenYearsASCVD="TenYearsASCVD" style="visibility: hidden"></indicator-CVD15>
          </div>
          <div class="row_indicator">
            <indicator-CVD5 :rezultData="rezultData"></indicator-CVD5>
            <indicator-CVD10 :rezultData="rezultData"></indicator-CVD10>
          </div>
        </div>
        <div class="info_indicator_top">
          <p class="cvd">82%</p>
          <p>RISK</p>
        </div>
      </div>
    </div>
    <div class="pos6">


      <indicatorBF :rezultData="rezultData"></indicatorBF>

      <indicator1 :rezultData="rezultData"></indicator1>
      <!--<indicatorBMR :BMR="BMR" style="visibility: hidden; display: none" ></indicatorBMR>-->
      <div class="button_share" v-on:click.prevent="share">
        <img src="static/img/active 150x45.png" alt="">
      </div>
    </div>
    <div class="pos7">
      <indicatorLMP :rezultData="rezultData"></indicatorLMP>
    </div>
    <div class="pos8">
      <indicatorWHR :rezultData="rezultData"></indicatorWHR>
    </div>
  </div>
</div>

</template>

<script>
    export default {
        props:['rezultData', 'userData', 'themeActiveObj'],
        data () {
            return {
                //rezultData:{"BMI":17.99,"BMR":1472.5,"BFP":-90.56,"FM":-47.09,"LMP":190.56,"RASCVD":69,"WHRatio":1,"TenYearsASCVD":{"Calculated":0,"Optimal":0.03},"DaylyCallorie":1767,"HealthRate":40,"BioMentalAge":{"MentalAge":23,"BiologicalAge":26,"ChronologicalAge":23,"MentalAgeDiffPercentage":0,"BiologicalAgeDiffPercentage":13},"BMIScale":[{"Gender":0,"BMIScale":0,"BMI":16},{"Gender":0,"BMIScale":1,"BMI":17},{"Gender":0,"BMIScale":2,"BMI":18.5},{"Gender":0,"BMIScale":3,"BMI":25},{"Gender":0,"BMIScale":4,"BMI":30},{"Gender":0,"BMIScale":5,"BMI":35},{"Gender":0,"BMIScale":6,"BMI":40},{"Gender":0,"BMIScale":7,"BMI":45}],"BFCategoryScale":[{"Gender":0,"BFScale":0,"BF":2.5},{"Gender":0,"BFScale":1,"BF":4.9},{"Gender":0,"BFScale":2,"BF":7.3},{"Gender":0,"BFScale":3,"BF":9.5},{"Gender":0,"BFScale":4,"BF":13.6},{"Gender":0,"BFScale":5,"BF":17},{"Gender":0,"BFScale":6,"BF":21.2},{"Gender":0,"BFScale":7,"BF":24.4},{"Gender":0,"BFScale":8,"BF":25.8}],"FMCategoryScale":[{"Gender":0,"BFScale":0,"BF":1.7},{"Gender":0,"BFScale":1,"BF":3.3},{"Gender":0,"BFScale":2,"BF":5},{"Gender":0,"BFScale":3,"BF":6.5},{"Gender":0,"BFScale":4,"BF":9.2},{"Gender":0,"BFScale":5,"BF":11.6},{"Gender":0,"BFScale":6,"BF":14.4},{"Gender":0,"BFScale":7,"BF":16.6},{"Gender":0,"BFScale":8,"BF":17.5}],"LMPCategoryScale":[{"Gender":0,"BFScale":0,"BF":97.5},{"Gender":0,"BFScale":1,"BF":95.1},{"Gender":0,"BFScale":2,"BF":92.7},{"Gender":0,"BFScale":3,"BF":90.5},{"Gender":0,"BFScale":4,"BF":86.4},{"Gender":0,"BFScale":5,"BF":83},{"Gender":0,"BFScale":6,"BF":78.8},{"Gender":0,"BFScale":7,"BF":75.6},{"Gender":0,"BFScale":8,"BF":74.2}],"RASCVDScale":[{"RASCVDScale":0,"Value":5},{"RASCVDScale":1,"Value":36},{"RASCVDScale":2,"Value":46},{"RASCVDScale":3,"Value":50},{"RASCVDScale":4,"Value":69}],"TenYearsASCVDScale":[{"RASCVDScale":0,"Value":5},{"RASCVDScale":1,"Value":11},{"RASCVDScale":2,"Value":17},{"RASCVDScale":3,"Value":23},{"RASCVDScale":4,"Value":30}],"CallorieScale":[{"Gender":0,"Activity":0,"Callorie":1687},{"Gender":0,"Activity":1,"Callorie":2025},{"Gender":0,"Activity":2,"Callorie":2320},{"Gender":0,"Activity":3,"Callorie":2615},{"Gender":0,"Activity":4,"Callorie":2911},{"Gender":0,"Activity":5,"Callorie":3206}],"BioAgeScale":[{"Gender":0,"AgeScale":4,"AgePercent":-31},{"Gender":0,"AgeScale":4,"AgePercent":-20},{"Gender":0,"AgeScale":3,"AgePercent":-10},{"Gender":0,"AgeScale":3,"AgePercent":-4},{"Gender":0,"AgeScale":3,"AgePercent":3},{"Gender":0,"AgeScale":2,"AgePercent":9},{"Gender":0,"AgeScale":1,"AgePercent":19},{"Gender":0,"AgeScale":0,"AgePercent":30},{"Gender":0,"AgeScale":0,"AgePercent":40}],"MentalAgeScale":[{"Gender":0,"AgeScale":0,"AgePercent":-31},{"Gender":0,"AgeScale":1,"AgePercent":-20},{"Gender":0,"AgeScale":2,"AgePercent":-10},{"Gender":0,"AgeScale":3,"AgePercent":-4},{"Gender":0,"AgeScale":4,"AgePercent":3},{"Gender":0,"AgeScale":3,"AgePercent":9},{"Gender":0,"AgeScale":2,"AgePercent":19},{"Gender":0,"AgeScale":1,"AgePercent":30},{"Gender":0,"AgeScale":0,"AgePercent":40}],"CronologicalAgeScale":[{"Gender":0,"AgeScale":4,"AgePercent":24},{"Gender":0,"AgeScale":3,"AgePercent":48},{"Gender":0,"AgeScale":2,"AgePercent":72},{"Gender":0,"AgeScale":1,"AgePercent":96},{"Gender":0,"AgeScale":0,"AgePercent":120}],"HealthRatioScale":[{"IllnessScale":0,"Value":5},{"IllnessScale":1,"Value":10},{"IllnessScale":2,"Value":20},{"IllnessScale":3,"Value":30},{"IllnessScale":4,"Value":40},{"IllnessScale":5,"Value":50},{"IllnessScale":6,"Value":70}],"WHRatioScale":[{"WHRScale":0,"Value":0.7},{"WHRScale":1,"Value":0.75},{"WHRScale":2,"Value":0.8},{"WHRScale":3,"Value":0.85},{"WHRScale":4,"Value":0.9},{"WHRScale":5,"Value":0.99},{"WHRScale":6,"Value":1.1},{"WHRScale":7,"Value":1.15}],"IsFinished":true,"PublicHash":"fde3c96c21015369d4df912317362d97","PreviusQuestionId":0,"QuestionId":0,"QuestionNum":0,"TotalQuestions":0,"QuestionTypeEnum":0,"UserThemeTestId":0,"IsAnswered":false,"QText":null,"ImageUrl":null,"QuestionsProgress":0,"AnswerOptions":null,"NextQuestionId":0,"ErrorCode":1,"DebugMessage":null,"UIMessage":null},
                temp:'',
                BMI: '0',
                BioMentalAge:{
                    BiologicalAge: 0,
                    ChronologicalAge: 0,
                    MentalAge: 0
                },
                DaylyCallorie: 0,
                CallorieScale:[
                    {
                        Callorie:0,
                    }
                ],
                LMP: 0,
                LMPCategoryScale:[
                    {
                        BF:0,
                    }
                ],
                RASCVD: 0,
                TenYearsASCVD: {
                    Calculated:0,
                    Optimal:0
                },
                BFP:0,
                BMR:0,
                FM:0,
                WHRatio:0,
                img:""
            }
        },
        computed: {
            getTemp: function () {
                if(!this.temp){

                        this.temp = this.rezultData;

                }
                return this.LMPCategoryScale;//this.temp;
            },
            getFirstLMP: function () {
                return this.getTemp.LMPCategoryScale;
            },
            getLastLMP: function () {
                return this.getTemp.LMPCategoryScale;//[this.getTemp.LMPCategoryScale.length - 1].BF;
            }
        },
        created: function() {
            console.log(this.rezultData);
            this.img = this.userData.PhotoUrl || '../static/img/noIMG.png';

            /*this.BMI = this.rezultData.BMI;
            this.BioMentalAge = this.rezultData.BioMentalAge;
            this.DaylyCallorie = this.rezultData.DaylyCallorie;
            this.CallorieScale = this.rezultData.CallorieScale;
            this.LMP = this.rezultData.LMP;
            this.LMPCategoryScale = this.rezultData.LMPCategoryScale;
            this.RASCVD = this.rezultData.RASCVD;

            this.BFP = this.rezultData.BFP;
            this.BMR = this.rezultData.BMR;
            this.FM = this.rezultData.FM;
            this.WHRatio = this.rezultData.WHRatio;*/
            this.TenYearsASCVD = this.rezultData.TenYearsASCVD;
        },
        methods:{
            share(){
                FB.ui({
                    method: 'share',
                    mobile_iframe: true,
                    href: 'http://healino-api.azurewebsites.net/?result='+this.rezultData.PublicHash,
                }, function(response){});
            }
        }
    }
</script>

<style scoped>
  .avatar .img{
    cursor: default;
  }
  div.center > div:nth-child(3) > div.indicator > div.plus{
    width: 15%;
    height: 15%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    z-index: 1;
  }
  @media screen and (max-width: 780px){
    .plus {
      width: 30%;
      height: 16%;
      bottom: -57%;
      top: unset;
    }
  }
  div.center > div:nth-child(3) > div.indicator > div.plus:hover{
    filter: blur(0.8px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);
  }
  div.indicator{
    position: relative;
  }
  div.center > div:nth-child(4) > div.indicator > div.plus{
    width: 15%;
    height: 15%;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    z-index: 1;
  }
  div.center > div:nth-child(4) > div.indicator > div.plus:hover{
    filter: blur(0.8px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 1);
  }
  .bottom {
    margin-bottom: 15px;
  }
</style>
