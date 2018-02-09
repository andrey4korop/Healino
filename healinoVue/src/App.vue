<template>
  <div id="app">
    <background :backgr="backgr"></background>
    <start-component v-if="state == 'start'"
                     @changeLang="changeLang"
                     @onRegister="register"
                     @onLogin="login"
                     @onUser="isFirst"
                     :lang="lang"
                     :SessionData="SessionData"></start-component>
    <login-component v-if="state == 'login'"
                     :lang="lang"
                     :SessionData="SessionData"
                     @logined="logined"
                     @onLicense="license"></login-component>
    <register-component v-if="state == 'register'"
                        :lang="lang"
                        @logined="logined"
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
                     :userData="userData"
                     :lang="lang"
                     @toRezult="toRezult"
                     @changeLang="changeLang"
                     @changeActiveTheme="changeActiveTheme"
                     @toQuestion="toQuestion"
                     @chAc="chAc"></theme-component>
    <question-component v-if="state == 'question'"
                        :questionData="questionData"
                        :SessionData="SessionData"
                        :lang="lang"
                        :userData="userData"
                        :errorQuest="errorQuest"
                        @toTheme="toTheme"
                        @toRezult="toRezult"
                        @changeLang="changeLang"
                        @nextQuestion="nextQuestion"
                        @clearnError="clearnError"></question-component>

    <rezult-component v-else-if="state == 'rezult'"
                      :userData="userData"
                      :themeActiveObj="themeActiveObj"
                      :rezultData="rezultData"></rezult-component>
  </div>
</template>

<script>

export default {
  name: 'app',
   data () {
    return {
        activeId:0,
        errorQuest:false,
        backgr:1,
        List:[],
        themeActiveObj:{},
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
            $.post( '/api/Account/GetUserProfile',  this.bodyGet  )
                .done(function( data ){
                    if(data.ErrorCode==1 || data.UserId != null){
                        t.userData = data;
                        t.state = "user";
                        //console.log(data);
                    }
                })
                .fail(function() {
                    //console.log("error" );
                });

        },
        isFirst(){
            let t = this;
            ///console.log("isFirst" );
            $.post( '/api/Account/GetUserProfile',  this.bodyGet  )
                .done(function( data ){
                    if(data.ErrorCode==1 || data.UserId != null) {
                        t.userData = data;
                        //console.log("done" + data.Phone);
                        if (!data.Phone) {
                            t.state = "license"
                        } else {
                            //t.state = "user";
                            t.toTheme();
                        }
                    }
                })
                .fail(function() {
                    //console.log("error" );
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
            $.post( '/api/Theme/GetAllThemes',  this.bodyGet  )
                .done(function( data ){
                    t.List = data.List;
                    //console.log(data);
                    t.state = "theme";
                });

        },
        toQuestion(id){
            this.activeId = id;
            let body ={
                Argument: id,
                SessionData: this.SessionData,
            };
            let t = this;
            $.post( '/api/Theme/GetNextThemeQuestionWithAnswers',  body)
                .done(function( data ){
                    //console.log("done" );
                    //console.log(data);
                    if(data.ErrorCode==1){
                        if(data.IsFinished){
                           // t.rezultData= data;
                            console.log(data);
                            t.toRezult(data);
                        }else {
                            t.questionData = data;
                            t.state = "question";
                        }

                    }else{
                       // console.log("error from server" );
                    }
                })
                .fail(function() {
                   // console.log("error" );
                });
        },
        nextQuestion(body){
            let t = this;
            //t.state = "question";

            $.post( '/api/Theme/AnswerTheQuestion',  body  )
                .done(function( data ){
                    //console.log("done" );
                    if(data.ErrorCode==1){
                        //t.toQuestion(this.themeActive);
                        if(data.IsFinished){
                            //t.rezultData= data;
                            //console.log(data);
                            t.toRezult(data);
                        }else {
                            t.questionData = data;
                            t.backgr = t.newBackground(t.backgr);
                        }
                    }else if(data.ErrorCode==1 && data.DebugMessage=="Question already answered"){
                        t.toQuestion(t.activeId);
                    }
                    else{
                        t.errorQuest = true;
                        //console.log("error from server" );
                    }
                })
                .fail(function() {
                   // console.log("error" );
                });
        },
        clearnError(){
          this.errorQuest = false;
        },
        toRezult(data){
            console.log('data to rezult');
            console.log(data);
            if(data.ErrorCode==1) {
                this.rezultData = data;
                this.state = "rezult"
            }
        },
        chAc(id){
            this.themeActive=id;
        },
        changeActiveTheme(obj){
          this.themeActiveObj = obj;
        },
        bodyToken(token){
            return {
                Token: token,
            }
        }
    },
  created: function() {


// Just add in this line
     /* Vue.googleAuth().directAccess();

      Vue.googleAuth().signIn(function (googleUser) {
          console.log(googleUser);
      }, function (error) {
          // things to do when sign-in fails
      });*/

      if(window.location.search){
          var regexp = /sign=([^&]+)/i;
          var sign = '';
          if (!!regexp.exec(document.location.search))
              sign = regexp.exec(document.location.search)[1];
          var regexp = /req=([^&]+)/i;
          var req = '';
          if (!!regexp.exec(document.location.search))
              req = regexp.exec(document.location.search)[1];
          let t =this;
          var hhh = function () {
              return{
                  ActivationId:req,
                  Signature:sign
              }
          };
          if(sign && req){
              $.post( '/api/Account/ActivateUser',  hhh() )
                  .done(function( data ){
                      //console.log("done activate" );
                      if(data.ErrorCode==1){
                          //t.toQuestion(this.themeActive);
                          t.SessionData = data.SessionString;
                          t.isFirst();
                          setCookie('SessionData', data.SessionString, {
                              expires: 10000,
                              path: '/'
                          });
                          try {
                              history.pushState(null, null, "/");
                              return;
                          } catch(e) {}
                          //t.state = "license";


                      }else{
                          //console.log("error from server" );
                      }
                  })
                  .fail(function() {
                      //console.log("error" );
                  });
          }
      }
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
              //console.log(response);
              if (response.status === 'connected') {
                  var accessToken = response.authResponse.accessToken;

                  $.post( '/api/Account/FacebookOAuthResponse',  t.bodyToken(accessToken)  )
                      .done(function( data ){
                          //console.log("done Facebook" );
                          if(data.ErrorCode==1){
                              //t.toQuestion(this.themeActive);
                              t.SessionData = data.SessionString;
                              setCookie('SessionData', data.SessionString, {
                                  expires: 10000,
                                  path: '/'
                              })
                          }else{
                              //console.log("error from server" );
                          }
                      })
                      .fail(function() {
                          //console.log("error" );
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
          let t = this;
          this.SessionData = getCookie('SessionData')
          //console.log("Start" );
          $.post( '/api/Account/GetUserProfile',  this.bodyGet  )
              .done(function( data ){
                  t.userData = data;
                  //console.log("done" );
                  if(!data.ErrorCode==1){
                      t.SessionData = '';
                      deleteCookie('SessionData');
                  }
              })
              .fail(function() {
                  //console.log("error" );
              });

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
      console.log(this.SessionData);

    }
}
</script>

<style>

</style>
