// @ts-strict
"use strict";
import { ref } from "vue";
import { ranges, Record, calcRolling, getSums } from "./shared";

const dataframe = ref<Record[]>([]);
const dfRolling = ref<object[]>([]);
const sums = ref<Object>({});

function cleanData(data: Record[]): Record[] {
  let x = data.filter((record) => {
    let date = new Date(record.DATE);
    return date >= new Date("3/1/2020");
  });
  return x;
}

loadState().then(() => {
  dfRolling.value = calcAllRolling();
  const population = 6732219; // From wikipedia/census 2019
  debugger;
  sums.value = getSums(dataframe,population, dfRolling);
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

function calcAllRolling(): object[] {
  return ranges.map((range) => {
    return { range, values: calcRolling(range, dataframe) };
  });
}

export { dataframe, dfRolling, sums };
