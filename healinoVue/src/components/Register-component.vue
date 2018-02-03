<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <button class="btn_social facebook" v-on:click.prevent="FacebookLogin">
          <img src="static/img/facebook.png" alt="">Sign Up with Facebook
        </button>
        <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
          <img src="static/img/google-plus.png" alt="">Login with Google
        </g-signin-button>
        <h5>or</h5>
        <label>
          <p><span>*</span>Email</p>
          <input type="email" v-model="Email" v-on:change="changeEmail">

          <span class="check" v-bind:class="(showLoadEmail) ? 'loading': ''" v-if="showCheckEmail">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Password</p>
          <input v-bind:type="typeInputPass" v-model="Password" v-on:change="changePass">
          <div  class="eye" v-bind:class="(putMouse) ? 'active' : '' " v-on:mousedown="toShowPass" v-on:mouseup="toHidePass"></div>
          <span class="check" v-bind:class="(showLoadPass) ? 'loading': ''" v-if="showCheckPass">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Verify Password</p>
          <input v-bind:type="typeInputVPass" v-model="VPassword" v-on:change="changeVPass">
          <div  class="eye" v-bind:class="(putVMouse) ? 'active' : '' " v-on:mousedown="toShowVPass" v-on:mouseup="toHideVPass"></div>
          <span class="check" v-bind:class="(showLoadVPass) ? 'loading': ''" v-if="showCheckVPass">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
        </label>
        <label class="pointer2">

          <input type="checkbox" v-model="remember">
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span>Remember me</span></label>
        <div class="firstPage pc">
          <button v-on:click.prevent="send">SING UP</button>
        </div>
      </form>
    </div>
    <div class="row sm">
      <div class="firstPage">
        <button v-on:click.prevent="send">SING UP</button>
      </div>
    </div>
  </div>

</template>

<script>


    export default {
        props: ['lang'],
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
                showCheckPass: false,
                showLoadPass: true,
                showCheckVPass: false,
                showLoadVPass: true,

                googleSignInParams: {
                    client_id: '55026088655-3uc8o6t7gp4iu24seftuno6k3r6gi5qc.apps.googleusercontent.com'
                }
            }
        },
        computed: {
          body: function () {
              return{
                  Email: this.Email,
                  Password: this.Password,
                  //IpAddress: this.IpAddress,
                  //SessionData: this.SessionData,
                  Localization: this.lang
              }
          }
        },
        methods:{
            bodyToken(token){
                return {
                    Token: token,
                }
            },
            onSignInSuccess (googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                //console.log(googleUser.Zi.access_token);
                //console.log(googleUser.getBasicProfile());
                let t = this;
                if(googleUser.Zi.access_token){
                    $.post( '/api/Account/GoogleOAuthResponse',  t.bodyToken(googleUser.Zi.access_token)  )
                        .done(function( data ){
                            //console.log("done Google" );
                            //console.log(data);
                            if(data.ErrorCode==1){
                                //t.toQuestion(this.themeActive);
                                t.SessionData = data.SessionString;
                                setCookie('SessionData', data.SessionString, {
                                    expires: 10000*10000,
                                    path: '/'
                                });
                                let temp = {
                                    UserId: data.UserId,
                                    SessionString: data.SessionString,
                                    remember:tempthis.remember
                                };
                                t.$emit('logined', temp);
                            }else{
                                //console.log("error from server" );
                            }
                        })
                        .fail(function() {
                            //console.log("error" );
                        });
                }

            },
            onSignInError (error) {
                // `error` contains any error occurred.
                //console.log('OH NOES', error)
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
                                    //console.log("done Facebook" );
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
                                       // console.log("error from server" );
                                    }
                                })
                                .fail(function() {
                                    //console.log("error" );
                                });

                        }
                    },
                    {
                        scope: 'public_profile',
                    }
                );
            },
            /*send(){
                let t = this;
                $.post( '/api/Account/Register',  this.body  )
                    .done(function( data ){
                        console.log(data);
                        if(data.ErrorCode==1 || data.UserId != null){
                            let temp = {
                                UserId: data.UserId,
                                SessionString: data.SessionString
                            };
                            t.$emit('onLicense');
                        }
                    });
            },*/
            send(){
                let t = this;
                //console.log('LOGIN');
                let p = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(this.Password);
                let e = /^\w+@\w+\.\w{2,4}$/i.test(this.Email);
                if(p && e && true){
                    $.post( '/api/Account/Register',  this.body  )
                        .done(function( data ){
                           // console.log('success');
                            //console.log(data);

                        })
                        .fail(function() {
                            //console.log("error" );
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
                //console.log(t);
                this.showCheckEmail = true;
                this.showLoadEmail =true;
                setTimeout( function () {
                    t.showLoadEmail = false;
                    var r = /^\w+@\w+\.\w{2,4}$/i;
                    if (!r.test(t.Email)){
                        t.showCheckEmail = false;
                    }
                }, 1500);
            },
            changePass(){
                let t = this;
                //console.log(t);
                this.showCheckPass = true;
                this.showLoadPass =true;
                setTimeout( function () {
                    t.showLoadPass = false;
                    var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
                    if (!r.test(t.Password)){
                        t.showCheckPass = false;
                    }
                }, 1500);
            },
            changeVPass(){
                let t = this;
                //console.log(t);
                this.showCheckVPass = true;
                this.showLoadVPass =true;
                setTimeout( function () {
                    t.showLoadVPass = false;
                    var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
                    if (!r.test(t.VPassword) || t.VPassword!=t.Password){
                        t.showCheckVPass = false;
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

</style>
