import Vue from 'vue'
import App from './App.vue'
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
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
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

new Vue({
  el: '#app',
  render: h => h(App)
});/*
new Vue({
    el: '#app2',
    render: h => h(App2)
})*/

