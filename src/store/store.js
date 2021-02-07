import Vue from 'vue';

const store = Vue.observable({
  data: null,
});

const mutations = {
  setData(value) {
    store.data = value;
  },
  getData() {
    return store.data;
  },
  getAmountAsks() {
    return store.data === null ? 'sorry, no data yet' : Object.keys(store.data.asks).length;
  },
  getAmountBids() {
    return store.data === null ? 'sorry, no data yet' : Object.keys(store.data.bids).length;
  },
  patchData(diff) {
    Object.keys(diff.asks).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(store.data.asks, key)) {
        if (diff.asks[key] === '0.00000000') {
          delete store.data.asks[key];
          store.data.asks[key] = diff.asks[key];
        } else {
          store.data.asks[key] = diff.asks[key];
        }
      }
    });
    Object.keys(diff.bids).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(store.data.bids, key)) {
        if (diff.bids[key] === '0.00000000') {
          delete store.data.bids[key];
        } else {
          store.data.bids[key] = diff.bids[key];
        }
      }
    });
  },
};

export { store, mutations };
