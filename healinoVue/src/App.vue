<template>
  <div id="app">
    <background :backgr="backgr"></background>
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
                     :List="List"
                     @toQuestion="toQuestion"
                     @chAc="chAc"></theme-component>
    <question-component v-if="state == 'question'"
                        :questionData="questionData"
                        :SessionData="SessionData"
                        @nextQuestion="nextQuestion"></question-component>

    <rezult-component v-else-if="state == 'rezult'"
                      :rezultData="rezultData"></rezult-component>
  </div>
</template>

<script>
export default {
  name: 'app',
   data () {
    return {
        backgr:1,
        List:[],
        rezultData:{},
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
    watch: {
        state:function () {
            this.backgr = this.newBackground(this.backgr);
        },
    },
    methods:{
      newBackground:function (val) {
          let v = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
          if(v != val){
              return v;
          }else{
              return this.newBackground(val);
          }
      },
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
            let t = this;
            $.post( 'http://healino-api.azurewebsites.net/api/Theme/GetAllThemes',  this.bodyGet  )
                .done(function( data ){
                    t.List = data.List;
                    console.log(data);
                    t.state = "theme";
                });

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
                        if(data.IsFinished){
                            t.rezultData= data;
                            t.state = "rezult";
                        }else {
                            t.questionData = data;
                            t.state = "question";
                        }
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
        },
        bodyToken(token){
            return {
                Token: token,
            }
        }
    },
  created: function() {
      let t = this;
      window.fbAsyncInit = function() {
          FB.init({
              appId      : '1317336621781298',
              cookie     : true,
              xfbml      : true,
              version    : 'v2.11'
          });

          //FB.AppEvents.logPageView();
          FB.getLoginStatus(function(response) {
              console.log(response);
              if (response.status === 'connected') {
                  var accessToken = response.authResponse.accessToken;

                  $.post( 'http://healino-api.azurewebsites.net/api/Account/FacebookOAuthResponse',  t.bodyToken(accessToken)  )
                      .done(function( data ){
                          console.log("done Facebook" );
                          if(data.ErrorCode==1){
                              //t.toQuestion(this.themeActive);
                              t.SessionData = data.SessionString;
                              setCookie('SessionData', data.SessionString, {
                                  expires: 10000*10000,
                                  path: '/'
                              })
                          }else{
                              console.log("error from server" );
                          }
                      })
                      .fail(function() {
                          console.log("error" );
                      });

              }
          } );
      };

      (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      if(getCookie('lang')){
          this.lang = getCookie('lang')
      }
      else{
          this.changeLang(this.lang)
      }
      if(getCookie('SessionData')){
          this.SessionData = getCookie('SessionData')
      }

      /*FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
              var accessToken = response.authResponse.accessToken;

              $.post( 'http://healino-api.azurewebsites.net/api/Account/FacebookOAuthResponse',  this.bodyToken(accessToken)  )
                  .done(function( data ){
                      console.log("done Facebook" );
                      if(data.ErrorCode==1){
                          //t.toQuestion(this.themeActive);
                          t.SessionData = data.SessionString;
                          setCookie('SessionData', data.SessionString, {
                              expires: 10000*10000,
                              path: '/'
                          })
                      }else{
                          console.log("error from server" );
                      }
                  })
                  .fail(function() {
                      console.log("error" );
                  });

          }
      } );*/
    }
}
</script>

<style>

</style>
