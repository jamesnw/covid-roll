<template>
  <CountyOptions />
</template>

<script>
import DataLayer from "./components/DataLayer.vue";
import CountyOptions from "./components/CountyOptions.vue";
export default {
  name: "App",
  components: {
    DataLayer,
    CountyOptions
  }
};
</script>
