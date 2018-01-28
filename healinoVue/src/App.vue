<template>
  <div id="app">
    <!--<div class="p layer1"></div>
    <div class="p layer2"></div>
    <div class="p layer3"></div>
    <div class="p layer4"></div>
    <div class="p layer5"></div>
    <div class="p layer6"></div>
    <div class="p layer7"></div>
    <div class="p layer8"></div>-->
    <start-component v-if="state == 'start'"
                     @changeLang="changeLang"
                     @onRegister="register"
                     @onLogin="login"
                     @onUser="ToUser"
                     :lang="lang"
                     :SessionData="SessionData"></start-component>
    <login-component v-if="state == 'login'"
                     :lang="lang"
                     :SessionData="SessionData"
                     @logined="logined"
                     @onLicense="license"></login-component>
    <register-component v-if="state == 'register'"
                        :lang="lang"
                     @onLicense="license"></register-component>
    <license-component v-if="state == 'license'"
                       @onToUser="ToUser"></license-component>
    <user-component v-if="state == 'user'"
                    :SessionData="SessionData"
                    :userData="userData"
                    @toTheme="toTheme"></user-component>
    <theme-component v-if="state == 'theme'"
                     :SessionData="SessionData"
                     @toQuestion="toQuestion"
                     @chAc="chAc"></theme-component>
    <question-component v-if="state == 'question'"
                        :questionData="questionData"
                        :SessionData="SessionData"
                        @nextQuestion="nextQuestion"></question-component>

    <rezult-component v-else-if="state == 'rezult'"></rezult-component>
  </div>
</template>

<script>
export default {
  name: 'app',
   data () {
    return {
        userData:{},
        themeActive:0,
        lang:'ru',
        state: 'start',
        SessionData: '',
        UserId: '',
        questionData:{
            QuestionId: 0,
            QuestionTypeEnum: 0,
            UserThemeTestId: 0,
            IsAnswered: true,
            QText: "string",
            ImageUrl: "string",
            AnswerOptions: [
                {
                    Id: 0,
                    ParrentId: 0,
                    AnswerText: "string",
                    ImageUrl: "string",
                    IsUserAnswered: true,
                    Children: [
                        {}
                    ]
                }
            ],
            ErrorCode: 0,
            DebugMessage: "string",
            UIMessage: "string"
        }
    }
  },
    computed: {
        bodyGet: function () {
            return {
                SessionData: this.SessionData,
            }
        },
    },
    methods:{
        changeLang: function (newLang) {
            this.lang = newLang;
            setCookie('lang', this.lang, {
                expires: 10000*10000,
                path: '/'
            })
        },
        register(){
            this.state = "register"
        },
        login(){
            this.state = "login"
        },
        license(){
            this.state = "license"
        },
        ToUser(){
            let t = this;
            $.post( 'http://healino-api.azurewebsites.net/api/Account/GetUserProfile',  this.bodyGet  )
                .done(function( data ){
                    if(data.ErrorCode==1 || data.UserId != null){
                        t.userData = data;
                        t.state = "user";
                        console.log(data);
                    }
                })
                .fail(function() {
                    console.log("error" );
                });

        },
        logined: function (odj){
            let time = odj.remember ? 10000*10000 : 10000
            setCookie('SessionData', odj.SessionString, {
                expires: time,
                path: '/'
            });
            this.SessionData = odj.SessionString;
            this.UserId = odj.UserId;
            this.isFirst();
        },
        toTheme(){
            this.state = "theme"
        },
        toQuestion(id){
            let body ={
                Argument: id,
                SessionData: this.SessionData,
            };
            let t = this;
            $.post( 'http://healino-api.azurewebsites.net/api/Theme/GetNextThemeQuestionWithAnswers',  body)
                .done(function( data ){
                    console.log("done" );
                    console.log(data);
                    if(data.ErrorCode==1){
                        t.questionData = data;
                        t.state = "question"

                    }else{
                        console.log("error from server" );
                    }
                })
                .fail(function() {
                    console.log("error" );
                });
        },
        nextQuestion(body){
            let t = this;
            t.state = "question1";
            $.post( 'http://healino-api.azurewebsites.net/api/Theme/AnswerTheQuestion',  body  )
                .done(function( data ){
                    console.log("done" );
                    if(data.ErrorCode==1){
                        //t.toQuestion(this.themeActive);

                        t.questionData = data;
                        t.state = "question";
                    }else{
                        console.log("error from server" );
                    }
                })
                .fail(function() {
                    console.log("error" );
                });
        },
        isFirst(){
            let t = this;
            console.log("isFirst" );
            $.post( 'http://healino-api.azurewebsites.net/api/Account/GetUserProfile',  this.bodyGet  )
                .done(function( data ){
                    console.log("done" );
                    if(data.Name==null){
                        t.state = "license"
                    }else{
                        t.state = "user";
                    }
                })
                .fail(function() {
                    console.log("error" );
                });
        },
        chAc(id){
            this.themeActive=id;
        }
    },
  created: function() {
      if(getCookie('lang')){
          this.lang = getCookie('lang')
      }
      else{
          this.changeLang(this.lang)
      }
      if(getCookie('SessionData')){
          this.SessionData = getCookie('SessionData')
      }

    }
}
</script>

<style>

</style>
