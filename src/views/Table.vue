<template>
  <div>
    <table class="table">
      <thead class="table__heading">
        <th class="table__head">
          Amount
        </th>
        <th class="table__head">
          Price
        </th>
        <th class="table__head">
          Total
        </th>
      </thead>
      <tbody>
        <tr>
          <td>Slot1</td>
          <td>Slot2</td>
          <td>Slot3</td>
        </tr>
      </tbody>
    </table>
    <button @click="handleSnapshot">SNAP</button>
  </div>
</template>

<script>

export default {
  name: 'Table',
  components: {
  },
  data() {
    return {
      orderBook: {

      },
    };
  },
  methods: {
    handleSnapshot() {
      helpCore.plugins.EventBus.$emit('TEST TEST');
      helpCore.plugins.BinanceSDK.fetchSnapshot('ETHBTC', 100).then((res) => console.log(res.data));

      // this.getOrderBookSnapshot().then((res) => {

      // });
      // this.getOrderBookSnapshot().then((res) => console.log('this is snapshot', res));
    },
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  td, th {
    border: 1px solid lightgray;
    padding: 0.5em;
  }
}
</style>
