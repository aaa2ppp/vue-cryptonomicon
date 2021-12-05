<template>
  <div>
    <!-- {{ `filter: '${filter}', pageStart: ${pageRange.start}, pageEnd: ${pageRange.end}` }} -->
    <div>
      <div>
        <input
          v-model.trim="filter"
          type="text"
          class="
            pr-10
            border-gray-300
            text-gray-900
            focus:outline-none focus:ring-gray-500 focus:border-gray-500
            sm:text-sm
            rounded-md
            shadow-md
          "
          placeholder="Фильтр"
        />
        &nbsp;<button
          :disabled="!(pageIndex > 0)"
          type="button"
          @click="pagesScrool(-1)"
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
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          "
        >
          &lt; Назад</button
        >&nbsp;<button
          :disabled="!(pageIndex < pageCount - 1)"
          type="button"
          @click="pagesScrool(+1)"
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
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          "
        >
          Вперед &gt;</button
        >&nbsp;{{ [this.pageIndex + 1, this.pageCount].join(" / ") }}
      </div>
      <slot></slot>
    </div>

    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        v-for="ticker of pageTickers"
        :key="ticker.name"
        @click="$emit('update:selectedTicker', ticker)"
        class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
        :class="{ 'bg-red-100': ticker.setPrice === null, 'border-4': ticker == selectedTicker }"
      >
        <div class="px-4 py-5 sm:p-6 text-center">
          <dt class="text-sm font-medium text-gray-500 truncate">{{ ticker.name }} - USD</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ priceFormat(ticker.price) }}
          </dd>
        </div>
        <div class="w-full border-t border-gray-200"></div>
        <button
          @click.stop="$emit('removeTicker', ticker)"
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
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#718096" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0
              100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102
              0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path></svg
          >Удалить
        </button>
      </div>
    </dl>
  </div>
</template>

<script>
const PAGE_SIZE = 3;

export default {
  name: "TickerList",
  emits: ["update:selectedTicker", "removeTicker"],
  props: {
    tickers: Array,
    selectedTicker: Object,
  },
  data() {
    return {
      // XXX $root
      filter: this.$root.loadFromUrl("filter", ""),
      pageIndex: parseInt(this.$root.loadFromUrl("page")) || 0,
    };
  },
  computed: {
    filteredTickers() {
      const filter = this.filter?.toUpperCase();
      return filter ? this.tickers.filter((ticker) => ticker.name.indexOf(filter) != -1) : this.tickers;
    },
    pageCount() {
      const count = Math.ceil(this.filteredTickers.length / PAGE_SIZE);
      return count > 0 ? count : 1;
    },
    pageRange() {
      const start = this.pageIndex * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      return { start: start, end: end };
    },
    pageTickers() {
      return this.filteredTickers.slice(this.pageRange.start, this.pageRange.end);
    },
  },
  methods: {
    priceFormat(price) {
      if (!price) {
        return "-";
      } else if (Math.abs(price) < 1) {
        return price.toPrecision(2);
      } else {
        return price.toFixed(2);
      }
    },
    pagesScrool(step) {
      this.pageIndex = (((this.pageIndex + step) % this.pageCount) + this.pageCount) % this.pageCount;
    },
    showSelected() {
      const selectedIndex = this.selectedTicker ? this.filteredTickers.indexOf(this.selectedTicker) : -1;
      if (selectedIndex >= 0) {
        this.pageIndex = Math.floor(selectedIndex / PAGE_SIZE);
      }
    },
  },
  watch: {
    filter(filter) {
      this.showSelected();
      // XXX $root
      this.$root.saveToUrl("filter", filter);
    },
    selectedTicker() {
      this.showSelected();
    },
    pageIndex(pageIndex) {
      // XXX $root
      this.$root.saveToUrl("page", pageIndex);
    },
    pageCount(pageCount) {
      if (this.pageIndex >= pageCount) {
        this.pageIndex = pageCount - 1;
      }
    },
  },
  // mounted() {
  //   this.showSelected();
  // },
};
</script>
