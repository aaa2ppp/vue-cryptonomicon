<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div
      v-if="!isLoaded"
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
      <input-ticker ref="inputTicker" @submit="addTicker" />
      <template v-if="tickers.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            v-for="ticker of tickers"
            :key="ticker"
            :class="getTickerClass(ticker)"
            @click="currentTicker = ticker"
            class="
              bg-white
              overflow-hidden
              shadow
              rounded-lg
              border-purple-800 border-solid
              cursor-pointer
            "
          >
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ ticker.name }} - USD
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ ticker.price || "-" }}
              </dd>
            </div>
            <div class="w-full border-t border-gray-200"></div>
            <button
              @click.stop="removeTicker(ticker)"
              class="
                flex
                items-center
                justify-center
                font-medium
                w-full
                bg-gray-100
                px-4
                py-4
                sm:px-6
                text-md text-gray-500
                hover:text-gray-600 hover:bg-gray-200 hover:opacity-20
                transition-all
                focus:outline-none
              "
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#718096"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path></svg
              >Удалить
            </button>
          </div>
        </dl>
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
import PriceChart from "./components/PriceChart.vue";

export default {
  name: "App",
  components: {
    InputTicker,
    PriceChart,
  },
  data() {
    return {
      isLoaded: false,
      tickers: [],
      currentTicker: null,
      priceChart: [],
    };
  },
  computed: {
    priceChartMin() {
      return Math.min.apply(null, this.priceChart);
    },
    priceChartMax() {
      return Math.max.apply(null, this.priceChart);
    },
    chartBars() {
      return this.priceChart.map((price) => {
        const min = this.priceChartMin;
        const max = this.priceChartMax;
        let height = min == max ? 50 : 5 + ((price - min) / (max - min)) * 95;
        return { height: height + "% " };
      });
    },
  },
  methods: {
    addTicker(name) {
      if (!name) {
        this.$refs.inputTicker.errorMessage = "Не задано имя тикера";
        return;
      }
      if (this.getTicker(name) != undefined) {
        this.$refs.inputTicker.errorMessage = "Такой тикер уже добавлен";
        return;
      }
      name = name.toUpperCase();
      this.tickers.push({ name: name, price: 0 });
      this.currentTicker = this.tickers.at(-1);
      this.$refs.inputTicker.clear();
      TickerPrice.addListener(name, this.setTickerPrice);
    },
    getTicker(name) {
      if (!name) {
        console.error("App.getTicker: ticker name is empty");
        return undefined;
      } else {
        name = name.toUpperCase();
        return this.tickers.find((ticker) => ticker.name == name);
      }
    },
    removeTicker(ticker) {
      const i = this.tickers.indexOf(ticker);
      if (i != -1) {
        this.tickers.splice(i, 1);
        if (this.currentTicker == ticker) {
          this.currentTicker = null;
        }
        TickerPrice.removeListener(ticker.name, this.setTickerPrice);
      }
    },
    getTickerClass(ticker) {
      return { "border-4": this.currentTicker == ticker };
    },
    setTickerPrice(name, price) {
      const ticker = this.getTicker(name);
      if (ticker) {
        ticker.price = price;
        if (ticker == this.currentTicker) {
          console.log("price chart push:", name, price);
          this.priceChart.push(price);
        }
      }
    },
    closeСhart() {
      this.currentTicker = null;
    },
  },
  watch: {
    currentTicker() {
      this.priceChart = [];
    },
  },
  mounted() {
    // simulation of page loading
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000);
  },
};
</script>

<style src="./app.css"></style>
