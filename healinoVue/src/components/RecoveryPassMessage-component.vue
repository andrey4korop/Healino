<template>
  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <h4 v-lang.h4></h4>
        <h3 v-lang.m1></h3>
      </form>
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

            },
            ru: {
                h4: 'Восстановление пароля',
                m1: 'Проверьте свой почтовый ящик и нажмите кнопку восстановления в письме',
            },
            pl: {
                h4: 'Odzyskiwanie hasła',
                m1: 'Sprawdź swoją skrzynkę odbiorczą i kliknij przycisk odzyskiwania w wiadomości e-mail',
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
  h3{
    width: 90%;
  }
</style>
