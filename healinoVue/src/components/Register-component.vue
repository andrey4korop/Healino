<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <button class="btn_social facebook" v-on:click.prevent="FacebookLogin">
          <img src="static/img/facebook.png" alt="">{{langString('loginFB')}}
        </button>
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
          <div class="description" v-bind:class="(showErrorEmail)?'on':''">
            <div class="text">{{ErrorEmailMassage}}</div>
          </div>
        </label>
        <label>
          <p><span>*</span>{{langString('password')}}</p>
          <input v-bind:type="typeInputPass" v-model="Password" v-on:change="changePass">
          <div  class="eye" v-bind:class="(putMouse) ? 'active' : '' " v-on:mousedown="toShowPass" v-on:mouseup="toHidePass"></div>
          <span class="check" v-bind:class="(showLoadPass) ? 'loading': ''" v-if="showCheckPass">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(showErrorPass) ? 'error' : ''" v-if="showErrorPass">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <div class="description" v-bind:class="(showErrorPass)?'on':''">
            <div class="text" v-lang.errorTextPass></div>
          </div>
        </label>
        <label>
          <p><span>*</span>{{langString('verPass')}}</p>
          <input v-bind:type="typeInputVPass" v-model="VPassword" v-on:change="changeVPass">
          <div  class="eye" v-bind:class="(putVMouse) ? 'active' : '' " v-on:mousedown="toShowVPass" v-on:mouseup="toHideVPass"></div>
          <span class="check" v-bind:class="(showLoadVPass) ? 'loading': ''" v-if="showCheckVPass">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(showErrorVPass) ? 'error' : ''" v-if="showErrorVPass">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <div class="description" v-bind:class="(showErrorVPass)?'on':''">
            <div class="text" v-lang.errorTextPass></div>
          </div>
        </label>
        <label class="pointer2">

          <input type="checkbox" v-model="remember">
          <span class="checkbox">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span v-lang.rememberMe></span></label>
        <div class="firstPage pc">
          <button v-on:click.prevent="send" v-lang.login></button>
        </div>
      </form>
    </div>
    <div class="row sm">
      <div class="firstPage">
        <button v-on:click.prevent="send" v-lang.login></button>
      </div>
    </div>
    <div class="music_btn" v-on:click="$emit('audio')">
      <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >

    </div>
  </div>

</template>

<script>


    export default {
        props: ['lang', 'audio_p'],
        data () {
            return {
                Email: "",
                Password: "",
                VPassword: "",

                remember: true,
                typeInputPass:"password",
                typeInputVPass:"password",
                putMouse:false,
                putVMouse:false,

                showCheckEmail: false,
                showLoadEmail: true,
                showErrorEmail: false,
                showCheckPass: false,
                showLoadPass: true,
                showErrorPass: false,
                showCheckVPass: false,
                showLoadVPass: true,
                showErrorVPass: false,

                ErrorEmailMassage:"",

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
                verPass:'Verify Password',
                forgotPass:'Forgot your password?',
                rememberMe:'Remember me',
                login: 'SIGN IN',

                errorTextEmail:"Not a valid E-mail",
                errorTextPass:
                "Password must be at least 8 characters<br>" +
                "The presence of at least 1 capital letter<br>" +
                "The presence of at least 1 digits",
                emailUse:"User with e-mails already registered"
            },
            ru: {
                loginFB:"Регистрация через Facebook",
                loginG:"Регистрация через Google",
                or:'- или -',
                email:'E-mail',
                password:'Пароль',
                verPass:'Подтвердите пароль',
                forgotPass:'Забыл пароль?',
                rememberMe:'Запомнить меня',
                login: 'РЕГИСТРАЦИЯ',

                errorTextEmail:"Не верный E-mail",
                errorTextPass:"Пароль должен быть не менее 8 символов<br>" +
                "Наличие не менее 1 большой буквы<br>" +
                "Наличие не менее 1 цифры",
                emailUse:"Пользователь с тами E-mail уже зарегистрирован"
            },
            pl: {
                loginFB:"Zaloguj się przez Facebook",
                loginG:"Zaloguj się przez Google",
                or:'- lub -',
                email:'E-mail',
                password:'Hasło',
                verPass:'Potwierdź hasło',
                forgotPass:'Zapomniałeś hasła?',
                rememberMe:'Zapamiętaj mnie',
                login: 'REJESTRACJA',

                errorTextEmail:"Nieprawidłowy adres e-mail",
                errorTextPass:
                "Hasło musi mieć co najmniej 8 znaków<br>" +
                "Obecność co najmniej 1 wielkiej litery<br>" +
                "Obecność co najmniej 1 cyfry",
                emailUse:"Użytkownik z już zarejestrowanymi wiadomościami e-mail"
            }
        },
        computed: {
          body: function () {
              return{
                  Email: this.Email,
                  Password: this.Password,
                  //SessionData: this.SessionData,
                  Localization: this.lang
              }
          }
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
                                t.SessionData = data.SessionString;
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
                                        setCookie('SessionData', data.SessionString, {
                                            expires: 10000*10000,
                                            path: '/'
                                        });
                                        let temp = {
                                            UserId: data.UserId,
                                            SessionString: data.SessionString,
                                            remember:t.remember
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
                let p = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(this.Password);
                let e = /^[a-zA-Z0-9_.-]+@\w+\.\w{2,4}$/i.test(this.Email);
                if(p && e && true){
                    $.post( '/api/Account/Register', this.body )
                        .done(function( data ){
                            if(data.ErrorCode==1){
                                t.$emit('toShowMessageReg');
                            }else if(data.ErrorCode==5 && data.DebugMessage=="User not found. User name or password are not corect"){
                                t.showCheckPass = false;
                                t.showErrorPass = true;
                                t.showCheckVPass = false;
                                t.showErrorVPass = true;
                            }else if(data.ErrorCode==5 && data.DebugMessage=="Email is exist"){
                                t.showCheckEmail = false;
                                t.showErrorEmail = true;
                                t.ErrorEmailMassage = t.langString('emailUse')
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
            toShowVPass(){
                this.typeInputVPass = "text";
                this.putVMouse = true;
            },
            toHideVPass(){
                this.typeInputVPass = "password"
                this.putVMouse = false;
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
                    var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
                    if (!r.test(t.Password)){
                        t.showCheckPass = false;
                        t.showErrorPass = true;
                    }
                }, 1500);
            },
            changeVPass(){
                let t = this;
                this.showCheckVPass = true;
                this.showLoadVPass =true;
                this.showErrorVPass =false;
                setTimeout( function () {
                    t.showLoadVPass = false;
                    var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
                    if (!r.test(t.VPassword) || t.VPassword!=t.Password){
                        t.showCheckVPass = false;
                        t.showErrorVPass = true;
                    }
                }, 1500);
            }
        },
        created: function() {

        },
        watch: {
            // эта функция запускается при любом изменении вопроса
            Password: function (newQuestion, oldQuestion) {
                this.showCheckVPass = false;
                if(this.VPassword==newQuestion){
                    this.changeVPass();
                }
            }
        },
    }
</script>

<style>
  .description{
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
  .description.on{
    z-index: 10;
    opacity: 1;
  }
  .description .text{
    border-radius: 15px 0 15px 15px;
    max-height: 109px;
    overflow-x: hidden;
    overflow-y: hidden;
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
  @media screen and (max-width: 960px) {
    .login {
      width: calc(51.66667% - 5px);
    }
  }
  @media screen and (max-width: 760px) {
    .login {
      width: calc(87.5% - 5px);
    }
    .login .btn_social, .login .g-signin-button{
      font-size: 13px;
    }
  }
</style>
