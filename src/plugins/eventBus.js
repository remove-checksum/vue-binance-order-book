// export default function (Vue) {
//   const bus = new Vue();
//   Object.defineProperty(Vue.prototype, '$bus', {
//     get() {
//       return bus;
//     },
//   });
// }
import Vue from 'vue';

const bus = new Vue();

export default {
  name: 'EventBus',
  $bus: bus,
};
