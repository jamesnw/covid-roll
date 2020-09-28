<template>
  <GraphOptions />
  <div ref="graph" id="container">Graph</div>
  <div v-if="!hasData">Loading...</div>
</template>

<script lang="ts">
import GraphOptions from "./GraphOptions.vue";
import {
  selectedGraphType,
  graphTypes,
  GraphType
} from "../composables/shared";

import Highcharts from "highcharts";
import { computed } from "vue";
export default {
  name: "Graph",
  props: ["rolling", "area"],
  components: { GraphOptions },
  computed: {
    hasData() {
      return (
        this.rolling && this.rolling[0] && this.rolling[0].values.length > 0
      );
    }
  },
  setup() {
    const graphType: GraphType = computed(() => {
      return graphTypes.value.find(x => x.type === selectedGraphType.value);
    });
    return { selectedGraphType, graphTypes, graphType };
  },
  created() {
    this.$nextTick(() => {
      this.drawGraph();
    });
  },
  watch: {
    rolling() {
      this.$nextTick(() => {
        this.drawGraph();
      });
    },
    graphType() {
      this.$nextTick(() => {
        this.drawGraph();
      });
    }
  },
  methods: {
    drawGraph() {
      console.log("draw");
      if (!this.rolling) return;
      const series = this.rolling.map(single => {
        return {
          name: `${single.range} day rolling `,
          data: single.values.map(obj => [obj.date, obj[this.graphType.key]])
        };
      });
      Highcharts.chart("container", {
        title: {
          text: this.area + " Covid " + this.graphType.title
        },

        subtitle: {
          text: "Source: https://www.coronavirus.in.gov/"
        },

        yAxis: {
          title: {
            text: "Number of Positive Tests"
          }
        },

        xAxis: {
          type: "datetime",
          plotLines: [
            {
              value: new Date("March 23, 2020"),
              dashStyle: "solid",
              width: 1,
              color: "#d33",
              label: { text: "Stage 1" }
            },
            {
              value: new Date("May 4, 2020"),
              dashStyle: "solid",
              width: 1,
              color: "#d33",
              label: { text: "Stage 2" }
            },
            {
              value: new Date("May 22, 2020"),
              dashStyle: "solid",
              width: 1,
              color: "#d33",
              label: { text: "Stage 3" }
            },
            {
              value: new Date("June 12, 2020"),
              dashStyle: "solid",
              width: 1,
              color: "#d33",
              label: { text: "Stage 4" }
            },
            {
              value: new Date("July 4, 2020"),
              dashStyle: "dash",
              width: 1,
              color: "#d33",
              label: { text: "Stage 4.5" }
            }
          ]
        },

        tooltip: {
          shared: true,
          valueSuffix: this.graphType.tooltipSuffix,
          valueDecimals: 0
        },

        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },

        series,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      });
    }
  }
};
</script>

<style>
</style>