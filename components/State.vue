<template>
  <div>
    <graph :rolling="dfRolling" area="Indiana" />
  </div>
</template>

<script>
import { dfRolling } from "../composables/state";
import Graph from "./Graph.vue";
export default {
  name: "State",
  setup() {
    return {
      dfRolling
    };
  },
  components: { Graph }
};
</script>

<style>
</style>