<template>
<div>
    <div class="container pc">
      <div class="row">
        <div class="avatar">
          <div v-bind:style="{background: 'url(' + img + ') center center / cover' }" class="img" ></div>
        </div>
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
          <indicator2 :DaylyCallorie="DaylyCallorie" :CallorieScale="CallorieScale"></indicator2>
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
          <div class="indicators">
            <div class="title_indicator">
              <p class="age">Real Age</p>
            </div>
            <div class="indicator">
              <div class="row_indicator">
                <indicator-real-age :BioMentalAge="BioMentalAge"></indicator-real-age>
              </div>
              <div class="row_indicator">
                <indicator-Chronologi-age :BioMentalAge="BioMentalAge"></indicator-Chronologi-age>
                <indicator-Mental-age :BioMentalAge="BioMentalAge"></indicator-Mental-age>

              </div>
            </div>
            <div class="info_indicator">
              <p>({{BioMentalAge.BiologicalAge}}) biological (body) age</p>
              <p>({{BioMentalAge.ChronologicalAge}}) chronological age</p>
              <p>({{BioMentalAge.MentalAge}}) mental age</p>
            </div>
          </div>
          <div class="indicators">
            <div class="title_indicator">
              <p class="cvd">CVD</p>
            </div>
            <div class="indicator">
              <div class="row_indicator">
                <indicator-CVD10 :RASCVD="RASCVD"></indicator-CVD10>
              </div>
              <div class="row_indicator">
                <indicator-CVD5 :TenYearsASCVD="TenYearsASCVD"></indicator-CVD5>
                <indicator-CVD15 :TenYearsASCVD="TenYearsASCVD"></indicator-CVD15>
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
            <indicatorWHR :WHRatio="WHRatio"></indicatorWHR>
            <indicatorLMP :LMP="LMP" :LMPCategoryScale="LMPCategoryScale"></indicatorLMP>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="bottom">
          <indicatorBF :BFP="BFP"></indicatorBF>
          <indicatorBMR :BMR="BMR"></indicatorBMR>
          <indicator1 :FM="FM"></indicator1>
        </div>
      </div>
      <div class="button_share">
        <img src="static/img/active 150x45.png" alt="">
      </div>
    </div>


  <div class="containerMob sm">
    <div class="pos1">
      <indicator2sm :DaylyCallorie="DaylyCallorie" :CallorieScale="CallorieScale"></indicator2sm>
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
          <div class="row_indicator">
            <indicator-real-agesm :BioMentalAge="BioMentalAge"></indicator-real-agesm>
          </div>
          <div class="row_indicator">
            <indicator-Chronologi-agesm :BioMentalAge="BioMentalAge"></indicator-Chronologi-agesm>
            <indicator-Mental-agesm :BioMentalAge="BioMentalAge"></indicator-Mental-agesm>
          </div>
        </div>
        <div class="info_indicator">
          <p>({{BioMentalAge.BiologicalAge}}) biological (body) age</p>
          <p>({{BioMentalAge.ChronologicalAge}}) chronological age</p>
          <p>({{BioMentalAge.MentalAge}}) mental age</p>
        </div>
      </div>
    </div>
    <div class="pos5">
      <div class="indicators">
        <div class="title_indicator">
          <p class="cvd">CVD</p>
        </div>
        <div class="indicator">
          <div class="row_indicator">
            <indicator-CVD10sm :RASCVD="RASCVD"></indicator-CVD10sm>
          </div>
          <div class="row_indicator">
            <indicator-CVD5sm :TenYearsASCVD="TenYearsASCVD"></indicator-CVD5sm>
            <indicator-CVD15sm :TenYearsASCVD="TenYearsASCVD"></indicator-CVD15sm>
          </div>
        </div>
        <div class="info_indicator_top">
          <p class="cvd">82%</p>
          <p>RISK</p>
        </div>
      </div>
    </div>
    <div class="pos6">


      <indicatorBFsm :BFP="BFP"></indicatorBFsm>
      <indicatorBMRsm :BMR="BMR"></indicatorBMRsm>
      <indicator1sm :FM="FM"></indicator1sm>
    </div>
    <div class="pos7">
      <indicatorLMPsm :LMP="LMP" :LMPCategoryScale="LMPCategoryScale"></indicatorLMPsm>
    </div>
    <div class="pos8">
      <indicatorWHRsm :WHRatio="WHRatio"></indicatorWHRsm>
    </div>
  </div>
</div>

</template>

<script>
    export default {
        props:['rezultData', 'userData', 'themeActiveObj'],
        data () {
            return {
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

            this.img = this.userData.PhotoUrl || '../static/img/noIMG.png';

            this.BMI = this.rezultData.BMI;
            this.BioMentalAge = this.rezultData.BioMentalAge;
            this.DaylyCallorie = this.rezultData.DaylyCallorie;
            this.CallorieScale = this.rezultData.CallorieScale;
            this.LMP = this.rezultData.LMP;
            this.LMPCategoryScale = this.rezultData.LMPCategoryScale;
            this.RASCVD = this.rezultData.RASCVD;
            this.TenYearsASCVD = this.rezultData.TenYearsASCVD;
            this.BFP = this.rezultData.BFP;
            this.BMR = this.rezultData.BMR;
            this.FM = this.rezultData.FM;
            this.WHRatio = this.rezultData.WHRatio;

        }
    }
</script>

<style scoped>
  .avatar .img{
    cursor: default;
  }
</style>
