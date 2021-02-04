import Vue from 'vue';
import App from './App.vue';
import router from './router';
import EventBus from './plugins/eventBus';
import BinanceSDK from './plugins/binanceSdk';
import HelperCore from './helperCore';

// Vue.use(EventBus);
Vue.use(BinanceSDK);

window.helpCore = new HelperCore();
window.helpCore.register(EventBus);
window.helpCore.register(BinanceSDK);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
