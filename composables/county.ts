// @ts-strict
"use strict";
import { ref, watchEffect } from "vue";
import { ranges, Record, calcRolling, getSums} from "./shared";

const area = ref<string>("ELKHART");

interface County {
  name: string;
  population: number;
  key: string;
}

const countyList = ref<County[]>([
  {key: "ADAMS", name: "Adams County", population: 35195},
  {key: "ALLEN", name: "Allen County", population: 370016},
  {key: "BARTHOLOMEW", name: "Bartholomew County", population: 81893},
  {key: "BENTON", name: "Benton County", population: 8667},
  {key: "BLACKFORD", name: "Blackford County", population: 12129},
  {key: "BOONE", name: "Boone County", population: 64321},
  {key: "BROWN", name: "Brown County", population: 15034},
  {key: "CARROLL", name: "Carroll County", population: 19994},
  {key: "CASS", name: "Cass County", population: 38084},
  {key: "CLARK", name: "Clark County", population: 115702},
  {key: "CLAY", name: "Clay County", population: 26268},
  {key: "CLINTON", name: "Clinton County", population: 32301},
  {key: "CRAWFORD", name: "Crawford County", population: 10581},
  {key: "DAVIESS", name: "Daviess County", population: 32937},
  {key: "DEARBORN", name: "Dearborn County", population: 49501},
  {key: "DECATUR", name: "Decatur County", population: 26552},
  {key: "DEKALB", name: "DeKalb County", population: 42704},
  {key: "DELAWARE", name: "Delaware County", population: 115616},
  {key: "DUBOIS", name: "Dubois County", population: 42418},
  {key: "ELKHART", name: "Elkhart County", population: 203604},
  {key: "FAYETTE", name: "Fayette County", population: 23259},
  {key: "FLOYD", name: "Floyd County", population: 76809},
  {key: "FOUNTAIN", name: "Fountain County", population: 16486},
  {key: "FRANKLIN", name: "Franklin County", population: 22842},
  {key: "FULTON", name: "Fulton County", population: 20212},
  {key: "GIBSON", name: "Gibson County", population: 33596},
  {key: "GRANT", name: "Grant County", population: 66944},
  {key: "GREENE", name: "Greene County", population: 32295},
  {key: "HAMILTON", name: "Hamilton County", population: 316095},
  {key: "HANCOCK", name: "Hancock County", population: 73830},
  {key: "HARRISON", name: "Harrison County", population: 39712},
  {key: "HENDRICKS", name: "Hendricks County", population: 160940},
  {key: "HENRY", name: "Henry County", population: 48483},
  {key: "HOWARD", name: "Howard County", population: 82387},
  {key: "HUNTINGTON", name: "Huntington County", population: 36378},
  {key: "JACKSON", name: "Jackson County", population: 43938},
  {key: "JASPER", name: "Jasper County", population: 33449},
  {key: "JAY", name: "Jay County", population: 20993},
  {key: "JEFFERSON", name: "Jefferson County", population: 32237},
  {key: "JENNINGS", name: "Jennings County", population: 27727},
  {key: "JOHNSON", name: "Johnson County", population: 151564},
  {key: "KNOX", name: "Knox County", population: 37409},
  {key: "KOSCIUSKO", name: "Kosciusko County", population: 78806},
  {key: "LAGRANGE", name: "LaGrange County", population: 38942},
  {key: "LAKE", name: "Lake County", population: 486849},
  {key: "LAPORTE", name: "LaPorte County", population: 110552},
  {key: "LAWRENCE", name: "Lawrence County", population: 45619},
  {key: "MADISON", name: "Madison County", population: 129505},
  {key: "MARION", name: "Marion County", population: 944523},
  {key: "MARSHALL", name: "Marshall County", population: 46595},
  {key: "MARTIN", name: "Martin County", population: 10210},
  {key: "MIAMI", name: "Miami County", population: 35901},
  {key: "MONROE", name: "Monroe County", population: 145403},
  {key: "MONTGOMERY", name: "Montgomery County", population: 38276},
  {key: "MORGAN", name: "Morgan County", population: 69727},
  {key: "NEWTON", name: "Newton County", population: 14018},
  {key: "NOBLE", name: "Noble County", population: 47451},
  {key: "OHIO", name: "Ohio County", population: 5887},
  {key: "ORANGE", name: "Orange County", population: 19547},
  {key: "OWEN", name: "Owen County", population: 20878},
  {key: "PARKE", name: "Parke County", population: 16996},
  {key: "PERRY", name: "Perry County", population: 19141},
  {key: "PIKE", name: "Pike County", population: 12411},
  {key: "PORTER", name: "Porter County", population: 168041},
  {key: "POSEY", name: "Posey County", population: 25589},
  {key: "PULASKI", name: "Pulaski County", population: 12660},
  {key: "PUTNAM", name: "Putnam County", population: 37559},
  {key: "RANDOLPH", name: "Randolph County", population: 25076},
  {key: "RIPLEY", name: "Ripley County", population: 28425},
  {key: "RUSH", name: "Rush County", population: 16704},
  {key: "SCOTT", name: "Scott County", population: 23743},
  {key: "SHELBY", name: "Shelby County", population: 44399},
  {key: "SPENCER", name: "Spencer County", population: 20526},
  {key: "ST JOSEPH", name:"St. Joseph County", population: 269240},
  {key: "STARKE", name: "Starke County", population: 22941},
  {key: "STEUBEN", name: "Steuben County", population: 34474},
  {key: "SULLIVAN", name: "Sullivan County", population: 20792},
  {key: "SWITZERLAND", name: "Switzerland County", population: 10628},
  {key: "TIPPECANOE", name: "Tippecanoe County", population: 189294},
  {key: "TIPTON", name: "Tipton County", population: 15218},
  {key: "UNION", name: "Union County", population: 7153},
  {key: "VANDERBURGH", name: "Vanderburgh County", population: 181313},
  {key: "VERMILLION", name: "Vermillion County", population: 15560},
  {key: "VIGO", name: "Vigo County", population: 107693},
  {key: "WABASH", name: "Wabash County", population: 31631},
  {key: "WARREN", name: "Warren County", population: 8247},
  {key: "WARRICK", name: "Warrick County", population: 61928},
  {key: "WASHINGTON", name: "Washington County", population: 27827},
  {key: "WAYNE", name: "Wayne County", population: 66613},
  {key: "WELLS", name: "Wells County", population: 27947},
  {key: "WHITE", name: "White County", population: 24217},
  {key: "WHITLEY", name: "Whitley County", population: 33649},
]);

