<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div
      v-if="isLoading"
      class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <div class="container">
      <input-ticker
        @submit="inputTickerSubmit"
        v-model:tickerName="inputTickerName"
        v-model:tickerChoice="inputTickerChoice"
        :errorMessage="inputTickerError"
      />
      <template v-if="tickers.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <input
          type="text"
          placeholder="FOR TEST: индекс тикера в списке"
          @change="selectedTicker = tickers[+$event.target.value]"
        />
        <ticker-list :tickers="tickers" v-model:selected-ticker="selectedTicker" @remove-ticker="removeTicker" />
        <price-chart
          v-if="selectedTicker"
          :tickerName="selectedTicker.name"
          :prices="priceChart"
          @close="selectedTicker = null"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Tickers from "./TickersAPI.js";
import inputTicker from "./components/InputTicker.vue";
import TickerList from "./components/TickerList.vue";
import PriceChart from "./components/PriceChart.vue";

const STORAGE_PREFIX = "cryptonomicon";
const MAX_CHART_SIZE = 100;

export default {
  name: "App",

  components: {
    inputTicker,
    TickerList,
    PriceChart,
  },

  data() {
    return {
      isLoading: true,
      tickers: [],
      selectedTicker: null,
      priceChart: [],
      priceChartTick: 0,
      inputTickerName: "",
      inputTickerError: "",
    };
  },

  computed: {
    inputTickerChoice() {
      console.log("inputTickerChoice");
      const input = this.inputTickerName?.toUpperCase();
      if (input) {
        // const filter = (name, decription) =>
        //   (name.includes(search) || decription.toUpperCase().includes(search)) && !this.tickerExist(name);
        const search = (name) => name.substring(0, input.length) == input && !this.tickerExist(name);
        const count = 4;
        return Tickers.filter(search, count);
      } else {
        return [];
      }
    },

    tickerCount() {
      return this.tickers.length;
    },
  },

  methods: {
    tickerExist(name) {
      return this.tickers.find((ticker) => ticker.name == name) != undefined;
    },
    inputTickerSubmit() {
      const name = this.inputTickerName.toUpperCase();
      console.log("inputTickerSubmit:", name);

      if (!name) {
        this.inputTickerError = "Необходимо ввести имя тикера";
        return;
      }
      // if (!Tickers.check(name)) {
      //   this.inputTickerError = "Недопустимое имя тикера";
      //   return;
      // }
      if (this.tickerExist(name)) {
        this.inputTickerError = "Такой тикер уже добавлен";
        return;
      }

      // ok, clear input
      this.inputTickerName = "";

      // add a new ticker and set it as current
      this.selectedTicker = this.addTicker(name);
    },

    addTicker(name) {
      if (!name) {
        console.error("App.addTicker: name not defined");
        return null;
      }

      let ticker = this.tickers.find((t) => t.name == name);
      if (!ticker) {
        // create a ticker and add it to the list
        this.tickers.push({ name: name.toUpperCase(), price: 0 });
        ticker = this.tickers.at(-1);

        // subscribe to the price update
        ticker.setPrice = (price) => this.setTickerPrice(ticker, price);
        if (!Tickers.addListener(ticker.name, ticker.setPrice)) {
          ticker.setPrice = null;
        }
      }
      return ticker;
    },

    removeTicker(ticker) {
      if (this.selectedTicker == ticker) {
        this.selectedTicker = null;
      }
      if (ticker.setPrice) {
        Tickers.removeListener(ticker.name, ticker.setPrice);
        ticker.setPrice == null;
      }
      const i = this.tickers.indexOf(ticker);
      if (i != -1) {
        this.tickers.splice(i, 1);
      }
    },

    setTickerPrice(ticker, price) {
      ticker.price = price;
      if (ticker == this.selectedTicker) {
        //console.log("price chart push:", ticker.name, price);
        const deleteCount = this.priceChart.length - MAX_CHART_SIZE + 1;
        if (deleteCount > 0) {
          this.priceChart.splice(0, deleteCount);
        }
        this.priceChart.push({ price: price, tick: this.priceChartTick++ });
      }
    },

    loadFromStorage(name, defaultValue) {
      console.log(`loadFromStorage: ${name}`);
      const str = localStorage.getItem(`${STORAGE_PREFIX}_${name}`);
      return str ? JSON.parse(str) : defaultValue;
    },

    saveToStorage(name, obj) {
      if (this.isLoading) {
        console.log(`saveToStorage: ${name}: skip on loading`);
        return;
      }
      console.log(`saveToStorage: ${name}`);
      localStorage.setItem(`${STORAGE_PREFIX}_${name}`, JSON.stringify(obj));
    },

    loadFromUrl(name, defaultValue) {
      console.log(`loadFromUrl: ${name}`);
      const params = new URLSearchParams(document.location.search);
      const value = params.get(name);
      return value || defaultValue;
    },

    saveToUrl(name, value) {
      if (this.isLoading) {
        console.log(`saveToUrl: ${name}: skip on loading`);
        return;
      }

      console.log(`saveToUrl: ${name}`);
      const params = new URLSearchParams(location.search);

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      history.pushState(null, null, `${location.pathname}?${params}`);
    },
  },

  watch: {
    tickerCount() {
      this.saveToStorage(
        "tickers",
        this.tickers.map((ticker) => ticker.name)
      );
    },

    selectedTicker(ticker) {
      this.priceChart = [];
      this.priceChartTick = 0;
      this.saveToUrl("sel", ticker?.name);
    },

    inputTickerName() {
      this.inputTickerError = "";
    },
  },

  mounted() {
    this.loadFromStorage("tickers")?.forEach((tickerName) => this.addTicker(tickerName));

    const selectedTickerName = this.loadFromUrl("sel");
    if (selectedTickerName) {
      this.selectedTicker = this.addTicker(selectedTickerName);
    }

    // this.$nextTick(() => (this.isLoading = false));
    // simulation of loading timeout
    setTimeout(() => (this.isLoading = false), 1000);
  },
};
</script>

<style src="./app.css"></style>
