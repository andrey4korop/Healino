<template>
  <div class="container themesPageContainer ">
    <headerComponent
            :lang="lang"
            :audio_p="audio_p"
            :userData="userData"
            :QuestionsProgress="userData.QuestionsProgress"
            @changeLang="changeLang"
            @onToUser="$emit('onToUser')"
            @exit="$emit('exit')"
            @toStart="$emit('toStart')"
            @audio="$emit('audio')"></headerComponent>
    <div class="row sm-margin">
      <div class="content">
        <div class="mar">
          <div class="themes">
            <div class="theme" v-for="list in List"
                 v-on:click.prevent="changeActive(list)"
                 v-bind:class="[(list.ThemeStatus=='3') ? 'disable' : '', (list.QuestionsTotal==list.QuestionsFinished) ? 'check' : '']" >
                <div class="buy" v-if="list.ThemeStatus==4">0.99$</div>
                <img v-bind:src="'static/img/theme_'+ list.Id +'.png'">
              <div class="filter" v-on:click="changeActive(list)">
                <img src="/static/img/theme_finish.png" alt=""  v-if="(list.QuestionsTotal==list.QuestionsFinished)">
                <img src="/static/img/activeTheme.png" alt="" v-if="(isActive(list.Id))" style="position: absolute; top: 0; left: 0;" class="checktheme1">
                <div v-if="(list.QuestionsTotal==list.QuestionsFinished)" class="text_rezult" v-on:click.prevent="getRezult(list)">
                  <p> <img src="/static/img/mark.png" class="mark"> {{langString('rezult')}}</p>
                </div>
               <!-- <button v-on:click.prevent="getRezult(list)"  v-lang.rezult></button>-->
              </div>
            </div>
          </div>
        </div>
        <div class="descriptionTheme">
          <h1>{{Title}}</h1>
          <p>{{Description}} </p>
        </div>
      </div>
      <div class="green">
        <button v-on:click="mainButton()">{{mainBTNtext}}</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['SessionData', 'List', 'userData', 'lang', 'audio_p'],
        data () {
            return {
                activeId:0,
                Description:"",
                Title:"",
                /*List:[
                        {"Id":3,
                            "QuestionsFinished":3,
                            "QuestionsTotal":3,
                            "Title":"Общее состояния здоровья\r\n",
                            "ImageUrl":"http://img2.ntv.ru/home/schedule/2016/20160305/ed.jpg",
                            "Description":"\"Тест предназначен для самооценки состояния здоровья, напоминания о необходимости правильного образа жизни, снижения устранимых факторов риска или незамедлительного обращения к врачу. \nНаш организм самоисцеляется, и степень самоисцеления связана с характером питания и особенностями образа жизни, которые играют большую роль на протяжении всей его жизни. \nКаждый из нас в состоянии полностью контролировать устранимые факторы риска самостоятельно и управлять ими. К ним относят физическую нагрузку и упражнения, правильное питание, контроль за весом тела, отказ от курения и потребления алкоголя, стресс, повышенное давление, уровень холестерина и триглицеридов, диабет.\"\t\t\t\t\t\t\t\t\t\r\n",
                            "ThemeStatus":0},
                    {"Id":2,
                        "QuestionsFinished":0,
                        "QuestionsTotal":23,
                        "Title":"Реальный возраст\r\n",
                        "ImageUrl":"http://img2.ntv.ru/home/schedule/2016/20160305/ed.jpg",
                        "Description":"\"Тест предназначен для определения ментального и биологического  возраста.\nСравнените возрасты  с хронологическим возрастом\"\t\t\t\t\t\t\t\t\t\r\n",
                        "ThemeStatus":0},
                    {"Id":1,
                        "QuestionsFinished":0,
                        "QuestionsTotal":6,
                        "Title":"Риск возникновения атеросклеротического сердечно-сосудистого заболевания\r\n",
                        "ImageUrl":"http://img2.ntv.ru/home/schedule/2016/20160305/ed.jpg",
                        "Description":"\"Тест предназначен для оценки риска возникновения сердечно-сосудистого заболевания.\nПри этом горизонт риска - вся жизнь и ближайшие 10 лет\"\t\t\t\t\t\t\t\t\t\r\n",
                        "ThemeStatus":4}],*/

            }
        },
        watch:{
            List:function (newVal, OldVal) {
                this.changeActive(newVal[0]);
            }
        },
        messages: {
            en: {
                rezult: 'VIEW RESULT',
                start: 'START',
            },
            ru: {
                rezult: 'СМОТРЕТЬ РЕЗУЛЬТАТ',
                start: 'СТАРТ',
            },
            pl: {
                rezult: 'ZOBACZYĆ  REZULTAT',
                start: 'START',
            }
        },
        computed: {
            body: function () {
                return {
                    SessionData: this.SessionData,
                }
            },

            mainBTNtext:function () {
              let list = this.returnActiveList();
              if(list.QuestionsTotal==list.QuestionsFinished){
                return this.langString('rezult')
              }else{
                return this.langString('start')
              }
            }
        },
        created: function() {
            this.changeActive(this.List[0]);
        },
        mounted(){

        },
        methods: {
          changeLang(lang){
            this.$emit('changeLang', lang);
          },
          mainButton(){
            let list = this.returnActiveList();
            console.log('list');
            console.log(list);
            if(list.QuestionsTotal==list.QuestionsFinished){
              this.getRezult(list)
            }else{
              this.$emit('toQuestion', this.activeId)
            }
          },
            langString(string){
                return this.translate(string);
            },
            changeActive: function (list) {
                this.$emit('changeActiveTheme', list);
                if(list.ThemeStatus == 0 || list.ThemeStatus == 1 || list.ThemeStatus == 2 ) {
                    this.activeId = list.Id;
                    this.Description = list.Description;
                    this.Title = list.Title;
                    this.$emit('chAc', list.Id);
                }
            },
            isActive: function (id) {
                if(this.activeId == id){
                    return true;
                }else {
                    return false;
                }
            },
            getRezult:function (list) {
                this.$emit('changeActiveTheme', list);
                let t = this;
                $.post( '/api/Theme/GetThemeTestResult',  this.bodyForResult(list)  )
                    .done(function( data ){
                        t.$emit('toRezult',data);
                    });
            },
            bodyForResult: function (list) {
                return {
                    SessionData: this.SessionData,
                    Argument: list.Id,
                }
            },
          returnActiveList(){
              for(var list in this.List){
                if(this.List[list].Id == this.activeId){
                  return (this.List[list]);
                }
              }
          }
        }
    }
</script>

<style scoped>
  .filter img {
    opacity: 0.7;
    width: 40%;
  }

  .row{
    margin-top: 70px;
  }
  .text_rezult{
    position: absolute;
    width: 20%;
    font-size: 10px;
    left: 4%;
    text-align: center;
    display: flex;
    height: 100%;
  }
  .text_rezult p{
    margin: auto;
  }
  @media screen and (max-width: 760px) {
    .text_rezult p{
      font-size: 0.65em;
    }
  }
  .themesPageContainer .themes .theme.check .filter p .mark{
    opacity: 1;
    width: 40%;
  }
  .filter{
    position: absolute;
    top:0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .checktheme1{
    opacity: 1!important;
    height: 100%;
  }
    .buy{
        background: #79ce77;
        display: inline-block;
        padding: 5px 20px;
        border-radius: 20px;
        position: absolute;
        top: 29px;
        left: 135px;
        z-index: 1;
    }
    .buy + img{
        opacity: 0.6;
    }
</style>
