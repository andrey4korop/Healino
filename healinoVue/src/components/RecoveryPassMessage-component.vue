<template>
  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <h4 v-lang.h4></h4>
        <h3 v-lang.m1></h3>
      </form>
    </div>
    <div class="row">
      <button v-lang.button v-on:click="$emit('toStart')"></button>
    </div>
  </div>
</template>

<script>
    export default {
        props: [],
        data () {
            return {

            }
        },
        messages: {
            en: {
                h4:'Password recovery',
                m1: 'Check your email inbox and click the Recovery button in the email',
                button:'Home',
            },
            ru: {
                h4: 'Восстановление пароля',
                m1: 'Проверьте свой почтовый ящик и нажмите кнопку восстановления в письме',
              button:'Главная',
            },
            pl: {
                h4: 'Odzyskiwanie hasła',
                m1: 'Sprawdź swoją skrzynkę odbiorczą i kliknij przycisk odzyskiwania w wiadomości e-mail',
              button:'Strona główna',
            }
        },
        methods:{
            langString(string){
                return this.translate(string);
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
  h3{
    width: 90%;
  }
  button {
    margin-top:15px;
    height: 45px;
    padding-right: 30px;
    padding-left: 30px;
    border-radius: 25px;
    background: #ff8304;
    border: none;
    color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    box-shadow: 0 3px 20px 1px rgba(0, 0, 0, 0.3);
  }
  button:active {
     outline: none;
     color: #fff;
     background: #ff9021;
     box-shadow: 0 3px 20px 1px rgba(0, 0, 0, 0.5);
   }
  button:focus, button:hover{
   outline: none;
   color: #fff;
   box-shadow: 0 3px 20px 1px rgba(0, 0, 0, 0.5);
 }
</style>
