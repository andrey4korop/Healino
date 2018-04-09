<template>
  <div>
    <div class="container pc">
      <div class="row">
        <indicatorAvatar :rezultData="rezultData"
                         :img="img"
                         :showDescription="showDescription"
                         @onDescription="onDescription"></indicatorAvatar>
      </div>
      <div class="row">
        <div class="left">
          <div class="theme">
            <p>{{rezultData.TestName}}</p>
            <div class="img"
                 v-bind:style="{background: 'url(' + rezultData.TestImageUrl + ') center center / cover' }" alt=""></div>
          </div>
        </div>
        <div class="center" v-bind:style="{background: 'url(/static/img/'+gender+') top center / contain no-repeat'}">
          <indicator2 :rezultData="rezultData"
                      :showDescription="showDescription"
                      @onDescription="onDescription"></indicator2>
          <indicatorBMI :rezultData="rezultData"
                        :showDescription="showDescription"
                        @onDescription="onDescription"></indicatorBMI>

          <div class="indicators">
            <div class="title_indicator">
              <p class="age">Real Age</p>
            </div>
            <div class="indicator">
              <div class="plus" v-on:click="onDescription(4)"><img src="static/img/plus.png" alt=""></div>
              <div class="description" v-bind:class="(showDescription==4)?'on':''">
                <div class="text"
                     v-lang.AgeDescriptionText="{ChronologicalAge: rezultData.BioMentalAge.ChronologicalAge, MentalAge: rezultData.BioMentalAge.MentalAge, BiologicalAge: rezultData.BioMentalAge.BiologicalAge, txtMental:txtMental, txtBiological:txtBiological}">
                </div>
              </div>
              <div class="row_indicator">
                <indicator-real-age :rezultData="rezultData"></indicator-real-age>
              </div>
              <div class="row_indicator rowt">
                <div class="title_indicator">
                  <p class="age">Biological age</p>
                </div>
                <div class="title_indicator">
                  <p class="age">Mental age</p>
                </div>
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
            <div class="title_indicator title_indicatorCVD">
              <p class="cvd">Risks of atherosclerotic cardiovascular disease (RACVD)</p>
            </div>
            <div class="indicator">
              <div class="plus" v-on:click="onDescription(5)"><img src="static/img/plus.png" alt=""></div>
              <div class="description" v-bind:class="(showDescription==5)?'on':''">
                <div class="text" v-lang.CVDdescriptionText="{RASCVD: rezultData.RASCVD, TenYearsASCVDCalculated: rezultData.TenYearsASCVD.Calculated, TenYearsASCVDOptimal: rezultData.TenYearsASCVD.Optimal}"></div>
              </div>

              <div class="row_indicator">
                <indicator-CVD5 :rezultData="rezultData"></indicator-CVD5>

                <indicator-CVD10 :rezultData="rezultData"></indicator-CVD10>
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
                          @onDescription="onDescription"></indicatorWHR>
            <indicatorLMP :rezultData="rezultData"
                          :showDescription="showDescription"
                          @onDescription="onDescription"></indicatorLMP>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="bottom">
          <indicatorBF :rezultData="rezultData"
                       :showDescription="showDescription"
                       @onDescription="onDescription"></indicatorBF>

          <indicator1 :rezultData="rezultData"
                      :showDescription="showDescription"
                      @onDescription="onDescription"></indicator1>
          <indicatorBMR :BMR="BMR" style="visibility: hidden; display: none;"></indicatorBMR>
        </div>
      </div>
      <div class="button_share">
        <button class="share" v-on:click.prevent="share" v-lang.share></button>
      </div>
    </div>


    <div class="containerMob sm">
      <div class="pos1">
        <indicator2 :rezultData="rezultData"
                    :showDescription="showDescription"
                    @onDescription="onDescription"></indicator2>
      </div>
      <div class="pos2">
        <indicatorBMI :rezultData="rezultData"
                      :showDescription="showDescription"
                      @onDescription="onDescription"></indicatorBMI>
      </div>
      <div class="pos3">
        <indicatorAvatar :rezultData="rezultData"
                         :img="img"
                         :showDescription="showDescription"
                         @onDescription="onDescription"></indicatorAvatar>
      </div>

      <div class="pos4">
        <div class="indicators">
          <div class="title_indicator">
            <p class="age">Real Age</p>
          </div>
          <div class="indicator">
            <div class="plus" v-on:click="onDescription(4)"><img src="static/img/plus.png" alt=""></div>
            <div class="description" v-bind:class="(showDescription==4)?'on':''">
              <div class="text"
                   v-lang.AgeDescriptionText="{ChronologicalAge: rezultData.BioMentalAge.ChronologicalAge, MentalAge: rezultData.BioMentalAge.MentalAge, BiologicalAge: rezultData.BioMentalAge.BiologicalAge, txtMental:txtMental, txtBiological:txtBiological}">
              </div>
            </div>
            <div class="row_indicator">
              <indicator-real-age :rezultData="rezultData"></indicator-real-age>
            </div>
            <div class="row_indicator">
              <div class="title_indicator">
                <p class="age">Biological age</p>
              </div>
              <div class="title_indicator">
                <p class="age">Mental age</p>
              </div>
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
            <p class="cvd">Risks of atherosclerotic cardiovascular disease (RACVD)</p>
          </div>
          <div class="indicator">
            <div class="plus" v-on:click="onDescription(5)"><img src="static/img/plus.png" alt=""></div>
            <div class="description" v-bind:class="(showDescription==5)?'on':''">
              <div class="text" v-lang.CVDdescriptionText="{RASCVD: rezultData.RASCVD, TenYearsASCVDCalculated: rezultData.TenYearsASCVD.Calculated, TenYearsASCVDOptimal: rezultData.TenYearsASCVD.Optimal}"></div>
            </div>

            <div class="row_indicator">
              <indicator-CVD5 :rezultData="rezultData"></indicator-CVD5>
              <indicator-CVD10 :rezultData="rezultData"></indicator-CVD10>
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
                     @onDescription="onDescription"></indicatorBF>

        <indicator1 :rezultData="rezultData"
                    :showDescription="showDescription"
                    @onDescription="onDescription"></indicator1>
        <!--<indicatorBMR :BMR="BMR" style="visibility: hidden; display: none" ></indicatorBMR>-->
        <div class="button_share">
          <button class="share" v-on:click.prevent="share" v-lang.share></button>
        </div>
      </div>
      <div class="pos7">
        <indicatorLMP :rezultData="rezultData"
                      :showDescription="showDescription"
                      @onDescription="onDescription"></indicatorLMP>
      </div>
      <div class="pos8">
        <indicatorWHR :rezultData="rezultData"
                      :showDescription="showDescription"
                      @onDescription="onDescription"></indicatorWHR>
      </div>
    </div>
    <div class="music_btn" v-on:click="$emit('audio')">
      <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >

    </div>
  </div>

