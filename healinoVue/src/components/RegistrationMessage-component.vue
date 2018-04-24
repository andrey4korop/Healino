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
    import Vue from 'vue'
    export default {
        props: [],
        data () {
            return {

            }
        },
        messages: {
            en: {
                h4:'Registration completed successfully',
                m1: 'Check your email inbox and click the Activation  button in the email',
              button:'Home',
            },
            ru: {
                h4:'Регистрация прошла успешно',
                m1: 'Проверьте свой почтовый ящик и нажмите кнопку активации в письме',
              button:'Главная',
            },
            pl: {
                h4:'Rejestracja przebiegła pomyślnie',
                m1: 'Sprawdź swoją skrzynkę pocztową i kliknij przycisk aktywacji w wiadomości e-mail',
              button:'Strona główna',
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
  h4{
    text-align: center;
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
