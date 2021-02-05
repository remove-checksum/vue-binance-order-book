// TODO: Remake in ts
import axios from 'axios';

// function prepareParams(toStr, toNum) {
//   return {
//     str: toStr.toString().toUpperCase(),
//     num: Number(toNum),
//   };
// }

/**
 * Fetch order book snapshot
 * @param {string} [symbol=BTCUSDT] - Symbol for which to get snapshot
 * @param {number} [limit=500] - Entries limit
 * @returns {Promise} - Promise with response object
 */

function fetchSnapshot(symbol = 'BTCUSDT', limit = 500) {
  // const { str: symbolSanitized, num: limitSanitized } = prepareParams(symbol, limit);
  const query = `https://api.binance.com/api/v3/depth?symbol=${symbol.toUpperCase()}&limit=${Number(limit)}`;

  return axios.get(query);
}

/**
 * Enum updateRate vaules
 * @enum {string}
 */
const possibleUpdateRates = {
  '1000ms': '1000',
  '100ms': '100',
};

/**
 * Subscribe to order book, updates every 1000ms by default
 * @param {string} symbol - Symbol for which to subscribe
 * @param {string} [updateRate] - Set update rate
 */

async function subscribeToOrderBook(symbol = 'bnbbtc', updateRate = possibleUpdateRates['1000ms']) {
  let query = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`;
  if (updateRate === '100') {
    query += '@100ms';
  }

  const ws = new WebSocket(query);

  ws.onopen = async () => {
    let snapshotCache;
    await fetchSnapshot(symbol, 1000).then((res) => {
      snapshotCache = res.data;
    });
    console.log(`[open] connected to ${query}`);
    console.log(snapshotCache.lastUpdateId);
  };

  const eventBuffer = [];

  ws.onmessage = (evt) => {
    // eventBuffer.push(evt.data);
    // eslint-disable-next-line dot-notation
    const buffer = JSON.parse(evt.data);
    console.log('First updateId: ', buffer.U, '\nLast updateId: ', buffer.u);
  };
  // eventBuffer.filter((payload) => !(payload.u <= snapshotCache.lastUpdateId));

  // eventBuffer.filter(())

  setTimeout(() => {
    console.log('first recieved message', eventBuffer[0]);
    ws.close(1000);
    console.log('connection closed');
  }, 5000);

  return ws;
}

export default {
  name: 'BinanceSDK',
  fetchSnapshot,
  subscribeToOrderBook,
};
