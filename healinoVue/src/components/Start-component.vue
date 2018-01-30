<template>

  <div class="container firstPageContainer">
    <div class="row">
      <div class="logo">
        <img src="static/img/logo.png" alt="">
      </div>
    </div>
    <div class="row">
      <div class="langs">
        <div class="lang"
             v-bind:class="[(lang == 'pl') ? 'active' : '']"
             v-on:click="$emit('changeLang','pl')">
          <img src="static/img/langPl.png" alt="">
          <p>PL</p>
        </div>
        <div class="lang"
             v-bind:class="[(lang == 'en') ? 'active' : '']"
             v-on:click="$emit('changeLang', 'en')">
          <img src="static/img/langUSA.png" alt="">
          <p>US</p>
        </div>
        <div class="lang"
             v-bind:class="[(lang == 'ru') ? 'active' : '']"
             v-on:click="$emit('changeLang', 'ru')">
          <img src="static/img/langUA.png" alt="">
          <p>UA</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="firstPage pc_sm">
        <button  v-on:click.prevent="$emit('onRegister')"
                 v-if="!SessionData">SING IN</button>
        <button  v-on:click.prevent="$emit('onLogin')"
                 v-if="!SessionData">LOGIN</button>
        <button  v-on:click.prevent="$emit('onUser')"
                 v-if="SessionData">START</button>

      </div>
    </div>

  </div>

</template>

<script>
    export default {
        props: ['SessionData', 'lang'],
        data () {
            return {


            }
        },
        computed: {

        },
        created: function() {

        },
        methods: {
            /*changeLang: function (newLang) {
                this.$emit = newLang;
            }*/
        }
    }
</script>

<style>

</style>
