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
                    @toTheme="toTheme"></user-component>
    <theme-component v-if="state == 'theme'"
                     :SessionData="SessionData"></theme-component>
    <question-component v-if="state == 'question'"></question-component>

    <rezult-component v-else-if="state == 'rezult'"></rezult-component>
  </div>
</template>

<script>
export default {
  name: 'app',
   data () {
    return {
        lang:'ru',
        state: 'start',
        SessionData: '',
        UserId: ''
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
            this.state = "user"
        },
        logined: function (odj){
            setCookie('SessionData', odj.SessionString, {
                expires: 10000*10000,
                path: '/'
            });
            this.SessionData = odj.SessionString;
            this.UserId = odj.UserId;
            this.isFirst();




        },
        toTheme(){
            this.state = "theme"
        },
        isFirst(){
            let t = this;
            $.post( 'http://healino-api.azurewebsites.net/api/Account/GetUserProfile',  this.bodyGet  )
                .done(function( data ){
                    if(data.Name==null){
                        t.state = "license"
                    }else{
                        t.state = "user";
                    }
                });
        },
    },
  created: function() {
      if(getCookie('lang')){
          this.lang = getCookie('lang')
      }
      else{
          setCookie('lang', this.lang, {
              expires: 10000*10000,
              path: '/'
          })
      }
      if(getCookie('SessionData')){
          this.SessionData = getCookie('SessionData')
      }


      if(sessionStorage.userId){
        this.userProfile = sessionStorage.userId;
      }
    }
}
</script>

<style>

</style>
