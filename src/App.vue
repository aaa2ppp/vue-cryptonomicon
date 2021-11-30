<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div
      v-if="isLoading"
      class="
        fixed
        w-100
        h-100
        opacity-80
        bg-purple-800
        inset-0
        z-50
        flex
        items-center
        justify-center
      "
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <div class="container">
      <input-ticker ref="inputTicker" @submit="inputTickerSubmit" />
      <template v-if="tickers.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <ticker-list
          :tickers="tickers"
          @select-ticker="selectTicker"
          @remove-ticker="removeTicker"
        />
        <hr class="w-full border-t border-gray-600 my-4" />
        <price-chart
          v-if="currentTicker"
          :tickerName="currentTicker.name"
          :prices="priceChart"
          @close="currentTicker = null"
        />
      </template>
    </div>
  </div>
</template>

<script>
import TickerPrice from "./components/TickerPrice.js";
import InputTicker from "./components/InputTicker.vue";
import TickerList from "./components/TickerList.vue";
import PriceChart from "./components/PriceChart.vue";

export default {
  name: "App",
  components: {
    InputTicker,
    TickerList,
    PriceChart,
  },
  data() {
    return {
      isLoading: true,
      tickers: [],
      // eslint-disable-next-line vue/no-reserved-keys
      _currentTicker: null,
      priceChart: [],
    };
  },
  computed: {
    currentTicker: {
      get: function () {
        return this._currentTicker;
      },
      set: function (ticker) {
        if (this._currentTicker) {
          this._currentTicker.selected = false;
        }
        this.priceChart = [];
        this._currentTicker = ticker;
        if (this._currentTicker) {
          this._currentTicker.selected = true;
        }
      },
    },
  },
  methods: {
    inputTickerSubmit(name) {
      // XXX $ref
      if (!name) {
        this.$refs.inputTicker.errorMessage = "Не задано имя тикера";
        return;
      }
      name = name.toUpperCase();
      if (this.tickers.find((ticker) => ticker.name == name) != undefined) {
        this.$refs.inputTicker.errorMessage = "Такой тикер уже добавлен";
        return;
      }
      this.$refs.inputTicker.clear();

      // add a new ticker and set it as current
      this.currentTicker = this.addTicker(name);
    },
    addTicker(name) {
      // create a ticker and add it to the list
      this.tickers.push({ name: name.toUpperCase(), price: 0 });
      const ticker = this.tickers.at(-1);

      // subscribe to the price update
      ticker.setPrice = (price) => this.setTickerPrice(ticker, price);
      TickerPrice.addListener(ticker.name, ticker.setPrice);

      return ticker;
    },
    removeTicker(ticker) {
      if (this.currentTicker == ticker) {
        this.currentTicker = null;
      }
      if (ticker.setPrice) {
        TickerPrice.removeListener(ticker.name, ticker.setPrice);
        ticker.setPrice == null;
      }
      const i = this.tickers.indexOf(ticker);
      if (i != -1) {
        this.tickers.splice(i, 1);
      }
    },
    selectTicker(ticker) {
      this.currentTicker = ticker;
    },
    setTickerPrice(ticker, price) {
      ticker.price = Math.abs(price) < 1 ? price.toPrecision(2) : price.toFixed(2);
      if (ticker == this.currentTicker) {
        console.log("price chart push:", ticker.name, price);
        this.priceChart.push(price);
      }
    },
    alert() {
      alert("Hello, world!");
    },
  },
  mounted() {
    // simulation of page loading
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 3000);
  },
};
</script>

<style src="./app.css"></style>
