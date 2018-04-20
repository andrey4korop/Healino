<template>
  <div id="app">
      <audio loop id="audio" autoplay>
      <source src="static/music.mp3" type="audio/mpeg">
      <source src="static/music.ogg" type="audio/ogg; codecs=vorbis">
      </audio>
    <background :backgr="backgr"
                :bg="bg"></background>
    <start-component v-if="state == 'start'"
                     @changeLang="changeLang"
                     @onRegister="register"
                     @onLogin="login"
                     @onUser="isFirst"
                     @nextBack="nextBack"
                     @exit="exit"
                     @audio="audio"
                     :audio_p="audio_p"
                     :lang="lang"
                     :SessionData="SessionData"></start-component>
    <login-component v-if="state == 'login'"
                     :lang="lang"
                     :SessionData="SessionData"
                     @audio="audio"
                     :audio_p="audio_p"
                     @changeLang="changeLang"
                     @logined="logined"
                     @exit="exit"
                     @onForgot="onForgot"
                     @onLicense="license"></login-component>
    <recoveryPassComponent  v-if="state == 'forgot'"
                            @audio="audio"
                            @exit="exit"
                            :audio_p="audio_p"
                            @onForgotMessage="onForgotMessage"></recoveryPassComponent>
    <recoveryPassMessageComponent  v-if="state == 'forgotMessage'"
                                   @toStart="onToStart"></recoveryPassMessageComponent>
    <recPassComponent  v-if="state == 'recPass'"
                       @audio="audio"
                       @exit="exit"
                       @onLogin="login"
                       :audio_p="audio_p"
                       :UniqId="UniqId"></recPassComponent>
    <register-component v-if="state == 'register'"
                        :lang="lang"
                        @audio="audio"
                        @exit="exit"
                        @changeLang="changeLang"
                        :audio_p="audio_p"
                        @logined="logined"
                        @toShowMessageReg="toShowMessageReg"
                     @onLicense="license"></register-component>
    <registrationMessageComponent v-if="state == 'RegMessage'"
                                  @toStart="onToStart"></registrationMessageComponent>
    <license-component v-if="state == 'license'"
                       @audio="audio"
                       @onToStart="onToStart"
                       @exit="exit"
                       :audio_p="audio_p"
                       @onToUser="ToUser"></license-component>
    <user-component v-if="state == 'user'"
                    :SessionData="SessionData"
                    :userData="userData"
                    @audio="audio"
                    @exit="exit"
                    :answerSelectSelected="answerSelectSelected"
                    :audio_p="audio_p"
                    @changeAva="changeAvatar"
                    @pushSelectOption="pushSelectOption"
                    @toTheme="toTheme"></user-component>
    <theme-component v-if="state == 'theme'"
                     :SessionData="SessionData"
                     :List="List"
                     :userData="userData"
                     :lang="lang"
                     @audio="audio"
                     @exit="exit"
                     :audio_p="audio_p"
                     @toRezult="toRezult"
                     @changeLang="changeLang"
                     @changeActiveTheme="changeActiveTheme"
                     @toQuestion="toQuestion"
                     @onToUser="ToUser"
                     @chAc="chAc"></theme-component>
    <question-component v-if="state == 'question'"
                        :questionData="questionData"
                        :SessionData="SessionData"
                        :lang="lang"
                        :userData="userData"
                        :errorQuest="errorQuest"
                        @audio="audio"
                        @exit="exit"
                        :audio_p="audio_p"
                        :answerSelectSelected="answerSelectSelected"
                        @toTheme="toTheme"
                        @toRezult="toRezult"
                        @changeLang="changeLang"
                        @nextQuestion="nextQuestion"
                        @prevQuestion="prevQuestion"
                        @setErrorQuestion="setErrorQuestion"
                        @pushSelectOption="pushSelectOption"
                        @onToUser="ToUser"
                        @clearnError="clearnError"></question-component>

    <rezult-component v-else-if="state == 'rezult'"
                      @audio="audio"
                      @exit="exit"
                      :audio_p="audio_p"
                      :userData="userData"
                      :themeActiveObj="themeActiveObj"
                      :rezultData="rezultData"></rezult-component>
    <rezultPublic-component v-else-if="state == 'rezultPublic'"
                            @audio="audio"
                            @exit="exit"
                            :audio_p="audio_p"
                      :rezultData="rezultData"></rezultPublic-component>
      <pay-component v-else-if="state == 'pay'"
                              @audio="audio"
                              @exit="exit"
                              :audio_p="audio_p"
                                :lang="lang"
                              @onToUser="ToUser"
                              @changeLang="changeLang"></pay-component>

  </div>
