<template>
  <div>
     <Stats :sums="sums" />
    <graph :rolling="dfRolling" area="Indiana" />
  </div>
</template>

<script>
import { dfRolling, sums } from "../composables/state";
import Graph from "./Graph.vue";
import Stats from "./Stats.vue";
export default {
  name: "State",
  setup() {
    return {
      dfRolling, sums
    };
  },
  components: { Graph, Stats }
};
</script>

<style>
</style>