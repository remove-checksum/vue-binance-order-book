/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
// TODO: Remake in ts
import axios from 'axios';
import { mutations } from '../store/store';

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

/**
 * Enum updateRate vaules
 * @enum {string}
 */

const possibleUpdateRates = {
  '1000ms': '1000',
  '100ms': '100',
};

/**
 *
 * @param {Object} snapshot
 * @param {Array} snapshot.bids
 * @param {Array} snapshot.asks
 */

function transformSnapshot(snapshot) {
  const { bids, asks } = snapshot;
  const transformed = {
    bids: {},
    asks: {},
  };
  for (const bid of bids) {
    const [priceLevel, quantity] = bid;
    transformed.bids[priceLevel] = quantity;
  }
  for (const ask of asks) {
    const [priceLevel, quantity] = ask;
    transformed.asks[priceLevel] = quantity;
  }
  return transformed;
}

/**
 *
 * @param {Object} diff
 * @param {Array} diff.b
 * @param {Array} diff.a
 */

function transformDiff(diff) {
  const { b: bids, a: asks } = diff;
  const transformed = {
    bids: {},
    asks: {},
  };
  for (const bid of bids) {
    const [priceLevel, quantity] = bid;
    transformed.bids[priceLevel] = quantity;
  }
  for (const ask of asks) {
    const [priceLevel, quantity] = ask;
    transformed.asks[priceLevel] = quantity;
  }
  return transformed;
}

function snapshotHandler(snapshot) {
  mutations.setData(transformSnapshot(snapshot));
}

function messageHandler(message) {
  mutations.patchData(transformDiff(message));
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
  let snapshot;
  let gotSnapshot = false;

  ws.onopen = () => {
    console.log(`[open]: ${query}`);
    fetchSnapshot('BNBBTC', 500).then((res) => {
      snapshot = res.data;
      gotSnapshot = !gotSnapshot;
      snapshotHandler(snapshot);
    });
  };

  ws.onmessage = (evt) => {
    const buffer = JSON.parse(evt.data);
    console.log('Message recieved'); // \nFirst updateId: ${buffer.U}\nLast updateId: ${buffer.u}\n`, buffer);
    if (!gotSnapshot) {
      eventBuffer.push(buffer);
    } else {
      messageHandler(buffer);
    }
  };

  ws.onerror = (err) => {
    console.log(err);
    ws.close();
  };

  setTimeout(() => {
    ws.close(1000);
    console.log('connection closed');
  }, 15000);
}

export default {
  name: 'BinanceSDK',
  fetchSnapshot,
  subscribeToOrderBook,
};
