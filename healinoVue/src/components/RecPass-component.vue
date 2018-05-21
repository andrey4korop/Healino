<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login" ref="wind">
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
          <span class="check" v-bind:class="(showErrorPass) ? 'error' : ''" v-if="showErrorPass">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <transition name="fade">
            <div class="descriptionLogin" v-if="showErrorPass">
              <div class="text" v-lang.errorTextPass></div>
            </div>
          </transition>
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
          <span class="check" v-bind:class="(showErrorVPass) ? 'error' : ''" v-if="showErrorVPass">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <transition name="fade">
            <div class="descriptionLogin" v-if="showErrorVPass">
              <div class="text" v-html="ErrorVPass"></div>
            </div>
          </transition>
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
    <back_btn :callback="onToStart"></back_btn>
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
                showErrorPass: false,
                showCheckVPass: false,
                showLoadVPass: true,
                showErrorVPass: false,
              ErrorVPass:"",
              touchstartX:0,
              touchendX:0,
            }
        },
        messages: {
            en: {
                password:'Password',
                verPass:'Verify Password',
                forgotPass:'Forgot your password?',
                login: 'SET NEW PASSWORD',
                title:'Password recovery',
              errorTextPass:
              "Password must be at least 8 characters<br>" +
              "The presence of at least 1 capital letter<br>" +
              "The presence of at least 1 digits",
              errorTextVPass:"Passwords must match",
            },
            ru: {
                password:'Пароль',
                verPass:'Подтвердите пароль',
                forgotPass:'Забыл пароль?',
                login: 'УСТАНОВИТЬ НОВЫЙ ПАРОЛЬ',
                title:'Восстановление пароля',
              errorTextPass:"Пароль должен быть не менее 8 символов<br>" +
              "Наличие не менее 1 большой буквы<br>" +
              "Наличие не менее 1 цифры",
              errorTextVPass:"Пароли должны совпадать",
            },
            pl: {
                password:'Hasło',
                verPass:'Potwierdź hasło',
                forgotPass:'Zapomniałeś hasła?',
                login: 'USTAW NOWE HASŁO',
                title:'Odzyskiwanie hasła',
              errorTextPass:
              "Hasło musi mieć co najmniej 8 znaków<br>" +
              "Obecność co najmniej 1 wielkiej litery<br>" +
              "Obecność co najmniej 1 cyfry",
              errorTextVPass:"Hasło musi pasować",
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
      mounted(){
        let t = this;
        $(document).on('touchstart', function(event) {
          t.touchstartX = event.originalEvent.touches[0].screenX;
        });
        $(document).on('touchend', function(event) {
          t.touchendX = event.originalEvent.changedTouches[0].screenX;
          if((Math.abs(t.touchendX-t.touchstartX)>100)){
            if (t.touchendX > t.touchstartX) {
              t.$emit('onToStart');
            }
          }
        });
        this.$nextTick(function() {
          window.addEventListener('resize', this.getWindowHeight);
          this.getWindowHeight();
        })
      },
      destroyed(){
        $(document).unbind('touchstart');
        $(document).unbind('touchend');
        window.removeEventListener('resize', this.getWindowHeight);
        $(this.$refs.wind).css({transform: ''});
        $('body').css({overflow: ''});
      },
        methods:{
            langString(string){
                return this.translate(string);
            },
          onToStart(){
            this.$emit('onToStart');
          },
          getWindowHeight(event) {
            let heigth = document.documentElement.clientHeight;
            if(heigth > 1080){
              let scale = Math.round(parseFloat(heigth / 900)*10)/10;
              $(this.$refs.wind).css({transform: 'scale('+scale+')'});
              $('body').css({overflow: 'hidden'});
            }else{
              $(this.$refs.wind).css({transform: ''});
              $('body').css({overflow: ''});
            }
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
                }else{
                  var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
                  if (!r.test(this.Password)){
                    this.showErrorPass =true;
                  }
                  if(!r.test(this.VPassword)){
                    this.showErrorVPass =true;
                    if(this.VPassword!=this.Password){
                      this.ErrorVPass = this.langString('errorTextVPass');
                    }else{
                      this.ErrorVPass = this.langString('errorTextPass');
                    }
                  }
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
                      if(t.VPassword!=t.Password){
                        t.ErrorVPass = t.langString('errorTextVPass');
                      }else{
                        t.ErrorVPass = t.langString('errorTextPass');
                    }
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

<style scoped>
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
  .descriptionLogin{
    background: rgba(255,0,0,0.2);
    position: absolute;
    left: 0;
    top: 74%;
    width: 100%;
    text-align: left;
    border-radius: 15px 0 15px 15px;
    padding: 4px;
    z-index: 10;
    opacity: 1;
    transition: all 0.5s linear;
  }
  .descriptionLogin .text{
    border-radius: 15px 0 15px 15px;
    max-height: 109px;
    padding: 3px;
    background: rgba(255,255,255,0.7);
    color: #585858;
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
