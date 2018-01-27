<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <button class="btn_social facebook">
          <img src="static/img/facebook.png" alt=""> Login with Facebook
        </button>
        <button class="btn_social google">
          <img src="static/img/google-plus.png" alt="">Login with Google
        </button>
        <h5>or</h5>
        <label>
          <p><span>*</span>Email</p>
          <input type="email" v-model="Email">
        </label>
        <label>
          <p><span>*</span>Password</p>
          <input type="password" v-model="Password">
          <img src="static/img/eye_g.png" class="eye" alt="">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label class="pointer">
          <p>Forgot password?</p>
          <input type="checkbox">
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span>Remember me</span></label>
        <div class="firstPage">
          <button v-on:click.prevent="send">LOGIN</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
    export default {
        props: ['lang', 'SessionData'],
        data () {
            return {
                Email: "onisniko@gmail.com",
                Password: "Asdfgh123",
                IpAddress: "",
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

            send(){
                let t = this;
                $.post( 'http://healino-api.azurewebsites.net/api/Account/Login',  this.body  )
                .done(function( data ){
                    console.log(data);
                  if(data.ErrorCode==1 || data.UserId != 0){
                      let temp = {
                          UserId: data.UserId,
                          SessionString: data.SessionString
                      };

                      t.$emit('logined', temp);

                  }
                });
            }
        }
    }
</script>

<style>

</style>
