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
        <label><p><span>*</span>Email</p>
          <input type="email" name="Email" v-model="email">
        </label>
        <label>
          <p><span>*</span>Password</p>
          <input type="password" v-model="password">
          <img src="static/img/eye_g.png" class="eye" alt="">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Verify Password</p>
          <input type="password">
          <img src="static/img/eye_grey.png" class="eye" alt="">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
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
                email:"andrey999@i.ua",
                password:"Asdfgh123",
                //IpAddress:"192.168.1.106",
                //SessionData:"dsjkfhkjsdhfjksh",
                //Localization:"UA"


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
            }
        },
        created: function() {

        }
    }
</script>

<style>

</style>