</template>

<script>
    export default {
        props:['rezultData','audio_p'],
        data () {
            return {
                showDescription:"none",
				gender:"body0.png",
                img:""
            }
        },
        messages: {
            en: {
                share: 'SHARE',
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
            },
            ru: {
                share: 'ПОДЕЛИТЬСЯ',
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
            },
            pl: {
                share: 'DZIELIĆ SIĘ',

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
            }
        },
        computed: {
          /*langString(string){
           return this.translate(string);
           },*/
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

            this.img = this.rezultData.UserPhotoUrl || '../static/img/noIMG.png';
			this.gender = "body"+this.rezultData.BMIScale[0].Gender+".png";
        },
        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);
                window.addEventListener('resize', this.getWindowHeight);

                //Init
                this.getWindowWidth()
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        },
        methods:{
            getWindowWidth(event) {
                this.width = document.documentElement.clientWidth;
            },
            share(){
                FB.ui({
                    method: 'share',
                    mobile_iframe: true,
                    href: window.location.origin+'//?result='+this.rezultData.PublicHash,
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
    right: 100%;
    bottom: 100%;
    width: 22vw;
    text-align: left;
    border-radius: 15px 15px 0 15px;
    padding: 15px;
    z-index: -10;
    opacity: 0;
    transition: all 0.5s linear;
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
    left: 120%;
    bottom: 120%;

    width: 22vw;
    text-align: left;
    border-radius: 15px 15px 15px 0;
    padding: 15px;
    z-index: -10;
    opacity: 0;
    transition: all 0.5s linear;
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
    left: -15%;
    right: -15%;
    width: 130%;
    justify-content: space-evenly!important;
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
    .title_indicator .cvd {
      font-size: 12px;
      line-height: 21px;
    }
  }
</style>