</template>

<script>

export default {
  name: 'app',
   data () {
    return {
        audio_p:false,
        UniqId:'',
        activeId:0,
        errorQuest:false,
        backgr:1,
        bg:0,
        List:[],
        themeActiveObj:{},
        rezultData:{},
        userData:{},
        themeActive:0,
        lang:'en',
        state: 'start',
        SessionData: '',
        UserId: '',
      answerSelectSelected:[],
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
        prevBody: function () {
            return {
                SessionData: this.SessionData,
                Argument: this.themeActiveObj.Id,
                QuestionId: this.questionData.PreviusQuestionId,
            }
        },
    },
    watch: {
        state:function () {
            this.backgr = this.newBackground(this.backgr);
        },
    },
    methods:{
        audio:function () {
          let a = $('audio')[0];
          if(a.paused){
              a.play();
              this.audio_p = true;
          }else{
              a.pause();
              this.audio_p = false;
          }
        },
        nextBack:function () {
          this.bg++;
        },
      newBackground:function (val) {
          this.bg++;
      },
        changeLang: function (newLang) {
            this.lang = newLang;
            this.language = newLang;
            let t = this;
            setCookie('lang', this.lang, {
                expires: 10000*10000,
                path: '/'
            });
            $.post( '/api/Account/ChangeLanguage',
                {
                    Language:  this.lang,
                    SessionData: this.SessionData
                }).done(function () {
                if(t.state=="theme"){
                    t.toTheme();
                }
                if(t.state=="question"){
                    t.toQuestion(t.activeId);
                }
            });
        },
        register(){
            this.state = "register"
        },
        onForgot(){
            this.state = "forgot"
        },
        onForgotMessage(){
          this.state = "forgotMessage"
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
                    }
                })
                .fail(function() {
                });
        },
        toShowMessageReg(){
            this.state = "RegMessage";
        },
        isFirst(){
            let t = this;
            $.post( '/api/Account/GetUserProfile',  t.bodyGet  )
                .done(function( data ){
                    if(data.ErrorCode==1 || data.UserId != null) {
                        t.userData = data;
                        if (!data.Phone) {
                            t.license();
                        } else {
                            //t.state = "user";
                            t.toTheme();
                        }
                    }
                })
                .fail(function() {
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
                    t.state = "theme";
                });
        },
        onToStart(){
            this.state="start";
            this.bg-=2;
        },
        toQuestion(id){
            this.activeId = id;
            let body ={
                Argument: id,
                SessionData: this.SessionData,
                QuestionId: (this.questionData) ? this.questionData.QuestionId : null,
            };
            let t = this;
            $.post( '/api/Theme/GetNextThemeQuestionWithAnswers',  body)
                .done(function( data ){
                    if(data.ErrorCode==1){
                        if(data.IsFinished){
                            t.toRezult(data);
                        }else {
                            t.questionData = data;
                            t.state = "question";
                        }
                    }else{
                    }
                })
                .fail(function() {
                });
        },
        nextQuestion(body){
            let t = this;
            $.post( '/api/Theme/AnswerTheQuestion',  body  )
                .done(function( data ){
                    if(data.ErrorCode==1){
                        if(data.IsFinished){
                            t.toRezult(data);
                        }else {
                            t.questionData = data;
                            t.bg++;
                        }
                    }else if(data.ErrorCode==1 && data.DebugMessage=="Question already answered"){
                        t.toQuestion(t.activeId);
                    }
                    else{
                        t.errorQuest = true;
                    }
                })
                .fail(function() {
                });
        },
        prevQuestion(){
            let t = this;
            $.post( '/api/Theme/GetNextThemeQuestionWithAnswers',  this.prevBody  )
                .done(function( data ){
                    if(data.ErrorCode==1){
                        if(data.IsFinished){
                            t.toRezult(data);
                        }else {
                            t.questionData = data;
                            t.bg--;
                        }
                    }else if(data.ErrorCode==1 && data.DebugMessage=="Question already answered"){
                        t.toQuestion(t.activeId);
                    }
                    else{
                        t.errorQuest = true;
                    }
                })
                .fail(function() {
                });
        },
        clearnError(){
          this.errorQuest = false;
        },
        toRezult(data){
            if(data.ErrorCode==1) {
                this.rezultData = data;
                this.state = "rezult"
            }
        },
        toPublicRezult(data){
            if(data.ErrorCode==1) {
                this.rezultData = data;
                this.state = "rezultPublic"
            }
        },
        chAc(id){
            this.themeActive=id;
        },
        changeActiveTheme(obj){
          this.themeActiveObj = obj;
        },
        changeAvatar(img){
            this.userData.PhotoUrl = img;
        },
        exit(){
          deleteCookie('SessionData');
          deleteCookie('lang');
          FB.logout();
          location.reload();
        },
        setErrorQuestion(){
          this.errorQuest = true;
        },
      pushSelectOption(opt){
          let t = this;
          if(typeof opt ==="string") {
            this.answerSelectSelected.push(opt);
          }else{
            $.each(opt,function ( index, value) {
              t.pushSelectOption(value);
            })
          }
      },
        bodyToken(token){
            return {
                Token: token,
            }
        }
    },
  created: function() {
      let t = this;
      setTimeout(function () {
          let a = $('audio')[0];
          try {
              a.play();
              t.audio_p = true;
              a.volume = 0.6;
              if(a.paused){
                  t.audio_p = false;
              }
          }catch(e){
              t.audio_p = false;
          }
      }, 1500);

      if(window.location.search){
          var regexp = /UniqId=([^&]+)/i;
          var UniqId = '';
          if (!!regexp.exec(document.location.search)) {
              UniqId = regexp.exec(document.location.search)[1];
          }
          var regexp1 = /sign=([^&]+)/i;
          var sign = '';
          if (!!regexp1.exec(document.location.search)) {
              sign = regexp1.exec(document.location.search)[1];
          }
          var regexp2 = /req=([^&]+)/i;
          var req = '';
          if (!!regexp2.exec(document.location.search)) {
              req = regexp2.exec(document.location.search)[1];
          }
          var regexp3 = /result=([^&]+)/i;
          var result = '';
          if (!!regexp3.exec(document.location.search)) {
              result = regexp3.exec(document.location.search)[1];
          }
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
                      if(data.ErrorCode==1){
                          t.SessionData = data.SessionString;
                          t.isFirst();
                          setCookie('SessionData', data.SessionString, {
                              expires: 10000,
                              path: '/'
                          });
                          if(getCookie('lang')){
                              t.lang = getCookie('lang');
                              t.changeLang(t.lang);
                          }
                          else{
                              t.changeLang(t.lang)
                          }
                          try {
                              history.pushState(null, null, "/");
                              return;
                          } catch(e) {}
                      }else{
                          t.SessionData = '';
                          deleteCookie('SessionData');
                      }
                  })
                  .fail(function() {
                  });
          }
          if(result){
              $.post( '/api/Theme/GetThemeTestResultForPublic',  {SessionData:result} )
                  .done(function( data ){
                      if(data.ErrorCode==1){
                          t.toPublicRezult(data);
                          try {
                              history.pushState(null, null, "/");
                              return;
                          } catch(e) {}
                      }else{
                      }
                  })
                  .fail(function() {
                  });
          }
          if(UniqId){
              this.UniqId=UniqId;
              this.state='recPass';
              try {
                  history.pushState(null, null, "/");
                  return;
              } catch(e) {}
          }
      }
      window.fbAsyncInit = function() {
          FB.init({
              appId      : '1317336621781298',
              cookie     : true,
              xfbml      : true,
              version    : 'v2.11'
          });

          FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                  var accessToken = response.authResponse.accessToken;

                  $.post( '/api/Account/FacebookOAuthResponse',  t.bodyToken(accessToken)  )
                      .done(function( data ){
                          if(data.ErrorCode==1){
                              t.SessionData = data.SessionString;
                              t.changeLang(data.Language);
                              setCookie('SessionData', data.SessionString, {
                                  expires: 10000,
                                  path: '/'
                              })
                          }else{
                              t.SessionData = '';
                              deleteCookie('SessionData');
                          }
                      })
                      .fail(function() {
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
          this.lang = getCookie('lang');
          this.changeLang(this.lang);
      }
      else{
          this.changeLang(this.lang)
      }
      if(getCookie('SessionData')){
          let t = this;
          this.SessionData = getCookie('SessionData');
          $.post( '/api/Account/GetUserProfile',  this.bodyGet  )
              .done(function( data ){
                  t.userData = data;
                  if(data.ErrorCode!=1){
                      t.SessionData = '';
                      deleteCookie('SessionData');
                  }
                if(getCookie('lang')){
                  t.lang = getCookie('lang');
                  t.changeLang(t.lang);
                }
                else{
                  t.changeLang(t.lang)
                }
              })
              .fail(function() {
              });
      }
    }
}
</script>

<style>

</style>
