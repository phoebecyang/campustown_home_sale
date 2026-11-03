"""Rebuild the browser's small data file without changing the original datasets."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
with (ROOT / 'data/college_town_home_sales.csv').open(newline='') as source:
    rows = [r for r in csv.DictReader(source) if r['state'] == 'IL' and r['city'] in ('Champaign', 'Urbana')]
fields = ('listing_id', 'city', 'sale_price', 'beds', 'living_area_sqft', 'list_date', 'contract_date', 'sale_date')
result = [{k: (int(r[k]) if r[k] else None) if k in ('sale_price', 'beds', 'living_area_sqft') else r[k] for k in fields} for r in rows]
(ROOT / 'data/champaign_urbana.json').write_text(json.dumps(result, separators=(',', ':')) + '\n')
print(f'Wrote {len(result)} records to data/champaign_urbana.json')
