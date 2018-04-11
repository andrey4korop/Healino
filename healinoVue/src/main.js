import Vue from 'vue'
import App from './App.vue'
/**
 * загрузка главных страниц
 */
//import es6Promise from 'es6-promise'
import MultiLanguage from 'vue-multilanguage'

import rezultComponent  from './components/Rezult-component.vue'
import rezultPublicComponent  from './components/RezultPublic-component.vue'
import startComponent  from './components/Start-component.vue'
import loginComponent  from './components/Login-component.vue'
import recoveryPassComponent  from './components/RecoveryPass-component.vue'
import recoveryPassMessageComponent  from './components/RecoveryPassMessage-component.vue'
import registrationMessageComponent  from './components/RegistrationMessage-component.vue'
import recPassComponent  from './components/RecPass-component.vue'
import registerComponent  from './components/Register-component.vue'
import licenseComponent  from './components/License-component.vue'
import userComponent  from './components/User-component.vue'
import themeComponent  from './components/Theme-component.vue'
import questionComponent  from './components/Question-component.vue'
import payComponent  from './components/Pay-component.vue'
/**
 * загрущка малых компонентов
 * индикаторов
 */
import indicatorBF  from './components/indicatorBF.vue'
import indicatorLMP  from './components/indicatorLMP.vue'
import indicatorWHR  from './components/indicatorWHR.vue'
import indicatorBMI  from './components/indicatorBMI.vue'
import indicator1  from './components/indicator1.vue'
import indicator2  from './components/indicator2.vue'
import indicatorRealAge  from './components/indicator-real-age.vue'
import indicatorCronologiAge  from './components/indicator-Chronologi-age.vue'
import indicatorMentalAge  from './components/indicator-Mental-age.vue'
import indicatorCVD5  from './components/indicator-CVD5.vue'
import indicatorCVD15  from './components/indicator-CVD15.vue'
import indicatorCVD10  from './components/indicator-CVD10.vue'
import indicatorAvatar  from './components/indicatorAvatar.vue'

import questionType0  from './components/questionType0.vue'
import questionType1  from './components/questionType1.vue'
import questionType2  from './components/questionType2.vue'
import background  from './components/background.vue'
import bg  from './components/bg.vue'

Vue.use(MultiLanguage, {
    default: 'en',
    en: {},
    ru: {},
    pl: {}
})

import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
/**
 * загрузка главных страниц
 */
//es6Promise.polyfill()
Vue.component('rezult-component', rezultComponent);
Vue.component('rezultPublic-component', rezultPublicComponent);
Vue.component('start-component', startComponent);
Vue.component('login-component', loginComponent);
Vue.component('recoveryPassComponent', recoveryPassComponent);
Vue.component('recoveryPassMessageComponent', recoveryPassMessageComponent);
Vue.component('registrationMessageComponent', registrationMessageComponent);
Vue.component('recPassComponent', recPassComponent);
Vue.component('register-component', registerComponent);
Vue.component('license-component', licenseComponent);
Vue.component('user-component', userComponent);
Vue.component('theme-component', themeComponent);
Vue.component('question-component', questionComponent);
Vue.component('pay-component', payComponent);
/**
 * загрущка малых компонентов
 * индикаторов
 */
Vue.component('indicator1', indicator1);
Vue.component('indicatorBF', indicatorBF);
Vue.component('indicatorLMP', indicatorLMP);
Vue.component('indicatorWHR', indicatorWHR);
Vue.component('indicatorBMI', indicatorBMI);
Vue.component('indicator2', indicator2);
Vue.component('indicator-real-age', indicatorRealAge);
Vue.component('indicator-Chronologi-age', indicatorCronologiAge);
Vue.component('indicator-Mental-age', indicatorMentalAge);
Vue.component('indicator-CVD5', indicatorCVD5);
Vue.component('indicator-CVD15', indicatorCVD15);
Vue.component('indicator-CVD10', indicatorCVD10);
Vue.component('indicatorAvatar', indicatorAvatar);



Vue.component('questionType0', questionType0);
Vue.component('questionType1', questionType1);
Vue.component('questionType2', questionType2);
Vue.component('background', background);
Vue.component('bg', bg);

new Vue({
  el: '#app',
  render: h => h(App)
});
