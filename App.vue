<template>
  <CountyOptions />
  <Graph />
</template>

<script>
import Graph from "./components/Graph.vue";
import CountyOptions from "./components/CountyOptions.vue";
export default {
  name: "App",
  components: {
    Graph,
    CountyOptions
  }
};
</script>
