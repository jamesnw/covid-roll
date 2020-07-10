<template>
  <TabView class="p-12 text-center font-sans font-light text-gray-800"/>
  <github-banner />
</template>

<script>
import TabView from "./components/TabView.vue";
import GithubBanner from "./components/GithubBanner.vue"
export default {
  name: "App",
  components: {
    TabView,
    GithubBanner
  }
};
</script>
