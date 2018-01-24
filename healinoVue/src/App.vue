<template>
  <div id="app">
    <!--<div class="p layer1"></div>
    <div class="p layer2"></div>
    <div class="p layer3"></div>
    <div class="p layer4"></div>
    <div class="p layer5"></div>
    <div class="p layer6"></div>
    <div class="p layer7"></div>
    <div class="p layer8"></div>-->
    <start-component v-if="state == 'start'"></start-component>
    <login-component v-if="state == 'login'"></login-component>
    <register-component v-if="state == 'register'"></register-component>
    <license-component v-if="state == 'license'"></license-component>
    <user-component v-if="state == 'user'"></user-component>
    <theme-component v-if="state == 'theme'"></theme-component>
    <question-component v-if="state == 'question'"></question-component>

    <rezult-component v-else-if="state == 'rezult'"></rezult-component>
  </div>
</template>

<script>
export default {
  name: 'app',
   data () {
    return {
        state: 'start'

    }
  },
    computed: {

    },
  created: function() {

    }
}
</script>

<style>

</style>
