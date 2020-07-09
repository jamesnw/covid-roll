// @ts-strict
"use strict";
import { ref, Ref } from "vue";

const ranges: number[] = [1, 7, 14];
interface Record {
  date: string;
  m1e_covid_cases: string;
  m1e_covid_tests: string;
  m1e_covid_deaths: string;
  rolling?: number;
}
interface RollingRecord {
  date: number;
  count: number;
  tests: number;
  posTestPercent?: number;
}
function calcRolling(range: number, dataframe: any): object[] {
  let result = [];
  for (let index = range; index <= dataframe.value.length; index++) {
    let rollingWindow = dataframe.value.slice(index - range, index);
    let count = rollingWindow.reduce((acc: number, rec: Record) => {
      return acc + parseInt(rec.m1e_covid_cases);
    }, 0);
    let tests = rollingWindow.reduce((acc: number, rec: Record) => {
      return acc + parseInt(rec.m1e_covid_tests);
    }, 0);
    let posTestPercent = (count / tests) * 100;
    let thisRecord : Record = { ...dataframe.value[index - 1] };
    let date = new Date(thisRecord.date);
    let day: RollingRecord = { date: date.getTime(), count, tests };
    if (posTestPercent <= 100) {
      day.posTestPercent = posTestPercent;
    }
    result.push(day);
  }
  return result;
}

function getSums(dataframe: Ref, population: number): 
  {positiveTests: number, deaths: number, percentInfected} 
  {
  const value : Object[] = dataframe.value;
  const positiveTests = value.reduce<number>((sum, day:Record)=>{
    return sum + parseInt(day.m1e_covid_cases)
  }, 0);
  const deaths = value.reduce<number>((sum, day:Record)=>{
    return sum + parseInt(day.m1e_covid_deaths)
  }, 0);
  const percentInfected = positiveTests/population;
  return {
    positiveTests,
    deaths,
    percentInfected
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
