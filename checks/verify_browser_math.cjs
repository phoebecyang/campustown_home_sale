// Compare the actual browser calculation functions with independently computed SQLite results.
const assert = require('node:assert/strict');
const {median,summarize,selectRows} = require('../app.js');
const rows = require('../data/champaign_urbana.json');
const expected = require('./expected_metrics.json');
let comparisons=0;
for(const bedroom of Object.keys(expected)) for(const city of ['Champaign','Urbana']) {
  const actual=summarize(selectRows(rows,bedroom).filter(r=>r.city===city));
  for(const key of Object.keys(expected[bedroom][city])) {
    assert.equal(actual[key],expected[bedroom][city][key],`${bedroom}/${city}/${key}`); comparisons++;
  }
}
assert.equal(median([]),null);
assert.equal(median([1,3]),2);
assert.deepEqual(summarize([]),{count:0,price:null,area:null,ppsf:null,areaCount:0,days:null,daysCount:0});
const invalid=[{sale_price:100000,living_area_sqft:0,list_date:'',contract_date:''}];
assert.equal(summarize(invalid).ppsf,null);
assert.equal(summarize(invalid).days,null);
console.log(`Passed ${comparisons} independent metric comparisons, plus empty/missing-data checks.`);
