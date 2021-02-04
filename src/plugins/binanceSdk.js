// TODO: Remake in ts
import axios from 'axios';

/**
 * Fetches Order Book snapshot
 * @param {string} [symbol=BTCUSDT] - Symbol for which to get snapshot
 * @param {number} [limit=500] - Entries limit
 * @returns {Promise} - Promise with response object
 */

function fetchSnapshot(symbol = 'BTCUSDT', limit = 500) {
  const symbolSanitized = symbol.toString().toUpperCase();
  const limitSanitized = Number(limit);
  const query = `https://api.binance.com/api/v3/depth?symbol=${symbolSanitized}&limit=${limitSanitized}`;

  return axios.get(query);
}

// const BinanceSDK = {
//   install(Vue) {
//     Object.defineProperties(Vue.prototype, {
//       getOrderBookSnapshot: {
//         value: fetchSnapshot,
//       },
//       subscribeToOrderBook: {
//         value() {
//           console.log('subscribe to pewdiepie');
//         },
//       },
//     });
//     // Vue.prototype.getOrderBookSnapshot = () => {
//     //   console.log('fetching dom');
//     // };
//     // Vue.prototype.subscribeToOrderBook = () => console.log('subscribe to pewdiepie');
//   },
// };

export default {
  name: 'BinanceSDK',
  fetchSnapshot,
  subscribeToOrderBook: function subscribeToOrderBook() { console.log('ooga booga'); },
};
