<template>
  <div ref="graph" id="container">Graph</div>
  <div v-if="!hasData">Loading...</div>
</template>

<script>
import { dfRolling } from "../composables/county.ts";
import Highcharts from "highcharts/es-modules/masters/highcharts.src";
export default {
  setup() {
    return { dfRolling };
  },
  computed: {
    hasData() {
      return dfRolling.value[0].values.length > 0;
    }
  },
  created() {
    this.$nextTick(() => {
      this.drawGraph();
    });
  },
  watch: {
    dfRolling() {
      this.$nextTick(() => {
        this.drawGraph();
      });
    }
  },
  methods: {
    drawGraph() {
      console.log("draw");
      if (!dfRolling.value) return;
      const series = dfRolling.value.map(single => {
        return {
          name: `${single.range} day rolling`,
          data: single.values
        };
      });
      Highcharts.chart("container", {
        title: {
          text: "Indiana Covid Positive Tests"
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
              dashStyle: "dash",
              width: 1,
              color: "#d33",
              label: { text: "Stage 3" }
            }
          ]
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