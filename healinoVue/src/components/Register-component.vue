<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <button class="btn_social facebook">
          <img src="static/img/facebook.png" alt="">Sign Up with Facebook
        </button>
        <button class="btn_social google">
          <img src="static/img/google-plus.png" alt="">Sign Up with Google
        </button>
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

          <input type="checkbox">
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span>Remember me</span></label>
        <div class="firstPage">
          <button v-on:click.prevent="send">SING UP</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>


    export default {
        props: ['lang'],
        data () {
            return {
                Email: "onisniko@gmail.com",
                Password: "Asdfgh123",
                VPassword: "Asdfgh123",

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


            }
        },
        computed: {
          body: function () {
              return{
                  Email: this.email,
                  Password: this.password,
                  //IpAddress: this.IpAddress,
                  //SessionData: this.SessionData,
                  Localization: this.lang
              }
          }
        },
        methods:{
            send(){
                let t = this;
                $.post( 'http://healino-api.azurewebsites.net/api/Account/Register',  this.body  )
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
                console.log(t);
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
