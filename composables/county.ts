// @ts-check
import { ref, watchEffect } from "vue";

const ranges: Number[] = [1, 7, 14];

const area = ref<string>("Elkhart");

// @todo Get list of all counties
const countyList = ref<string[]>(["Adams", "Elkhart", "Marion"]);

interface Record {
  DATE: string;
  COVID_COUNT: string;
  rolling?: number;
}
const dataframe = ref<Record[]>([]);
const dfRolling = ref<object[]>([]);

// Initial load
loadCounty(area.value);

function cleanData(data) {
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

function calcRolling(range) {
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
function calcAllRolling() {
  return ranges.map((range) => {
    return { range, values: calcRolling(range) };
  });
}

watchEffect(() => {
  dfRolling.value = calcAllRolling();
});

export { area, countyList, dataframe, dfRolling };
