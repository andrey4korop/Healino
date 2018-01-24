<template>

    <div class="container">
      <div class="row">
        <div class="avatar">
          <img src="static/img/userAvatar.png" alt="">
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div class="theme">
            <p>Theme name theme</p>
            <img src="static/img/maxresdefault.png" alt="">
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

</template>

<script>
    export default {
        //name: 'app',
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
                WHRatio:0

            }
        },
        computed: {
            getTemp: function () {
                if(!this.temp){
                    this.axios.get('http://healinoapicloudservice.azurewebsites.net/api/TestData/GetTestResult').then((response) => {
                        this.temp = response.data;
                    })
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
            this.axios.get('http://healinoapicloudservice.azurewebsites.net/api/TestData/GetTestResult').then((response) => {
                console.log(response.data);
                //console.log(this.$data);
                this.$data.BMI = response.data.BMI;
                this.$data.BioMentalAge = response.data.BioMentalAge;
                this.$data.DaylyCallorie = response.data.DaylyCallorie;
                this.$data.CallorieScale = response.data.CallorieScale;
                this.$data.LMP = response.data.LMP;
                this.$data.LMPCategoryScale = response.data.LMPCategoryScale;
                this.$data.RASCVD = response.data.RASCVD;
                this.$data.TenYearsASCVD = response.data.TenYearsASCVD;
                this.$data.BFP = response.data.BFP;
                this.$data.BMR = response.data.BMR;
                this.$data.FM = response.data.FM;
                this.$data.WHRatio = response.data.WHRatio;
            })
        }
    }
</script>

<style>

</style>
