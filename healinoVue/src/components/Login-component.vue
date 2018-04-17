<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">

        <div class="btn_social facebook g-signin-button" v-on:click.prevent="FacebookLogin">
          <img src="static/img/facebook.png" alt=""> {{langString('loginFB')}}
        </div>
        <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
          <img src="static/img/google-plus.png" alt="">{{langString('loginG')}}
        </g-signin-button>
        <h5 v-lang.or></h5>
        <label>
          <p><span>*</span>{{langString('email')}}</p>
          <input type="email" v-model="Email" v-on:change="changeEmail">

          <span class="check" v-bind:class="(showLoadEmail) ? 'loading': ''" v-if="showCheckEmail">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(showErrorEmail) ? 'error' : ''" v-if="showErrorEmail">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <div class="descriptionLogin" v-bind:class="(showErrorEmail)?'on':''">
            <div class="text">{{ErrorEmailMassage}}</div>
          </div>
        </label>
        <label>
          <p><span>*</span>{{langString('password')}}</p>
          <input v-bind:type="typeInputPass" v-model="Password" v-on:change="changePass">
          <div  class="eye" v-bind:class="(putMouse) ? 'active' : '' "
                v-on:mousedown="toShowPass"
                v-on:touchstart="toShowPass"
                v-on:mouseup="toHidePass"
                v-on:touchend="toHidePass"
          ></div>
          <span class="check" v-bind:class="(showLoadPass) ? 'loading': ''" v-if="showCheckPass">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(showErrorPass) ? 'error' : ''" v-if="showErrorPass">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <div class="descriptionLogin" v-bind:class="(showErrorPass)?'on':''">
            <div class="text" v-html="ErrorPassMassage"></div>
          </div>
        </label>
        <label class="pointer">
          <p v-lang.forgotPass v-on:click="$emit('onForgot')"></p>
          <input type="checkbox" v-model="remember">
          <span class="checkbox">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span v-lang.rememberMe></span></label>
        <div class="firstPage  pc">
          <button v-on:click.prevent="send"
                  v-lang.login></button>
        </div>
      </form>
      <div class="row sm">
        <div class="firstPage">
          <button v-on:click.prevent="send"
                  v-lang.login></button>
        </div>
      </div>
    </div>
    <div class="music_btn" v-on:click="$emit('audio')">
      <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >

    </div>
  </div>

</template>

