// @ts-strict
"use strict";
import { ref } from "vue";

const ranges: number[] = [1, 7, 14];
interface Record {
  DATE: string;
  COVID_COUNT: string;
  COVID_TEST: string;
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
    let count = rollingWindow.reduce((acc: number, rec) => {
      return acc + parseInt(rec.COVID_COUNT);
    }, 0);
    let tests = rollingWindow.reduce((acc: number, rec) => {
      return acc + parseInt(rec.COVID_TEST);
    }, 0);
    let posTestPercent = (count / tests) * 100;
    let thisRecord = { ...dataframe.value[index - 1] };
    let date = new Date(thisRecord.DATE);
    let day: RollingRecord = { date: date.getTime(), count, tests };
    if (posTestPercent <= 100) {
      day.posTestPercent = posTestPercent;
    }
    result.push(day);
  }
  result = result.sort((a, b) => {
    return a[0] - b[0];
  });
  return result;
}

const selectedGraphType = ref<string>("count");

const graphTypes = ref<object[]>([
  { type: "count", key: "count" },
  { type: "tests", key: "tests" },
  { type: "positive test rate", key: "posTestPercent" },
]);

export { ranges, Record, calcRolling, selectedGraphType, graphTypes };
