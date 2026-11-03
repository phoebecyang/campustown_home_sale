# Two Cities, One Campus

An interactive comparison of completed home sales in Champaign and Urbana, Illinois. Designed for students, residents, and anyone curious about the markets surrounding UIUC. Select bedrooms to compare median prices, home sizes, price per square foot, and days on market.

## Live site

https://phoebecyang.github.io/campustown_home_sale/

## Preview it on your own computer

From this repository, run `python3 -m http.server 8000`, then open http://localhost:8000/. The page needs an HTTP server to load its data. No framework, installation, or build step is required.

## Data notes

- Include only `state = IL` and `city = Champaign` or `Urbana`.
- Keep sale prices from $10,000 through $5,000,000 inclusive. One Champaign record is excluded; no Urbana records are excluded. All comparisons apply this price rule and the selected bedroom filter.
- All-bedroom included sales close from 2023-03-27 to 2026-03-23. Coverage is recomputed for each filter. The collection date, March 2026, is not the full period of sales.
- The median is the middle sorted value, averaging the middle pair for an even count. Price per square foot is the median of individual price/area ratios. Both area metrics exclude missing or nonpositive living areas.
- Days on market is contract date minus list date, excluding missing dates and negative intervals. Zero days is valid. Missing dates are not random; the sample is not representative of every sale. Show metric-specific sample sizes.
- Keep every listing; never deduplicate street addresses. `listing_id` is the record key. The derived data does not include ZIP, county FIPS, or parcel number; those fields in the original remain text.
- Do not use unreliable `home_type`. Do not analyze the documented anomalous lot sizes, bathrooms, taxes, or assessed values.
- Historical sales are not available listings. City differences reflect different property mixes, not a causal city premium or an affordability measure. Source values have not been verified against county records.
- The five original dataset files and publishing workflow are unchanged.

## How we checked our numbers

Run `python3 checks/verify_numbers.py` to calculate all metrics separately from the original SQLite dataset, using SQL date arithmetic and Python statistics. Run `node checks/verify_browser_math.cjs` to compare the website's actual JavaScript calculations to those independent results. All 84 metric comparisons across the six bedroom options pass, along with empty/missing-data cases.

| Number on the site | Where it appears | Independent check | Result |
|---|---|---|---|
| Champaign median sale price: $240,000 | City card, all bedrooms | SQLite selection + Python median | Matches |
| Urbana median sale price: $229,900 | City card, all bedrooms | SQLite selection + Python median | Matches |
| Champaign included sales: 2,285 | City card, all bedrooms | SQLite filtered row count | Matches |
| Urbana median living area: 1,550.5 sq ft | Area chart and table | SQLite positive areas + Python median | Matches |
| Champaign median days on market: 7 | City card and table | SQLite julianday(contract)-julianday(list) | Matches |
| Urbana median days on market: 8 | City card and table | SQLite julianday(contract)-julianday(list) | Matches |

Full unrounded independent outputs are in `checks/expected_metrics.json`. Currency is displayed to the nearest dollar; other metrics use up to one decimal.

## Reproduce the small data file

Run `python3 scripts/prepare_comparison.py`. It reads the original CSV and writes `data/champaign_urbana.json`, containing the two cities and only the fields the site uses. It does not change the original files. Commit the script and derived file together. The browser calculates all metrics from these records; GitHub Pages publishes committed static files without a build step.

## Tools we used

OpenAI Codex coding agent; plain HTML, CSS, and JavaScript; Python standard library; SQLite; Node.js for independent comparison checks. No external browser libraries or API keys are needed by visitors. See `agent.md` for the dated work log and `AGENT_LOG.md` for the assignment session record.

## Citation

College-town home sales dataset, version 1.0 (2026). University of Illinois-Deloitte Foundation Center for Business Emerging Technologies. Data collected March 2026.