const dataframe = ref<Record[]>([]);
const dfRolling = ref<object[]>([]);

function cleanData(data: Record[]): Record[] {
  data = data.map((record: Record) =>{
    record.COVID_COUNT = record.COVID_COUNT || record.m1e_covid_cases;
    record.COVID_TEST = record.COVID_TEST || record.m1e_covid_tests;
    record.COVID_DEATHS = record.COVID_DEATHS || record.m1e_covid_deaths;
    record.DATE = record.DATE || record.date;
    return record;
  })
  let x = data.filter((record) => {
    let date = new Date(record.DATE);
    return date >= new Date("3/1/2020");
  });
  x = x.sort((a, b)=>{
    return new Date(a.DATE).getTime() - new Date(b.DATE).getTime();
  })
  return x;
}
function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}
async function loadCounty(county: string, useTitleCase = false, useLowerCounty = false) {
  // Workaround cors
  const corsAnywhere = "https://cors-anywhere.herokuapp.com";

  const base = "https://hub.mph.in.gov/api/3/action/datastore_search_sql";
  const resource = "afaa225d-ac4e-4e80-9190-f6800c366b58";
  if(useTitleCase){
    county = titleCase(county);
  }
  const fieldName = useLowerCounty ? 'county_name' : 'COUNTY_NAME';
  const sql = `sql=SELECT * FROM "${resource}" WHERE "${fieldName}" LIKE '${county}'`;
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
  if(dataframe.value.length === 0){
    await loadCounty(area.value, true);
  }
  if(dataframe.value.length === 0){
    await loadCounty(area.value, true, true);
  }
});

function calcAllRolling(): object[] {
  return ranges.map((range) => {
    return { range, values: calcRolling(range, dataframe) };
  });
}
const sums = ref<Object>({});

watchEffect(() => {
  dfRolling.value = calcAllRolling();
  const {population} = countyList.value.find(c=>c.key === area.value)
  sums.value = getSums(dataframe,population);
});

export { area, countyList, dataframe, dfRolling, sums };
