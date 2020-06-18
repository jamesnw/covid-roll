<template>
  <div>
    <div class="tab-buttons my-2">
      <button
        :class="['btn btn-blue', {active: stateActive}]"
        type="button"
        @click="active='state'"
        :disabled="stateActive"
      >State</button>
      <button
        :class="['btn btn-blue', {active: countyActive}]"
        type="button"
        @click="active='county'"
        :disabled="countyActive"
      >County</button>
    </div>
    <div class="tab-content">
      <div class="tab" id="state" v-if="active==='state'">
        <State />
      </div>
      <div class="tab" id="county" v-if="active==='county'">
        <County />
      </div>
    </div>
  </div>
</template>

<script>
import County from "./County.vue";
import State from "./State.vue";
export default {
  name: "TabView",
  data() {
    return {
      active: "county"
    };
  },
  components: {
    State,
    County
  },
  computed: {
    stateActive() {
      return this.active === "state";
    },
    countyActive() {
      return this.active === "county";
    }
  }
};
</script>

<style>
</style>