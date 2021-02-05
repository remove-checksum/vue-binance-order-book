<template>
  <div>
    <div class="table__container">
      <div
        v-for="(orderBookValue, orderBookName, orderBookIndex) in orderBook"
        :key="orderBookIndex"
      >
        <table
          class="table"
        >
          <caption>{{ orderBookName.toUpperCase() }}</caption>
          <thead class="table__head">
            <tr>
              <th>Amount</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr
              v-for="(action, index) in orderBookValue"
              :key="index"
            >
              <td>{{ action[0] }}</td>
              <td>{{ action[1] }}</td>
              <td>{{ (action[0] * action[1]).toFixed(8) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
        bids: null,
        asks: null,
      },
    };
  },
  computed: {
  },
  mounted() {
    this.handleSnapshot();
  },
  methods: {
    handleSnapshot() {
      helpCore.plugin.BinanceSDK.fetchSnapshot('ETHBTC', 100).then((res) => {
        this.$store.data = res.data;
        this.orderBook.bids = this.$store.data.bids;
        this.orderBook.asks = this.$store.data.asks;
      });
    },
    capitalize([firstLetter, ...rest]) {
      return firstLetter.toUpperCase() + rest.join('').toLowerCase;
    },
  },
};
</script>

<style lang="scss">
.table__container {
  display: flex;
  flex-direction: row;
    @media only screen and (max-width: 720px) {
      flex-direction: column;
    }
}

.table {

}

// .table {
//   table-layout: fixed;
//   border-collapse: collapse;
//   border: 1px solid lightgray;
//   width: 480px;

//   &__head {
//     background: #42b983;
//     text-shadow: 1px 1px 0 white;

//     & tr {
//       display: block;
//     }
//   }

//   &__body {
//     display: block;
//     width: 100%;
//     overflow: auto;
//     height: 600px;
//   }

//   & tr {
//     display: block;
//     width: 100%;
//   }

//   & td, th {
//     text-align: center;
//     padding: 0.5em;
//   }

//   & td {
//     width: 100%;
//   }

//   & tr:nth-child(even) {
//         background-color: #f2f2f2;
//       }
// }
</style>
