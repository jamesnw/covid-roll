// @ts-strict
"use strict";
import { ref } from "vue";
import { ranges, Record } from "./shared";

const dataframe = ref<Record[]>([]);
const dfRolling = ref<object[]>([]);

function cleanData(data: Record[]): Record[] {
  let x = data.filter((record) => {
    let date = new Date(record.DATE);
    return date >= new Date("3/1/2020");
  });
  return x;
}
loadState().then(() => {
  dfRolling.value = calcAllRolling();
});
async function loadState() {
  // Workaround cors
  const corsAnywhere = "https://cors-anywhere.herokuapp.com";

  const base = "https://hub.mph.in.gov/api/3/action/datastore_search_sql";
  const resource = "182b6742-edac-442d-8eeb-62f96b17773e";
  const sql = `sql=SELECT * FROM "${resource}"`;
  // const resource = "resource_id=afaa225d-ac4e-4e80-9190-f6800c366b58";
  return await fetch(`${corsAnywhere}/${base}?${sql}`, {})
    .then((res) => res.json())
    .then((res) => {
      dataframe.value = cleanData(res.result.records);
    })
    .catch((err) => {});
}

function calcRolling(range: number): object[] {
  let result = [];

  for (let index = range; index <= dataframe.value.length; index++) {
    let rollingWindow = dataframe.value.slice(index - range, index);
    let count = rollingWindow.reduce((acc: number, rec) => {
      return acc + parseInt(rec.COVID_COUNT);
    }, 0);
    let thisRecord = { ...dataframe.value[index - 1] };
    let date = new Date(thisRecord.DATE);
    let day = [date.getTime(), count];
    result.push(day);
  }
  result = result.sort((a, b) => {
    return a[0] - b[0];
  });
  return result;
}
function calcAllRolling(): object[] {
  return ranges.map((range) => {
    return { range, values: calcRolling(range) };
  });
}

export { dataframe, dfRolling };
