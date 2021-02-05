import Vue from 'vue';
import App from './App.vue';
import router from './router';
import EventBus from './plugins/eventBus';
import BinanceSDK from './plugins/binanceSdk';
import HelperCore from './helperCore';
import { store, storeMutations } from './store/store';

window.helpCore = new HelperCore();
window.helpCore.register(EventBus);
window.helpCore.register(BinanceSDK);

Vue.prototype.$store = store;
Vue.prototype.$mutations = storeMutations;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
