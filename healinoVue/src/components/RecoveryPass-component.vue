<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">

        <h4> Password recovery</h4>
        <label>
          <p><span>*</span>{{langString('email')}}</p>
          <input type="email" v-model="Email" v-on:change="changeEmail">

          <span class="check" v-bind:class="(showLoadEmail) ? 'loading': ''" v-if="showCheckEmail">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(errorEmail) ? 'error' : ''" v-if="errorEmail">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>


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


                showCheckEmail: false,
                showLoadEmail: true,
                errorEmail: false,

            }
        },
        messages: {
            en: {
                email:'E-mail',

                login: 'RESTORE',

            },
            ru: {

                email:'E-mail',

                login: 'ВОССТАНОВИТЬ',

            },
            pl: {
                email:'E-mail',
                login: 'PRZYWRACAĆ',

            }
        },
        computed: {
            body: function () {
                return{
                    Email: this.Email,

                }
            },


        },
        created: function() {

        },
        methods:{
            langString(string){
                return this.translate(string);
            },


            send(){

                let t = this;
                //console.log('LOGIN');
                let e = /^\w+@\w+\.\w{2,4}$/i.test(this.Email);

                if(e && true){
                  $.post( '/api/Account/RecoverPassword',  this.body  )
                  .done(function( data ){
                      //console.log('success');
                      //console.log(data);
                      if(data.ErrorCode==1){

                          t.$emit('onForgotMessage');
                      }else if(data.ErrorCode==5 || data.DebagMessage=="User not found. User name or password are not corect"){
                          t.showCheckEmail = false;
                          t.errorEmail = true;
                      }
                  })
                  .fail(function() {
                      //console.log("error" );
                  });
                }
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

        }
    }

</script>

<style>
  .music_btn{
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>
