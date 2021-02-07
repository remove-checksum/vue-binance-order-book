import Vue from 'vue';
import App from './App.vue';
import router from './router';
import EventBus from './plugins/eventBus';
import BinanceSDK from './plugins/binanceSdk';
import HelpCore from './helpCore';
import { store, mutations } from './store/store';

window.helpCore = new HelpCore();
window.helpCore.register(EventBus);
window.helpCore.register(BinanceSDK);

Vue.prototype.$store = store;
Vue.prototype.$mutations = mutations;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