<script>
    import Vue from 'vue'
    export default {
        props: ['lang', 'SessionData', 'audio_p'],
        data () {
            return {
                Email: "",
                Password: "",
                IpAddress: "",

                remember: true,
                typeInputPass:"password",
                putMouse:false,

                showCheckEmail: false,
                showLoadEmail: true,
                showErrorEmail: false,
                showCheckPass: false,
                showLoadPass: true,
                showErrorPass: false,

                ErrorPassMassage:"",
                ErrorEmailMassage: "",
                googleSignInParams: {
                    client_id: '55026088655-3uc8o6t7gp4iu24seftuno6k3r6gi5qc.apps.googleusercontent.com'
                }
            }
        },
        messages: {
            en: {
                loginFB:"Sign in with Facebook",
                loginG:"Sign in with Google",
                or:'- or -',
                email:'E-mail',
                password:'Password',
                forgotPass:'Forgot your password?',
                rememberMe:'Remember me',
                login: 'LOGIN',

                errorTextEmail:"Not a valid E-mail",
                errorTextPass:
                "Password must be at least 8 characters<br>" +
                "The presence of at least 1 capital letter<br>" +
                "The presence of at least 1 digits",
                errorTextPass2:"Invalid Email or Password",
                emailUse:"User with e-mails already registered"

            },
            ru: {
                loginFB:"Войти через Facebook",
                loginG:"Войти через Google",
                or:'- или -',
                email:'E-mail',
                password:'Пароль',
                forgotPass:'Забыл пароль?',
                rememberMe:'Запомнить меня',
                login: 'ВХОД',

                errorTextEmail:"Не верный E-mail",
                errorTextPass:"Пароль должен быть не менее 8 символов<br>" +
                "Наличие не менее 1 большой буквы<br>" +
                "Наличие не менее 1 цифры",
                errorTextPass2:"Неверный E-mail или пароль",
                emailUse:"Пользователь с тами E-mail уже зарегистрирован"
            },
            pl: {
                loginFB:"Zaloguj się przez Facebook",
                loginG:"Zaloguj się przez Google",
                or:'- lub -',
                email:'E-mail',
                password:'Hasło',
                forgotPass:'Zapomniałeś hasła?',
                rememberMe:'Zapamiętaj mnie',
                login: 'ZALOGUJ',

                errorTextEmail:"Nieprawidłowy adres e-mail",
                errorTextPass:
                "Hasło musi mieć co najmniej 8 znaków<br>" +
                "Obecność co najmniej 1 wielkiej litery<br>" +
                "Obecność co najmniej 1 cyfry",
                errorTextPass2:"Nieprawidłowy adres e-mail lub hasło",
                emailUse:"Użytkownik z już zarejestrowanymi wiadomościami e-mail"
            }
        },
        computed: {
            body: function () {
                return{
                    Email: this.Email,
                    Password: this.Password,
                    IpAddress: this.IpAddress,
                    Localization: this.lang
                }
            },
        },
        created: function() {

        },
        methods:{
            langString(string){
                return this.translate(string);
            },

            bodyToken(token){
                return {
                    Token: token,
                }
            },
            onSignInSuccess (googleUser) {
                let t = this;
                if(googleUser.Zi.access_token){
                    $.post( '/api/Account/GoogleOAuthResponse',  t.bodyToken(googleUser.Zi.access_token)  )
                        .done(function( data ){
                            if(data.ErrorCode==1){
                                //t.toQuestion(this.themeActive);
                                t.SessionData = data.SessionString;
                                t.$emit('changeLang', data.Language);
                                setCookie('SessionData', data.SessionString, {
                                    expires: 10000*10000,
                                    path: '/'
                                });
                                let temp = {
                                    UserId: data.UserId,
                                    SessionString: data.SessionString,
                                    remember:t.remember
                                };
                                t.$emit('logined', temp);
                            }else{
                            }
                        })
                        .fail(function() {
                        });
                }

            },
            onSignInError (error) {
            },
            FacebookLogin(){
                var t = this;
                FB.login(
                    function(response) {
                        if (response.status === 'connected') {
                            var accessToken = response.authResponse.accessToken;
                              var tempthis = t;
                            $.post( '/api/Account/FacebookOAuthResponse',  tempthis.bodyToken(accessToken)  )
                                .done(function( data ){
                                    if(data.ErrorCode==1){
                                        //t.toQuestion(this.themeActive);
                                        tempthis.SessionData = data.SessionString;
                                        tempthis.$emit('changeLang', data.Language);
                                        setCookie('SessionData', data.SessionString, {
                                            expires: 10000*10000,
                                            path: '/'
                                        });
                                        let temp = {
                                            UserId: data.UserId,
                                            SessionString: data.SessionString,
                                            remember:tempthis.remember
                                        };
                                        tempthis.$emit('logined', temp);
                                    }else{
                                    }
                                })
                                .fail(function() {
                                });
                        }
                    },
                    {
                        scope: 'public_profile',
                    }
                );
            },

            send(){
                let t = this;
                //let p = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(this.Password);
                let e = /^[a-zA-Z0-9_.-]+@\w+\.\w{2,4}$/i.test(this.Email);
                if(e && true){
                  $.post( '/api/Account/Login',  this.body  )
                  .done(function( data ){
                      if(data.ErrorCode==1 || data.UserId != 0){
                          let temp = {
                              UserId: data.UserId,
                              SessionString: data.SessionString,
                              remember:t.remember
                          };
                          t.$emit('logined', temp);
                      }else if(data.ErrorCode==5 || data.DebugMessage=="User not found. User name or password are not corect"){
                          t.showCheckPass = false;
                          t.showErrorPass = true;
                          t.ErrorPassMassage = t.langString('errorTextPass2')
                      }
                  })
                  .fail(function() {
                  });
                }
            },
            toShowPass(){
                this.typeInputPass = "text";
                this.putMouse = true;
            },
            toHidePass(){
                this.typeInputPass = "password"
                this.putMouse = false;
            },
            changeEmail(){
                let t = this;
                this.showCheckEmail = true;
                this.showLoadEmail =true;
                this.showErrorEmail =false;
                setTimeout( function () {
                    t.showLoadEmail = false;
                    var r = /^[a-zA-Z0-9_.-]+@\w+\.\w{2,4}$/i;
                    if (!r.test(t.Email)){
                        t.showCheckEmail = false;
                        t.showErrorEmail = true;
                        t.ErrorEmailMassage = t.langString('errorTextEmail')
                    }
                }, 1500);
            },
            changePass(){
                let t = this;
                this.showCheckPass = true;
                this.showLoadPass =true;
                this.showErrorPass =false;
                setTimeout( function () {
                    t.showLoadPass = false;
                    /*var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
                    if (!r.test(t.Password)){
                        t.showCheckPass = false;
                        t.showErrorPass = true;
                        t.ErrorPassMassage = t.langString('errorTextPass')
                    }*/
                }, 1500);
            },
        }
    }
</script>

<style>
  .descriptionLogin{
    background: rgba(255,0,0,0.2);
    position: absolute;
    left: 0;
    top: 74%;
    width: 100%;
    text-align: left;
    border-radius: 15px 0 15px 15px;
    padding: 4px;
    z-index: -10;
    opacity: 0;
    transition: all 0.5s linear;
  }
  .descriptionLogin.on{
    z-index: 10;
    opacity: 1;
  }
  .descriptionLogin .text{
    border-radius: 15px 0 15px 15px;
    max-height: 109px;
    padding: 3px;
    background: rgba(255,255,255,0.7);
    color: #585858;
  }
  .music_btn{
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>
