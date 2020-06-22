<template>
  <select v-model="selectedGraphType" class="border rounded-sm mx-1">
    <option v-for="opt in graphTypes" :value="opt.type" :key="opt.type" :name="opt.type">{{opt.type}}</option>
  </select>
</template>

<script>
import { graphTypes, selectedGraphType } from "../composables/shared.ts";
export default {
  setup() {
    return { graphTypes, selectedGraphType };
  }
};
</script>

<style>
</style>