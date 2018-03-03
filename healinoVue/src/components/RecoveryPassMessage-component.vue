<template>
  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <h4 v-lang.h4></h4>
        <h3 v-lang.m1> Check your email inbox and click the</h3>
        <h3 v-lang.m2>активатион button in the email</h3>
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
                h4:'Password recovery',
                m1: 'Check your email inbox and click the',
                m2: 'Recovery button in the email',

            },
            ru: {
                h4: 'Восстановление пароля',
                m1: 'Проверьте свой почтовый ящик и нажмите',
                m2: 'кнопку восстановления в письме',
            },
            pl: {
                h4: 'Odzyskiwanie hasła',
                m1: 'Sprawdź swoją skrzynkę odbiorczą i kliknij',
                m2: 'przycisk odzyskiwania w wiadomości e-mail',
            }
        },
        methods:{
            langString(string){
                return this.translate(string);
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
