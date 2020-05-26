// @ts-strict
"use strict";
import { ref, watchEffect } from "vue";

const ranges: number[] = [1, 7, 14];

const area = ref<string>("ELKHART");

// @todo Get list of all counties
const countyList = ref<string[]>([
  "ADAMS",
  "ALLEN",
  "BARTHOLOMEW",
  "BENTON",
  "BLACKFORD",
  "BOONE",
  "BROWN",
  "CARROLL",
  "CASS",
  "CLARK",
  "CLAY",
  "CLINTON",
  "CRAWFORD",
  "DAVIESS",
  "DEARBORN",
  "DECATUR",
  "DEKALB",
  "DELAWARE",
  "DUBOIS",
  "ELKHART",
  "FAYETTE",
  "FLOYD",
  "FOUNTAIN",
  "FRANKLIN",
  "FULTON",
  "GIBSON",
  "GRANT",
  "GREENE",
  "HAMILTON",
  "HANCOCK",
  "HARRISON",
  "HENDRICKS",
  "HENRY",
  "HOWARD",
  "HUNTINGTON",
  "JACKSON",
  "JASPER",
  "JAY",
  "JEFFERSON",
  "JENNINGS",
  "JOHNSON",
  "KNOX",
  "KOSCIUSKO",
  "LAGRANGE",
  "LAKE",
  "LAPORTE",
  "LAWRENCE",
  "MADISON",
  "MARION",
  "MARSHALL",
  "MARTIN",
  "MIAMI",
  "MONROE",
  "MONTGOMERY",
  "MORGAN",
  "NEWTON",
  "NOBLE",
  "OHIO",
  "ORANGE",
  "OWEN",
  "PARKE",
  "PERRY",
  "PIKE",
  "PORTER",
  "POSEY",
  "PULASKI",
  "PUTNAM",
  "RANDOLPH",
  "RIPLEY",
  "RUSH",
  "SCOTT",
  "SHELBY",
  "SPENCER",
  "ST JOSEPH",
  "STARKE",
  "STEUBEN",
  "SULLIVAN",
  "SWITZERLAND",
  "TIPPECANOE",
  "TIPTON",
  "UNION",
  "VANDERBURGH",
  "VERMILLION",
  "VIGO",
  "WABASH",
  "WARREN",
  "WARRICK",
  "WASHINGTON",
  "WAYNE",
  "WELLS",
  "WHITE",
  "WHITLEY",
]);

interface Record {
  DATE: string;
  COVID_COUNT: string;
  rolling?: number;
}
const dataframe = ref<Record[]>([]);
const dfRolling = ref<object[]>([]);

// Initial load
loadCounty(area.value);

function cleanData(data: Record[]): Record[] {
  let x = data.filter((record) => {
    let date = new Date(record.DATE);
    return date >= new Date("3/1/2020");
  });
  return x;
}
async function loadCounty(county: string) {
  // Workaround cors
  const corsAnywhere = "https://cors-anywhere.herokuapp.com";

  const base = "https://hub.mph.in.gov/api/3/action/datastore_search_sql";
  const resource = "afaa225d-ac4e-4e80-9190-f6800c366b58";
  county = county.toUpperCase();
  const sql = `sql=SELECT * FROM "${resource}" WHERE "COUNTY_NAME" LIKE '${county}'`;
  // const resource = "resource_id=afaa225d-ac4e-4e80-9190-f6800c366b58";
  return await fetch(`${corsAnywhere}/${base}?${sql}`, {})
    .then((res) => res.json())
    .then((res) => {
      dataframe.value = cleanData(res.result.records);
    })
    .catch((err) => {});
}

watchEffect(async () => {
  dataframe.value = [];
  await loadCounty(area.value);
});

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
  return result;
}
function calcAllRolling(): object[] {
  return ranges.map((range) => {
    return { range, values: calcRolling(range) };
  });
}

watchEffect(() => {
  dfRolling.value = calcAllRolling();
});

export { area, countyList, dataframe, dfRolling };
