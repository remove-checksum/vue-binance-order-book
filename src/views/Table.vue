<template>
  <div class="table-wrapper">
    <!-- <div
        v-for="(orderBookValue, orderBookName, orderBookIndex) in orderBook"
        :key="orderBookIndex"
      > -->
    <table
      class="table"
    >
      <caption>Bids: {{ orderBookAmountBids }}</caption>
      <thead>
        <tr class="table__row table__head">
          <th class="table__header">Amount</th>
          <th class="table__header">Price</th>
          <th class="table__header">Total</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr
          v-for="(quantity, priceLevel) in orderBook.bids"
          :key="priceLevel"
          class="table__row"
        >
          <td class="table__cell">{{ quantity }}</td>
          <td class="table__cell">{{ priceLevel }}</td>
          <td class="table__cell">{{ (quantity * Number(priceLevel)).toFixed(8) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- </div> -->
</template>

<script>
import { mutations } from '../store/store';

export default {
  name: 'Table',
  components: {
  },
  computed: {
    orderBook() {
      return mutations.getData();
    },
    orderBookAmountBids() {
      return mutations.getAmountBids();
    },
  },
  mounted() {
    helpCore.plugin.BinanceSDK.subscribeToOrderBook('bnbbtc', '1000');
  },
  methods: {
    capitalize([firstLetter, ...rest]) {
      return firstLetter.toUpperCase() + rest.join('').toLowerCase;
    },
  },
};
</script>

<style lang="scss">

.table-wrapper {
  width: 660px;
  overflow-y: scroll;
  max-height: 660px;
}

.table {
  border-collapse: collapse;
  text-align: left;
  width: 100%;

  &__row {
    border-bottom: 1px solid black;
    &:nth-child(even) {
      background-color: lightpink;
    }
  }

  &__head {
  }

  &__body {
  }

  &__header {
    padding: .5em;
  }

  &__cell {
    padding: .5em
  }
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
