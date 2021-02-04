import Vue from 'vue';
import VueRouter from 'vue-router';
import Table from '../views/Table.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Table',
    component: Table,
  },
  {
    path: '/symbols',
    name: 'Symbols',
    component: () => import(/* webpackChunkName: "symbols" */ '../views/Symbols.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
