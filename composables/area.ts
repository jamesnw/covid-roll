// @ts-check
import { ref, watchEffect } from "vue";

const ranges: Number[] = [1, 7, 14];

const area = ref<String>("Elkhart");

// @todo Get list of all counties
const countyList = ref<String[]>(["St. Joseph", "Elkhart", "Marion"]);

const dataframe = ref<Object[]>([]);
// Initial load
loadCounty(area.value);

async function loadCounty(county: String) {
  // Workaround cors
  const corsAnywhere = "https://cors-anywhere.herokuapp.com";

  const base = "https://hub.mph.in.gov/api/3/action/datastore_search";
  const resource = "resource_id=afaa225d-ac4e-4e80-9190-f6800c366b58";
  // const resource = "resource_id=afaa225d-ac4e-4e80-9190-f6800c366b58";
  return await fetch(`${corsAnywhere}/${base}?${resource}&q=${county}`, {})
    .then((res) => res.json())
    .then((res) => {
      dataframe.value = res.result.records;
    })
    .catch((err) => {});
}

watchEffect(async () => {
  dataframe.value = [];
  await loadCounty(area.value);
});

watchEffect(() => {});

export { area, countyList, dataframe };
