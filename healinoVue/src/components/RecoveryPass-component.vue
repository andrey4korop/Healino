<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login"  ref="wind">

        <h4 v-lang.title></h4>
        <label>
          <p><span>*</span>{{langString('email')}}</p>
          <input type="email" v-model="Email" v-on:change="changeEmail" v-on:input="change">

          <span class="check" v-bind:class="(showLoadEmail) ? 'loading': ''" v-if="showCheckEmail">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(errorEmail) ? 'error' : ''" v-if="errorEmail">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <transition name="fade">
          <div class="descriptionLogin" v-if="errorEmail">
            <div class="text">{{erMess()}}</div>
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
    export default {
        props: ['lang', 'SessionData', 'audio_p'],
        data () {
            return {
                Email: "",
                showCheckEmail: false,
                showLoadEmail: true,
                errorEmail: false,
              touchstartX:0,
              touchendX:0,
            }
        },
        messages: {
            en: {
                email:'E-mail',
                title:'Password recovery',
                login: 'RESTORE',
                errorEmail:"No account with this email was found",
              errorTextEmail:"Not a valid E-mail",
            },
            ru: {

                email:'E-mail',
                title:'Восстановление пароля',
                login: 'ВОССТАНОВИТЬ',
                errorEmail:"Пользователя с таким Email не найден",
              errorTextEmail:"Не верный E-mail",
            },
            pl: {
                email:'E-mail',
                title:'Odzyskiwanie hasła',
                login: 'PRZYWRACAĆ',
                errorEmail:"Nie znaleziono konta z tym e-mailem",
              errorTextEmail:"Nieprawidłowy adres e-mail",
            }
        },
        computed: {

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
          erMess(){
            if(/^[a-zA-Z0-9_.-]+@\w+\.\w{2,4}$/i.test(this.Email)){
              return this.langString('errorEmail');
            }else{
              return this.langString('errorTextEmail');
            }
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
              let e = /^[a-zA-Z0-9_.-]+@\w+\.\w{2,4}$/i.test(this.Email);

                if(e && true){
                  $.post( '/api/Account/RecoverPassword', {Email: this.Email}  )
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
                }else{
                  t.showCheckEmail = false;
                  t.errorEmail = true;
                }
            },
            change(){
              this.showCheckEmail = false;
              this.showLoadEmail =false;
              this.errorEmail=false;
            },
            changeEmail(){
                let t = this;
                this.showCheckEmail = true;
                this.showLoadEmail =true;
                this.errorEmail=false;
                setTimeout( function () {
                    t.showLoadEmail = false;
                    var r =  /^[a-zA-Z0-9_.-]+@\w+\.\w{2,4}$/i;
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
  label{
    margin-bottom: 20px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
