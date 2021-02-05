import Vue from 'vue';

const store = Vue.observable({
  data: null,
});

const storeMutations = {
  setData(value) {
    store.data = value;
  },
};

export { store, storeMutations };
