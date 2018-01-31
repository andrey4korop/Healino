<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <button class="btn_social facebook" v-on:click.prevent="FacebookLogin">
          <img src="static/img/facebook.png" alt=""> Login with Facebook
        </button>
        <button class="btn_social google">
          <img src="static/img/google-plus.png" alt="">Login with Google
        </button>
        <h5>or</h5>
        <label>
          <p><span>*</span>Email</p>
          <input type="email" v-model="Email" v-on:change="changeEmail">

          <span class="check" v-bind:class="(showLoadEmail) ? 'loading': ''" v-if="showCheckEmail">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(errorEmail) ? 'error' : ''" v-if="errorEmail">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Password</p>
          <input v-bind:type="typeInputPass" v-model="Password" v-on:change="changePass">
          <div  class="eye" v-bind:class="(putMouse) ? 'active' : '' " v-on:mousedown="toShowPass" v-on:mouseup="toHidePass"></div>
          <span class="check" v-bind:class="(showLoadPass) ? 'loading': ''" v-if="showCheckPass">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(errorPass) ? 'error' : ''" v-if="errorPass">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label class="pointer">
          <p>Forgot password?</p>
          <input type="checkbox" v-model="remember">
          <span class="checkbox">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span>Remember me</span></label>
        <div class="firstPage  pc">
          <button v-on:click.prevent="send">LOGIN</button>
        </div>
      </form>
      <div class="row sm">
        <div class="firstPage">
          <button v-on:click.prevent="send">LOGIN</button>
        </div>
      </div>
    </div>
  </div>

</template>
if (!r.test(document.forma.email.value) {
//Код, если неверный e-mail
}
<script>
    export default {
        props: ['lang', 'SessionData'],
        data () {
            return {
                Email: "onisniko@gmail.com",
                Password: "Asdfgh123",
                IpAddress: "",

                remember: true,
                typeInputPass:"password",
                putMouse:false,

                showCheckEmail: false,
                showLoadEmail: true,
                errorEmail: false,
                showCheckPass: false,
                showLoadPass: true,
                errorPass: false
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
            bodyToken(token){
                return {
                    Token: token,
                }
            },
            FacebookLogin(){
                var t = this;
                FB.login(
                    function(response) {
                        if (response.status === 'connected') {
                            var accessToken = response.authResponse.accessToken;
                              var tempthis = t;
                            $.post( 'http://healino-api.azurewebsites.net/api/Account/FacebookOAuthResponse',  tempthis.bodyToken(accessToken)  )
                                .done(function( data ){
                                    console.log("done Facebook" );
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
                                            remember:tempthis.remember
                                        };
                                        tempthis.$emit('logined', temp);
                                    }else{
                                        console.log("error from server" );
                                    }
                                })
                                .fail(function() {
                                    console.log("error" );
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
                console.log('LOGIN');
                let p = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(this.Password);
                let e = /^\w+@\w+\.\w{2,4}$/i.test(this.Email);
                if(p && e && true){
                  $.post( 'http://healino-api.azurewebsites.net/api/Account/Login',  this.body  )
                  .done(function( data ){
                      console.log('success');
                      console.log(data);
                      if(data.ErrorCode==1 || data.UserId != 0){
                          let temp = {
                              UserId: data.UserId,
                              SessionString: data.SessionString,
                              remember:t.remember
                          };
                          t.$emit('logined', temp);
                      }else if(data.ErrorCode==5 || data.DebagMessage=="User not found. User name or password are not corect"){
                          t.showCheckPass = false;
                          t.errorPass = true;
                      }
                  })
                  .fail(function() {
                      console.log("error" );
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
                console.log(t);
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
                console.log(t);
                this.showCheckPass = true;
                this.showLoadPass =true;
                t.errorPass = false;
                setTimeout( function () {
                    t.showLoadPass = false;
                    var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
                    if (!r.test(t.Password)){
                        t.showCheckPass = false;
                    }
                }, 1500);
            }
        }
    }

</script>

<style>

</style>
