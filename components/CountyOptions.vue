<template>
  <select v-model="area" id="county-selector" class="border rounded-sm mx-1">
    <option v-for="opt in countyList" :value="opt.key" :key="opt.key" :name="opt.name">{{opt.name}}</option>
  </select>
</template>

<script setup>
import { area as _area, countyList as _countyList } from "../composables/county.ts";
export const area = _area;
export const countyList = _countyList;
</script>

<style>
</style>