<template>
  <header class="header sticky top-0 bg-white">
    <div class="h-2 w-full bg-primary-500"></div>
    <nav class="flex items-center justify-between flex-wrap py-6 container">
      <!-- site title / logo -->
      <div class="flex items-center flex-no-shrink mr-6 h-10">
        <g-link
          class="text-accent-600 uppercase py-3 text-right font-bold"
          to="/"
          :title="$static.metadata.siteName"
        >
          INTERSECT
        </g-link>
      </div>
      <!-- end site title / logo -->

      <!-- mobile navigation toggle -->
      <div class="block md:hidden">
        <button
          @click="toggle"
          class="nav-toggle"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <!-- end navigation toggle -->

      <!-- Navigation Links-->
      <scrollactive
        :class="open ? 'block': 'hidden'"
        class="w-full md:flex md:items-center md:w-auto flex-grow md:flex-grow-0"
        active-class="active"
        :offset="120"
        :duration="100"
        bezier-easing-value="0,0,.58,1"
      >
        <router-link
          to="/#assembly"
          class="nav-link scrollactive-item"
        >assembly</router-link>
        <router-link
          to="/#program"
          class="nav-link scrollactive-item"
        >program</router-link>
        <router-link
          to="/#self-organize"
          class="nav-link scrollactive-item"
        >self-organize</router-link>
        <g-link
          to="/#FAQ"
          class="nav-link scrollactive-item"
        >FAQ</g-link>
        <g-link
          to="https://tv.bonfire.link"
          class="nav-link border-2 border-accent-600 rounded ml-4"
        >watch</g-link>
      </scrollactive>
      <!-- End navigation Links-->
    </nav>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  .nav-toggle {
    @apply flex items-center px-3 py-2 text-primary-500;
    &:hover {
      @apply text-primary-400;
    }
  }
  .nav-link {
    display: block;
    @apply text-primary-900 uppercase py-3 text-right font-bold;
    @screen sm {
      @apply flex px-3 py-0 whitespace-no-wrap text-left;
    }
    &:hover,
    &:focus,
    &.active {
      @apply text-accent-600;
    }
  }
}
</style>
