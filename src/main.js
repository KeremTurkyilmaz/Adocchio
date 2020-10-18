import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/styles/main.scss';

Vue.config.productionTip = true;
Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
