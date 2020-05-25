<template>
  <select v-model="area">
    <option v-for="opt in countyList" :value="opt" :key="opt" :name="opt">{{opt}}</option>
  </select>
</template>

<script>
import { area, countyList } from "../composables/county.ts";
export default {
  setup() {
    return { area, countyList };
  }
};
</script>

<style>
</style>