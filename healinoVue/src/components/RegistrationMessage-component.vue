<template>
  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <h4 v-lang.h4></h4>
        <h3 v-lang.m1></h3>
        <h3 v-lang.m2></h3>
      </form>
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
                m1: 'Check your email inbox and click the',
                m2: 'Activation  button in the email',
            },
            ru: {
                h4:'Регистрация прошла успешно',
                m1: 'Проверьте свой почтовый ящик и нажмите',
                m2: 'кнопку активации в письме',
            },
            pl: {
                h4:'Rejestracja przebiegła pomyślnie',
                m1: 'Sprawdź swoją skrzynkę pocztową i kliknij',
                m2: 'przycisk aktywacji w wiadomości e-mail',
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
</style>
