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
      <section>
        <div class="flex">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm font-medium text-gray-700"
              >Тикер {{ newWallet }}</label
            >
            <div class="mt-1 relative rounded-md shadow-md">
              <input
                v-model.trim="newWallet"
                @keyup.enter="addWallet(newWallet)"
                type="text"
                name="wallet"
                id="wallet"
                class="
                  block
                  w-full
                  pr-10
                  border-gray-300
                  text-gray-900
                  focus:outline-none focus:ring-gray-500 focus:border-gray-500
                  sm:text-sm
                  rounded-md
                "
                placeholder="Например DOGE"
              />
            </div>
            <div
              class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
            >
              <span
                v-for="(wallet, idx) of walletChoice"
                :key="idx"
                @click="(newWallet = wallet), addWallet(wallet)"
                class="
                  inline-flex
                  items-center
                  px-2
                  m-1
                  rounded-md
                  text-xs
                  font-medium
                  bg-gray-300
                  text-gray-800
                  cursor-pointer
                "
              >
                {{ wallet }}
              </span>
            </div>
            <div v-if="newWalletAlreadyExists" class="text-sm text-red-600">
              Такой тикер уже добавлен
            </div>
          </div>
        </div>
        <button
          :disabled="newWalletAlreadyExists"
          @click="addWallet(newWallet)"
          type="button"
          class="
            my-4
            inline-flex
            items-center
            py-2
            px-4
            border border-transparent
            shadow-sm
            text-sm
            leading-4
            font-medium
            rounded-full
            text-white
            bg-gray-600
            hover:bg-gray-700
            transition-colors
            duration-300
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-gray-500
          "
        >
          <!-- Heroicon name: solid/mail -->
          <svg
            class="-ml-0.5 mr-2 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#ffffff"
          >
            <path
              d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            ></path>
          </svg>
          Добавить
        </button>
      </section>

      <hr class="w-full border-t border-gray-600 my-4" />
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          v-for="(wallet, idx) of walletList"
          :key="idx"
          :class="getWalletClass(wallet)"
          @click="currentWallet = wallet.name"
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
              {{ wallet.name }} - USD
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              {{ wallet.price || "-" }}
            </dd>
          </div>
          <div class="w-full border-t border-gray-200"></div>
          <button
            @click.stop="removeWallet(idx)"
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
      <section v-if="currentWallet" class="relative">
        <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
          {{ currentWallet }} - USD
        </h3>
        <div class="flex items-end border-gray-600 border-b border-l h-64">
          <div
            v-for="(value, idx) of chart"
            :key="idx"
            class="bg-purple-800 border w-10"
            :style="getChartStyle(idx)"
          ></div>
        </div>
        <button
          @click.stop="closeСhart"
          type="button"
          class="absolute top-0 right-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:svgjs="http://svgjs.com/svgjs"
            version="1.1"
            width="30"
            height="30"
            x="0"
            y="0"
            viewBox="0 0 511.76 511.76"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
                fill="#718096"
                data-original="#000000"
              ></path>
            </g>
          </svg>
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoaded: false,
      newWallet: "",
      walletChoice: ["BTC", "DOGE", "BCH", "CHD"],
      walletList: [],
      currentWallet: "",
      chart: [],
    };
  },
  computed: {
    newWalletAlreadyExists() {
      return this.walletExists(this.newWallet);
    },
    chartMin() {
      return Math.min.apply(null, this.chart);
    },
    chartMax() {
      return Math.max.apply(null, this.chart);
    },

  },
  methods: {
    walletExists(wallet) {
      const s = wallet.toUpperCase();
      return this.walletList.find((x) => x.name == s) != undefined;
    },
    addWallet(wallet) {
      console.log("addWallet:", wallet);
      if (wallet && !this.walletExists(wallet)) {
        const s = wallet.toUpperCase();
        this.walletList.push({ name: s, price: Math.random() * 100 });
        this.currentWallet = s;
        this.newWallet = "";
        this.walletPriceSimulation(s);
      }
    },
    removeWallet(index) {
      if (this.currentWallet == this.walletList[index].name) {
        this.currentWallet = "";
      }
      this.walletList.splice(index, 1);
    },
    walletPriceSimulation(name) {
      const s = name.toUpperCase();
      const wallet = this.walletList.find((x) => x.name == s);
      if (wallet) {
        const newPrice = (wallet.price * (100 + Math.random() - 0.5)) / 100;
        this.setWalletPrice(name, newPrice);
        setTimeout(() => this.walletPriceSimulation(name), 3000);
      }
    },
    setWalletPrice(name, price) {
      const s = name.toUpperCase();
      const wallet = this.walletList.find((x) => x.name == s);
      wallet.price = price;
      if (wallet.name == this.currentWallet) {
        this.chart.push(price);
      }
    },
    getWalletClass(wallet) {
      return { "border-4": this.currentWallet == wallet.name };
    },
    getChartStyle(index) {
      if (this.chart.length == 1) {
        return { height: "50%" };
      }
      const min = this.chartMin;
      const max = this.chartMax;
      if (min == max) {
        return { height: "50%" };
      }
      const height = 5 + ((this.chart[index] - min) / (max - min)) * 95;
      return { height: height + "%" };
    },
    closeСhart() {
      this.currentWallet = "";
    },
  },
  watch: {
    currentWallet() {
      this.chart = [];
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
