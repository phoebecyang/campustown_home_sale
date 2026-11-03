"""Independent SQLite checks of browser metrics, for every bedroom selection."""
import json
import sqlite3
import statistics
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
connection = sqlite3.connect(f'file:{ROOT / "data/college_town_home_sales.sqlite"}?mode=ro', uri=True)
connection.row_factory = sqlite3.Row
output = {}
for bedrooms in ('all', '1', '2', '3', '4', '5'):
    output[bedrooms] = {}
    for city in ('Champaign', 'Urbana'):
        clause = '' if bedrooms == 'all' else ' AND beds >= 5' if bedrooms == '5' else f' AND beds = {int(bedrooms)}'
        rows = connection.execute('SELECT sale_price,living_area_sqft,julianday(contract_date)-julianday(list_date) AS days FROM home_sales WHERE state = ? AND city = ? AND sale_price BETWEEN 10000 AND 5000000' + clause, ('IL',city)).fetchall()
        sizes = [r['living_area_sqft'] for r in rows if r['living_area_sqft'] is not None and r['living_area_sqft'] > 0]
        ratios = [r['sale_price']/r['living_area_sqft'] for r in rows if r['living_area_sqft'] is not None and r['living_area_sqft'] > 0]
        days = [r['days'] for r in rows if r['days'] is not None and r['days'] >= 0]
        med = lambda values: statistics.median(values) if values else None
        output[bedrooms][city] = dict(count=len(rows), price=med([r['sale_price'] for r in rows]), area=med(sizes), ppsf=med(ratios), areaCount=len(sizes), days=med(days), daysCount=len(days))
(ROOT / 'checks/expected_metrics.json').write_text(json.dumps(output, indent=2)+'\n')
print(json.dumps(output['all'],indent=2))
