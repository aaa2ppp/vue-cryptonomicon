const listeners = {};   // by tickerName
const oldPrices = {};   // by tickerName

// get price simulation
setInterval(() => {
  for (const tickerName in listeners) {
    const list = listeners[tickerName];

    let newPrice;
    if (!oldPrices[tickerName]) {
      newPrice = oldPrices[tickerName] = 100 * Math.random();
    } else {
      // we use three dice to get a "normal" distribution
      newPrice = oldPrices[tickerName] * (100 + (Math.random() + Math.random() + Math.random()) / 3 - 0.5) / 100;
      oldPrices[tickerName] = newPrice;
    }

    for (const listener of list) {
      listener(tickerName, newPrice);
    }
  }
}, 3000);

export default {
  addListener(tickerName, listener) {
    let list = listeners[tickerName];
    if (!list) {
      list = listeners[tickerName] = [];
    } else if (list.indexOf(listener) != -1) {
      return;
    }
    list.push(listener);
  },

  removeListener(tickerName, listener) {
    const list = listeners[tickerName];
    if (!list) {
      return;
    }
    const i = list.indexOf(listener);
    if (i != -1) {
      list.slice(i, 1);
      return;
    }
  },

  removeAllListeners() {
    for (const tickerName in listeners) {
      listeners[tickerName] = [];
    }
  },
};
