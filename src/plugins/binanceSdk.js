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

function fetchSnapshot(symbol = 'BNBBTC', limit = 500) {
  // const { str: symbolSanitized, num: limitSanitized } = prepareParams(symbol, limit);
  const query = `https://api.binance.com/api/v3/depth?symbol=${symbol.toUpperCase()}&limit=${Number(limit)}`;

  return axios.get(query);
}

// function handleMessages(messages) {
//   console.log(messages);
// }

/**
 * Enum updateRate vaules
 * @enum {string}
 */
const possibleUpdateRates = {
  '1000ms': '1000',
  '100ms': '100',
};

function handleMessage(events, snapshot) {
  console.log('snapshot: ', snapshot, '\nevents: ', events);
}

/**
 * Subscribe to order book, updates every 1000ms by default
 * @param {string} symbol - Symbol for which to subscribe
 * @param {string} [updateRate] - Set update rate
 */

function subscribeToOrderBook(symbol = 'bnbbtc', updateRate = possibleUpdateRates['1000ms']) {
  let query = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`;
  if (updateRate === '100') {
    query += '@100ms';
  }

  const ws = new WebSocket(query);

  const eventBuffer = [];
  let snapshotBuffer;

  ws.onopen = async () => {
    console.log(`[open]: ${query}`);
    await fetchSnapshot('BNBBTC', 500).then((res) => { snapshotBuffer = res.data; });
  };

  // ws.onmessage = (evt) => {
  //   const buffer = JSON.parse(evt.data);
  //   console.log(`Message recieved\nFirst updateId: ${buffer.U}\nLast updateId: ${buffer.u}`);
  //   eventBuffer.push(buffer);
  //   handleMessage(eventBuffer, snapshotBuffer);
  // };

  ws.onmessage = (evt) => new Promise((resolve) => {
    const buffer = JSON.parse(evt.data);
    console.log(`Message recieved\nFirst updateId: ${buffer.U}\nLast updateId: ${buffer.u}`);
    eventBuffer.push(buffer);
    resolve({ eventBuffer, snapshotBuffer });
  }).then((result) => handleMessage(result.eventBuffer, result.snapshotBuffer));

  ws.onerror = (err) => {
    console.log(err);
    ws.close();
  };

  setTimeout(() => {
    ws.close(1000);
    console.log('connection closed');
  }, 10000);
}

export default {
  name: 'BinanceSDK',
  fetchSnapshot,
  subscribeToOrderBook,
};
