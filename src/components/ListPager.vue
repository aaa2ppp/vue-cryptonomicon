<template>
  <div>
    <div>
      <input
        :value="filter"
        @input="$emit('update:filter', $event.target.value)"
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
        type="button"
        :disabled="pageIndex <= 0"
        @click="scrollPage(-1)"
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
        Назад</button
      >&nbsp;<button
        type="button"
        @click="scrollPage(+1)"
        :disabled="pageIndex >= pageCount - 1"
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
        Вперед</button
      >&nbsp;{{ [pageIndex + 1, pageCount].join(" / ") }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ListPager",
  emits: ["update:pageRange", "update:filter"],
  props: {
    focusIndex: {
      type: Number,
    },
    count: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 3,
    },
    filter: String,
    pageRange: Object,
  },
  data() {
    return {
      pageIndex: 0,
    };
  },
  computed: {
    // XXX for watch
    config() {
      return {
        count: this.count,
        pageSize: this.pageSize,
      };
    },
    pageCount() {
      const count = Math.ceil(this.count / this.pageSize);
      return count > 0 ? count : 1;
    },
  },
  methods: {
    scrollPage(step) {
      this.pageIndex = (this.pageIndex + step) % this.pageCount;
      const start = this.pageIndex * this.pageSize;
      const end = start + this.pageSize;
      this.$emit("update:pageRange", { start: start, end: end });
    },
  },
  watch: {
    config() {
      let newPageIndex = this.pageIndex;
      if (this.focusIndex >= 0) {
        newPageIndex = Math.floor(this.focusIndex / this.pageSize);
      }
      if (newPageIndex > this.pageCount - 1) {
        newPageIndex = this.pageCount - 1;
      }
      if (this.pageIndex != newPageIndex) {
        this.pageIndex = newPageIndex;
        this.scrollPage(0);
      }
    },
  },
};
</script>
