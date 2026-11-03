'use strict';
const CITIES = ['Champaign', 'Urbana'];
const median = values => {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};
const money = value => value === null ? 'No data' : new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
const number = value => value === null ? 'No data' : new Intl.NumberFormat('en-US',{maximumFractionDigits:1}).format(value);
function summarize(rows) {
  const areas = rows.filter(r => Number.isFinite(r.living_area_sqft) && r.living_area_sqft > 0);
  const days = rows.filter(r => r.list_date && r.contract_date).map(r => (Date.parse(r.contract_date) - Date.parse(r.list_date)) / 86400000).filter(v => Number.isFinite(v) && v >= 0);
  return {count:rows.length, price:median(rows.map(r=>r.sale_price)), area:median(areas.map(r=>r.living_area_sqft)), ppsf:median(areas.map(r=>r.sale_price/r.living_area_sqft)), areaCount:areas.length, days:median(days), daysCount:days.length};
}
function selectRows(rows, bedrooms) {
  return rows.filter(r => r.sale_price >= 10000 && r.sale_price <= 5000000 && (bedrooms === 'all' || (bedrooms === '5' ? r.beds >= 5 : r.beds === Number(bedrooms))));
}
function bars(id, summaries, key, format) {
  const max = Math.max(...summaries.map(s => s[key] || 0));
  document.getElementById(id).innerHTML = summaries.map((s,i) => `<div class="bar-row"><div class="bar-label"><span>${CITIES[i]}</span><strong>${format(s[key])}</strong></div><div class="track" aria-hidden="true"><div class="bar ${CITIES[i].toLowerCase()}" style="width:${max && s[key] !== null ? 100*s[key]/max : 0}%"></div></div><div class="sample">${number(key === 'area' ? s.areaCount : s.count)} sales with usable data</div></div>`).join('');
}
let sourceRows = [];
function render() {
  const bedrooms = document.getElementById('bedrooms').value;
  const included = selectRows(sourceRows, bedrooms);
  const summaries = CITIES.map(city => summarize(included.filter(r=>r.city === city)));
  const dates = included.map(r=>r.sale_date).filter(Boolean).sort();
  const excluded = sourceRows.filter(r=>r.sale_price < 10000 || r.sale_price > 5000000).length;
  document.getElementById('scope').textContent = `${number(included.length)} sales included · ${bedrooms === 'all' ? 'All bedrooms' : bedrooms === '5' ? '5+ bedrooms' : bedrooms+' bedroom'+(bedrooms === '1' ? '' : 's')} · Closed ${dates.length ? dates[0]+' to '+dates[dates.length-1] : 'date unavailable'} · ${excluded} price ${excluded === 1 ? 'outlier' : 'outliers'} excluded across both cities before bedroom filtering.`;
  document.getElementById('cards').innerHTML = summaries.map((s,i) => `<article class="city-card ${CITIES[i].toLowerCase()}-card"><div class="card-heading"><h3>${CITIES[i]}</h3><span class="pill">${number(s.count)} sales</span></div><p class="price">${money(s.price)}</p><p class="metric-label">median sale price</p><div class="card-metrics"><div><strong>${money(s.ppsf)}</strong><small>median / sq ft · n=${number(s.areaCount)}</small></div><div><strong>${number(s.days)}${s.days === null ? '' : ' days'}</strong><small>median on market · n=${number(s.daysCount)}</small></div></div></article>`).join('');
  const [a,b] = summaries;
  let takeaway = 'There are not enough sales to compare median prices for this selection.';
  if (a.price !== null && b.price !== null) {
    const gap = Math.abs(a.price-b.price);
    const lower = Math.min(a.price,b.price);
    takeaway = gap === 0 ? '<strong>A shared middle point.</strong> Both cities have the same median sale price for this selection.' : `<strong>${a.price>b.price ? 'Champaign' : 'Urbana'} has a ${money(gap)} higher median sale price</strong> for this selection (${number(gap/lower*100)}% above ${a.price>b.price ? 'Urbana' : 'Champaign'}). A difference in medians is not a comparison of identical homes.`;
  }
  document.getElementById('takeaway').innerHTML = takeaway;
  bars('price-chart',summaries,'price',money);
  bars('size-chart',summaries,'area',v=>v === null ? 'No data' : number(v)+' sq ft');
  const measures = [['Median sale price','price','count',money],['Median living area','area','areaCount',v=>v===null?'No data':number(v)+' sq ft'],['Median price per sq ft','ppsf','areaCount',money],['Median days on market','days','daysCount',v=>v===null?'No data':number(v)+' days']];
  document.getElementById('details').innerHTML = measures.map(([label,key,count,format])=>`<tr><th scope="row">${label}</th>${summaries.map(s=>`<td>${format(s[key])}<small>n = ${number(s[count])} sales</small></td>`).join('')}</tr>`).join('');
  document.getElementById('results').hidden = false;
}
async function init() {
  try {
    const response = await fetch('data/champaign_urbana.json');
    if (!response.ok) throw new Error('Data request returned '+response.status);
    sourceRows = await response.json();
    document.getElementById('bedrooms').disabled = false;
    document.getElementById('reset').disabled = false;
    document.getElementById('bedrooms').addEventListener('change',render);
    document.getElementById('reset').addEventListener('click',()=>{document.getElementById('bedrooms').value='all';render();});
    render();
  } catch(error) {
    document.getElementById('scope').textContent = 'The comparison data could not load. Please refresh the page, or use the original CSV link below. For local previews, serve this folder with python3 -m http.server 8000.';
    document.getElementById('scope').classList.add('error');
    console.error(error);
  }
}
if (typeof document !== 'undefined') init();
if (typeof module !== 'undefined') module.exports = {median,summarize,selectRows};
