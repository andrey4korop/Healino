import Vue from 'vue'
import App from './App.vue'
/**
 * загрузка главных страниц
 */
import rezultComponent  from './components/Rezult-component.vue'
import startComponent  from './components/Start-component.vue'
import loginComponent  from './components/Login-component.vue'
import registerComponent  from './components/Register-component.vue'
import licenseComponent  from './components/License-component.vue'
import userComponent  from './components/User-component.vue'
import themeComponent  from './components/Theme-component.vue'
import questionComponent  from './components/Question-component.vue'
/**
 * загрущка малых компонентов
 * индикаторов
 */
import indicatorBF  from './components/indicatorBF.vue'
import indicatorBMR  from './components/indicatorBMR.vue'
import indicatorLMP  from './components/indicatorLMP.vue'
import indicatorWHR  from './components/indicatorWHR.vue'
import indicator1  from './components/indicator1.vue'
import indicator2  from './components/indicator2.vue'
import indicatorRealAge  from './components/indicator-real-age.vue'
import indicatorCronologiAge  from './components/indicator-Chronologi-age.vue'
import indicatorMentalAge  from './components/indicator-Mental-age.vue'
import indicatorCVD5  from './components/indicator-CVD5.vue'
import indicatorCVD15  from './components/indicator-CVD15.vue'
import indicatorCVD10  from './components/indicator-CVD10.vue'
import questionType0  from './components/questionType0.vue'
import questionType1  from './components/questionType1.vue'
import questionType2  from './components/questionType2.vue'
import background  from './components/background.vue'
import bg1  from './components/bg1.vue'
import bg2  from './components/bg2.vue'
import bg3  from './components/bg3.vue'
import bg4  from './components/bg4.vue'
import bg5  from './components/bg5.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
/**
 * загрузка главных страниц
 */
Vue.component('rezult-component', rezultComponent);
Vue.component('start-component', startComponent);
Vue.component('login-component', loginComponent);
Vue.component('register-component', registerComponent);
Vue.component('license-component', licenseComponent);
Vue.component('user-component', userComponent);
Vue.component('theme-component', themeComponent);
Vue.component('question-component', questionComponent);
/**
 * загрущка малых компонентов
 * индикаторов
 */
Vue.component('indicator1', indicator1);
Vue.component('indicatorBF', indicatorBF);
Vue.component('indicatorBMR', indicatorBMR);
Vue.component('indicatorLMP', indicatorLMP);
Vue.component('indicatorWHR', indicatorWHR);
Vue.component('indicator2', indicator2);
Vue.component('indicator-real-age', indicatorRealAge);
Vue.component('indicator-Chronologi-age', indicatorCronologiAge);
Vue.component('indicator-Mental-age', indicatorMentalAge);
Vue.component('indicator-CVD5', indicatorCVD5);
Vue.component('indicator-CVD15', indicatorCVD15);
Vue.component('indicator-CVD10', indicatorCVD10);
Vue.component('questionType0', questionType0);
Vue.component('questionType1', questionType1);
Vue.component('questionType2', questionType2);
Vue.component('background', background);
Vue.component('bg1', bg1);
Vue.component('bg2', bg2);
Vue.component('bg3', bg3);
Vue.component('bg4', bg4);
Vue.component('bg5', bg5);

new Vue({
  el: '#app',
  render: h => h(App)
});/*
new Vue({
    el: '#app2',
    render: h => h(App2)
})*/

