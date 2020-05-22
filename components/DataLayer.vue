<template>
  <p>{{days}} days of data</p>
  <graph :days14="rolling14" :days7="rolling7" />
</template>

<script>
import Graph from "./Graph.vue";
export default {
  name: "DataLayer",
  components: { Graph },
  data: () => ({
    info: {}
  }),
  created() {
    this.loadData();
  },
  computed: {
    days() {
      return this.records.length;
    },
    records() {
      return this.info.records || [];
    },
    rolling14() {
      return this.calcRolling(14);
    },
    rolling7() {
      return this.calcRolling(7);
    }
  },
  methods: {
    calcRolling(range) {
      if (this.days === 0) return undefined;

      let result = [];

      for (let index = range; index <= this.records.length; index++) {
        let rollingWindow = this.records.slice(index - range, index);
        let count = rollingWindow.reduce((acc, rec) => {
          return acc + rec.COVID_COUNT;
        }, 0);
        let thisRecord = { ...this.records[index - 1] };
        thisRecord.rolling = count;
        result.push(thisRecord);
      }
      return result;
    },
    loadData() {
      const vm = this;
      // Workaround cors
      const corsAnywhere = "https://cors-anywhere.herokuapp.com";

      const base = "https://hub.mph.in.gov/api/3/action/datastore_search";
      const resource = "resource_id=182b6742-edac-442d-8eeb-62f96b17773e";
      const limit = "limit=200";

      fetch(`${corsAnywhere}/${base}?${resource}&${limit}`, {})
        .then(res => res.json())
        .then(res => {
          vm.info = res.result;
          console.log("res", res);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style>
</style>
