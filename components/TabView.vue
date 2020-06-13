<template>
  <div>
    <div class="tab-buttons">
      <button class="tab-button" @click="active='state'" :disabled="active === 'state'">State</button>
      <button class="tab-button" @click="active='county'" :disabled="active === 'county'">County</button>
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
  }
};
</script>

<style>
</style>