<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <h4 v-lang.title></h4>
        <label>
          <p><span>*</span>{{langString('password')}}</p>
          <input v-bind:type="typeInputPass" v-model="Password" v-on:change="changePass">
          <div  class="eye" v-bind:class="(putMouse) ? 'active' : '' "
                v-on:mousedown="toShowPass"
                v-on:touchstart="toShowPass"
                v-on:mouseup="toHidePass"
                v-on:touchend="toHidePass"></div>
          <span class="check" v-bind:class="(showLoadPass) ? 'loading': ''" v-if="showCheckPass">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>{{langString('verPass')}}</p>
          <input v-bind:type="typeInputVPass" v-model="VPassword" v-on:change="changeVPass">
          <div  class="eye" v-bind:class="(putVMouse) ? 'active' : '' "
                v-on:mousedown="toShowVPass"
                v-on:touchstart="toShowVPass"
                v-on:mouseup="toHideVPass"
                v-on:touchend="toHideVPass"></div>
          <span class="check" v-bind:class="(showLoadVPass) ? 'loading': ''" v-if="showCheckVPass">
            <i class="fa fa-check" aria-hidden="true"></i>
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
        props: ['UniqId', 'audio_p'],
        data () {
            return {
                Password: "",
                VPassword: "",

                typeInputPass:"password",
                typeInputVPass:"password",
                putMouse:false,
                putVMouse:false,

                showCheckPass: false,
                showLoadPass: true,
                showCheckVPass: false,
                showLoadVPass: true,

            }
        },
        messages: {
            en: {
                password:'Password',
                verPass:'Verify Password',
                forgotPass:'Forgot your password?',
                login: 'SET NEW PASSWORD',
                title:'Password recovery',
            },
            ru: {
                password:'Пароль',
                verPass:'Подтвердите пароль',
                forgotPass:'Забыл пароль?',
                login: 'УСТАНОВИТЬ НОВЫЙ ПАРОЛЬ',
                title:'Восстановление пароля',
            },
            pl: {
                password:'Hasło',
                verPass:'Potwierdź hasło',
                forgotPass:'Zapomniałeś hasła?',
                login: 'USTAW NOWE HASŁO',
                title:'Odzyskiwanie hasła',
            }
        },
        computed: {
            body: function () {
                return{
                    Password: this.Password,
                    UniqId: this.UniqId,
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

            send(){
                let t = this;
                let p = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(this.Password);
                let p2 = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(this.VPassword);
                if((this.VPassword == this.Password) && p && p2 && true){
                    $.post( '/api/Account/RecoveryPasswordConfirmation',  this.body  )
                        .done(function( data ){
                           if(data.ErrorCode == 1){
                               t.$emit('onLogin');
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

            changePass(){
                let t = this;
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
  .music_btn{
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
  .login .firstPage{
    width: 90%;
  }
  @media screen and (max-width: 960px){
    .firstPage button {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 760px){
    .firstPage button {
      font-size: 16px;
    }
  }
</style>
