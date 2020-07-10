<template>
  <p>{{days}} days of data - {{area}} - {{things}}</p>
  <pre>{{info}}</pre>
  <graph :days14="rolling14" :days7="rolling7" :days="combined" />
</template>

<script>
import Graph from "./Graph.vue";
import { area, countyList } from "../composables/area";
export default {
  name: "DataLayer",
  components: { Graph },
  setup() {
    return { area };
  },
  data: () => ({
    info: {},
    county: {}
  }),
  created() {
    // this.loadData();
    this.loadCountyData();
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
    },
    combined() {
      let result = {};
      if (this.rolling7) {
        this.rolling7.forEach(val => {
          result[val.DATE] = {
            seven: val.rolling
          };
        });
      }
      if (this.rolling14) {
        this.rolling14.forEach(val => {
          result[val.DATE]["fourteen"] = val.rolling;
        });
      }
      return result;
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
    loadCountyData() {
      const vm = this;
      // Workaround cors
      const corsAnywhere = "https://cors-anywhere.herokuapp.com";

      const base = "https://hub.mph.in.gov/api/3/action/datastore_search";
      const resource = "resource_id=afaa225d-ac4e-4e80-9190-f6800c366b58";
      // const resource = "resource_id=afaa225d-ac4e-4e80-9190-f6800c366b58";
      fetch(`${corsAnywhere}/${base}?${resource}&q=Elkhart`, {})
        .then(res => res.json())
        .then(res => {
          vm.info = res.result;
        })
        .catch(err => {});
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
