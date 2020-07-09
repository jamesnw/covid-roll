// @ts-strict
"use strict";
import { ref, watchEffect } from "vue";
import { ranges, Record, calcRolling, getSums} from "./shared";

const area = ref<string>("Elkhart");

interface County {
  name: string;
  population: number;
  key: string;
}

const countyList = ref<County[]>([
  {
    "key": "Adams",
    "name": "Adams County",
    "population": 35195
  },
  {
    "key": "Allen",
    "name": "Allen County",
    "population": 370016
  },
  {
    "key": "Bartholomew",
    "name": "Bartholomew County",
    "population": 81893
  },
  {
    "key": "Benton",
    "name": "Benton County",
    "population": 8667
  },
  {
    "key": "Blackford",
    "name": "Blackford County",
    "population": 12129
  },
  {
    "key": "Boone",
    "name": "Boone County",
    "population": 64321
  },
  {
    "key": "Brown",
    "name": "Brown County",
    "population": 15034
  },
  {
    "key": "Carroll",
    "name": "Carroll County",
    "population": 19994
  },
  {
    "key": "Cass",
    "name": "Cass County",
    "population": 38084
  },
  {
    "key": "Clark",
    "name": "Clark County",
    "population": 115702
  },
  {
    "key": "Clay",
    "name": "Clay County",
    "population": 26268
  },
  {
    "key": "Clinton",
    "name": "Clinton County",
    "population": 32301
  },
  {
    "key": "Crawford",
    "name": "Crawford County",
    "population": 10581
  },
  {
    "key": "Daviess",
    "name": "Daviess County",
    "population": 32937
  },
  {
    "key": "Dearborn",
    "name": "Dearborn County",
    "population": 49501
  },
  {
    "key": "Decatur",
    "name": "Decatur County",
    "population": 26552
  },
  {
    "key": "Dekalb",
    "name": "DeKalb County",
    "population": 42704
  },
  {
    "key": "Delaware",
    "name": "Delaware County",
    "population": 115616
  },
  {
    "key": "Dubois",
    "name": "Dubois County",
    "population": 42418
  },
  {
    "key": "Elkhart",
    "name": "Elkhart County",
    "population": 203604
  },
  {
    "key": "Fayette",
    "name": "Fayette County",
    "population": 23259
  },
  {
    "key": "Floyd",
    "name": "Floyd County",
    "population": 76809
  },
  {
    "key": "Fountain",
    "name": "Fountain County",
    "population": 16486
  },
  {
    "key": "Franklin",
    "name": "Franklin County",
    "population": 22842
  },
  {
    "key": "Fulton",
    "name": "Fulton County",
    "population": 20212
  },
  {
    "key": "Gibson",
    "name": "Gibson County",
    "population": 33596
  },
  {
    "key": "Grant",
    "name": "Grant County",
    "population": 66944
  },
  {
    "key": "Greene",
    "name": "Greene County",
    "population": 32295
  },
  {
    "key": "Hamilton",
    "name": "Hamilton County",
    "population": 316095
  },
  {
    "key": "Hancock",
    "name": "Hancock County",
    "population": 73830
  },
  {
    "key": "Harrison",
    "name": "Harrison County",
    "population": 39712
  },
  {
    "key": "Hendricks",
    "name": "Hendricks County",
    "population": 160940
  },
  {
    "key": "Henry",
    "name": "Henry County",
    "population": 48483
  },
  {
    "key": "Howard",
    "name": "Howard County",
    "population": 82387
  },
  {
    "key": "Huntington",
    "name": "Huntington County",
    "population": 36378
  },
  {
    "key": "Jackson",
    "name": "Jackson County",
    "population": 43938
  },
  {
    "key": "Jasper",
    "name": "Jasper County",
    "population": 33449
  },
  {
    "key": "Jay",
    "name": "Jay County",
    "population": 20993
  },
  {
    "key": "Jefferson",
    "name": "Jefferson County",
    "population": 32237
  },
  {
    "key": "Jennings",
    "name": "Jennings County",
    "population": 27727
  },
  {
    "key": "Johnson",
    "name": "Johnson County",
    "population": 151564
  },
  {
    "key": "Knox",
    "name": "Knox County",
    "population": 37409
  },
  {
    "key": "Kosciusko",
    "name": "Kosciusko County",
    "population": 78806
  },
  {
    "key": "Lagrange",
    "name": "LaGrange County",
    "population": 38942
  },
  {
    "key": "Lake",
    "name": "Lake County",
    "population": 486849
  },
  {
    "key": "Laporte",
    "name": "LaPorte County",
    "population": 110552
  },
  {
    "key": "Lawrence",
    "name": "Lawrence County",
    "population": 45619
  },
  {
    "key": "Madison",
    "name": "Madison County",
    "population": 129505
  },
  {
    "key": "Marion",
    "name": "Marion County",
    "population": 944523
  },
  {
    "key": "Marshall",
    "name": "Marshall County",
    "population": 46595
  },
  {
    "key": "Martin",
    "name": "Martin County",
    "population": 10210
  },
  {
    "key": "Miami",
    "name": "Miami County",
    "population": 35901
  },
  {
    "key": "Monroe",
    "name": "Monroe County",
    "population": 145403
  },
  {
    "key": "Montgomery",
    "name": "Montgomery County",
    "population": 38276
  },
  {
    "key": "Morgan",
    "name": "Morgan County",
    "population": 69727
  },
  {
    "key": "Newton",
    "name": "Newton County",
    "population": 14018
  },
  {
    "key": "Noble",
    "name": "Noble County",
    "population": 47451
  },
  {
    "key": "Ohio",
    "name": "Ohio County",
    "population": 5887
  },
  {
    "key": "Orange",
    "name": "Orange County",
    "population": 19547
  },
  {
    "key": "Owen",
    "name": "Owen County",
    "population": 20878
  },
  {
    "key": "Parke",
    "name": "Parke County",
    "population": 16996
  },
  {
    "key": "Perry",
    "name": "Perry County",
    "population": 19141
  },
  {
    "key": "Pike",
    "name": "Pike County",
    "population": 12411
  },
  {
    "key": "Porter",
    "name": "Porter County",
    "population": 168041
  },
  {
    "key": "Posey",
    "name": "Posey County",
    "population": 25589
  },
  {
    "key": "Pulaski",
    "name": "Pulaski County",
    "population": 12660
  },
  {
    "key": "Putnam",
    "name": "Putnam County",
    "population": 37559
  },
  {
    "key": "Randolph",
    "name": "Randolph County",
    "population": 25076
  },
  {
    "key": "Ripley",
    "name": "Ripley County",
    "population": 28425
  },
  {
    "key": "Rush",
    "name": "Rush County",
    "population": 16704
  },
  {
    "key": "Scott",
    "name": "Scott County",
    "population": 23743
  },
  {
    "key": "Shelby",
    "name": "Shelby County",
    "population": 44399
  },
  {
    "key": "Spencer",
    "name": "Spencer County",
    "population": 20526
  },
  {
    "key": "St Joseph",
    "name": "St. Joseph County",
    "population": 269240
  },
  {
    "key": "Starke",
    "name": "Starke County",
    "population": 22941
  },
  {
    "key": "Steuben",
    "name": "Steuben County",
    "population": 34474
  },
  {
    "key": "Sullivan",
    "name": "Sullivan County",
    "population": 20792
  },
  {
    "key": "Switzerland",
    "name": "Switzerland County",
    "population": 10628
  },
  {
    "key": "Tippecanoe",
    "name": "Tippecanoe County",
    "population": 189294
  },
  {
    "key": "Tipton",
    "name": "Tipton County",
    "population": 15218
  },
  {
    "key": "Union",
    "name": "Union County",
    "population": 7153
  },
  {
    "key": "Vanderburgh",
    "name": "Vanderburgh County",
    "population": 181313
  },
  {
    "key": "Vermillion",
    "name": "Vermillion County",
    "population": 15560
  },
  {
    "key": "Vigo",
    "name": "Vigo County",
    "population": 107693
  },
  {
    "key": "Wabash",
    "name": "Wabash County",
    "population": 31631
  },
  {
    "key": "Warren",
    "name": "Warren County",
    "population": 8247
  },
  {
    "key": "Warrick",
    "name": "Warrick County",
    "population": 61928
  },
  {
    "key": "Washington",
    "name": "Washington County",
    "population": 27827
  },
  {
    "key": "Wayne",
    "name": "Wayne County",
    "population": 66613
  },
  {
    "key": "Wells",
    "name": "Wells County",
    "population": 27947
  },
  {
    "key": "White",
    "name": "White County",
    "population": 24217
  },
  {
    "key": "Whitley",
    "name": "Whitley County",
    "population": 33649
  }
]);

const dataframe = ref<Record[]>([]);
const dfRolling = ref<object[]>([]);

// Initial load
loadCounty(area.value);

function cleanData(data: Record[]): Record[] {
  let x = data.filter((record) => {
    let date = new Date(record.date);
    return date >= new Date("3/1/2020");
  });
  x = x.sort((a, b)=>{
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  return x;
}
async function loadCounty(county: string) {
  // Workaround cors
  const corsAnywhere = "https://cors-anywhere.herokuapp.com";

  const base = "https://hub.mph.in.gov/api/3/action/datastore_search_sql";
  const resource = "afaa225d-ac4e-4e80-9190-f6800c366b58";

  const sql = `sql=SELECT * FROM "${resource}" WHERE "county_name" LIKE '${county}'`;
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

function calcAllRolling(): object[] {
  return ranges.map((range) => {
    return { range, values: calcRolling(range, dataframe) };
  });
}
const sums = ref<Object>({});

watchEffect(() => {
  dfRolling.value = calcAllRolling();
  const {population} = countyList.value.find(c=>c.key.toLowerCase() === area.value.toLowerCase())
  sums.value = getSums(dataframe,population);
  console.log(sums.value)
});

export { area, countyList, dataframe, dfRolling, sums };
