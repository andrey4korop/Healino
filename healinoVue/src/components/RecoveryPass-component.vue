<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">

        <h4 v-lang.title></h4>
        <label>
          <p><span>*</span>{{langString('email')}}</p>
          <input type="email" v-model="Email" v-on:change="changeEmail">

          <span class="check" v-bind:class="(showLoadEmail) ? 'loading': ''" v-if="showCheckEmail">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(errorEmail) ? 'error' : ''" v-if="errorEmail">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <div class="description" v-bind:class="(errorEmail)?'on':''">
            <div class="text" v-lang.errorEmail></div>
          </div>
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
                title:'Password recovery',
                login: 'RESTORE',
                errorEmail:"No account with this email was found",
            },
            ru: {

                email:'E-mail',
                title:'Восстановление пароля',
                login: 'ВОССТАНОВИТЬ',
                errorEmail:"Пользователя с таким Email не найден",
            },
            pl: {
                email:'E-mail',
                title:'Odzyskiwanie hasła',
                login: 'PRZYWRACAĆ',
                errorEmail:"Nie znaleziono konta z tym e-mailem",
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
                let e = /^\w+@\w+\.\w{2,4}$/i.test(this.Email);

                if(e && true){
                  $.post( '/api/Account/RecoverPassword',  this.body  )
                  .done(function( data ){
                      if(data.ErrorCode==1){

                          t.$emit('onForgotMessage');
                      }else if(data.ErrorCode==5 || data.DebagMessage=="User not found. User name or password are not corect"){
                          t.showCheckEmail = false;
                          t.errorEmail = true;
                      }
                  })
                  .fail(function() {
                  });
                }
            },

            changeEmail(){
                let t = this;
                this.showCheckEmail = true;
                this.showLoadEmail =true;
                this.errorEmail=false;
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

<style scoped>
  .music_btn{
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>
