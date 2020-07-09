<template>
  <select v-model="area" id="county-selector" class="border rounded-sm mx-1">
    <option v-for="opt in countyList" :value="opt.key" :key="opt.key" :name="opt.name">{{opt.name}}</option>
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