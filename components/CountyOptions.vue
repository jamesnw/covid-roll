<template>
  <select v-model="area">
    <option v-for="opt in countyList" :value="opt" :key="opt" :name="opt">{{opt}}</option>
  </select>
  <pre>{{dataframe}}</pre>
</template>

<script>
import { area, countyList, dataframe } from "../composables/area.ts";
export default {
  setup() {
    return { area, countyList, dataframe };
  }
};
</script>

<style>
</style>