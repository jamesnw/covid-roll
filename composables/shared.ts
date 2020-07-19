// @ts-strict
"use strict";
import { ref, Ref } from "vue";

const ranges: number[] = [1, 7, 14];
interface Record {
  DATE: string;
  COVID_COUNT: string;
  COVID_TEST: string;
  COVID_DEATHS: string;
  rolling?: number;
}
interface RollingRecord {
  date: number;
  count: number;
  tests: number;
  posTestPercent?: number;
  [propName: string]: any;
}
function calcRolling(range: number, dataframe: any): object[] {
  let result = [];

  for (let index = range; index <= dataframe.value.length; index++) {
    let rollingWindow = dataframe.value.slice(index - range, index);
    let count = rollingWindow.reduce((acc: number, rec) => {
      return acc + parseInt(rec.COVID_COUNT);
    }, 0);
    let tests = rollingWindow.reduce((acc: number, rec) => {
      return acc + parseInt(rec.COVID_TEST);
    }, 0);
    let posTestPercent = (count / tests) * 100;
    let thisRecord = { ...dataframe.value[index - 1] };
    let date = new Date(thisRecord.DATE);
    let day: RollingRecord = { 
      date: date.getTime(),
      count: count / range,
      tests: tests / range
    };
    if (posTestPercent <= 100) {
      day.posTestPercent = posTestPercent;
    }
    result.push(day);
  }
  return result;
}

function getSums(dataframe: Ref, population: number, dfRolling: Ref): 
  {positiveTests: number, deaths: number, percentInfected: number, percentPositive: number} 
  {
  const value : Object[] = dataframe.value;
  const positiveTests = value.reduce<number>((sum, day:Record)=>{
    return sum + parseInt(day.COVID_COUNT)
  }, 0);
  const deaths = value.reduce<number>((sum, day:Record)=>{
    return sum + parseInt(day.COVID_DEATHS)
  }, 0);
  const percentInfected = positiveTests/population;
  let percentPositive = 0;
  if(dfRolling && dfRolling.value[1] && dfRolling.value[1].values.length){
    const vals = dfRolling.value[1].values;
    const count = Object.keys(vals).length;
    percentPositive = vals[count - 4].posTestPercent;
  }
  return {
    positiveTests,
    deaths,
    percentInfected,
    percentPositive
  }
}

const selectedGraphType = ref<string>("count");
interface GraphType {
  type: String;
  key: String;
  title: String;
  tooltipSuffix?: String;
}
const graphTypes = ref<GraphType[]>([
  { type: "count", key: "count", title: "Positive Tests" },
  { type: "tests", key: "tests", title: "Total Tests" },
  {
    type: "positive test rate",
    key: "posTestPercent",
    title: "Positive Test Percent",
    tooltipSuffix: "%",
  },
]);

export { ranges, Record, calcRolling, selectedGraphType, graphTypes, getSums };
