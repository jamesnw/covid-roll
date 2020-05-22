<template>
  <div ref="graph" id="container" @click="drawGraph">Graph</div>
</template>

<script>
import Highcharts from "highcharts/es-modules/masters/highcharts.src";
export default {
  props: {
    days14: {
      type: Array,
      default: () => {
        [];
      }
    },
    days7: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      data: undefined
    };
  },
  created() {
    this.$nextTick(() => {
      this.drawGraph();
    });
  },
  watch: {
    days7() {
      this.$nextTick(() => {
        this.drawGraph();
      });
    },
    days14() {
      this.$nextTick(() => {
        this.drawGraph();
      });
    }
  },
  methods: {
    drawGraph() {
      console.log("draw");
      if (!this.days14) return;
      //   let numbers = this.days.map(day => day.rolling);
      //   let legend = this.days.map(day => {
      //     x = new Date(day.date);
      //     return x.getTime();
      //   });
      let data14 = this.days14.map(day => {
        let x = new Date(day.DATE);
        return [x.getTime(), day.rolling];
      });
      let data7 = this.days7.map(day => {
        let x = new Date(day.DATE);
        return [x.getTime(), day.rolling];
      });
      let daily = this.days7.map(day => {
        let x = new Date(day.DATE);
        return [x.getTime(), day.COVID_COUNT];
      });
      this.data = { data14, data7 };
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

        series: [
          {
            name: "14 day rolling",
            data: data14
          },
          {
            name: "7 day rolling",
            data: data7
          },
          {
            name: "daily",
            data: daily
          }
        ],

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