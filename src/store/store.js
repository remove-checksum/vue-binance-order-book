import Vue from 'vue';

const store = Vue.observable({
  data: null,
});

const storeMutations = {
  setData(value) {
    store.data = value;
  },
  getData() {
    return store.data;
  },
};

export { store, storeMutations };
