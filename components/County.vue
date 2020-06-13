<template>
  <CountyOptions />
  <Graph :rolling="dfRolling" :area="countyName" />
</template>

<script>
import CountyOptions from "./CountyOptions.vue";
import Graph from "./Graph.vue";
import { dfRolling, area } from "../composables/county.ts";
import { computed } from "vue";
export default {
  name: "County",
  data() {
    return {};
  },
  setup() {
    let countyName = computed(() => {
      return area.value[0].toUpperCase() + area.value.slice(1).toLowerCase();
    });

    return { dfRolling, countyName };
  },
  components: {
    CountyOptions,
    Graph
  }
};
</script>

<style>
</style>