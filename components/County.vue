<template>
  <CountyOptions />
  <Stats :sums="sums" />
  <Graph :rolling="dfRolling" :area="area" />
</template>

<script>
import CountyOptions from "./CountyOptions.vue";
import Graph from "./Graph.vue";
import Stats from "./Stats.vue";
import { dfRolling, area, sums } from "../composables/county.ts";
import { computed } from "vue";
export default {
  name: "County",
  data() {
    return {};
  },
  setup() {
    return { dfRolling, sums, area };
  },
  components: {
    CountyOptions,
    Graph,
    Stats
  }
};
</script>

<style>
</style>