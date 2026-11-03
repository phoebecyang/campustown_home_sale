# Coding agent work log

## 2026-11-03 — Two Cities, One Campus

### User requests (verbatim)

> I choose champaign vs urbana

> I am suppose to build the website with a coding ai agent, can you build the website from here through github and log every step inside the agent.md

### Steps

1. Read local `AGENTS.md`, `docs/data_description_sheet.md`, placeholder HTML, and the template agent log before writing analysis code. Inspected the GitHub repository and confirmed that the local initial commit matched remote main and that the working tree was clean.
2. Used the user's selected Champaign–Urbana scope and preceding proposed comparison design. Announced the implementation plan: city cards, bedroom filter, comparison charts, transparent methods, independent calculations, and GitHub publication. Applied Sites design guidance while preserving the requested GitHub Pages hosting and plain HTML/CSS/JavaScript constraints.
3. Inspected CSV fields and the local two-city subset. Found 3,417 source records and sale dates spanning 2023-03-27 through 2026-03-23. Distinguished this sales period from the March 2026 collection date.
4. Added `scripts/prepare_comparison.py`. It writes `data/champaign_urbana.json` from the original CSV, preserving record identifiers and retaining only fields needed by the page. Kept all five source dataset files unchanged.
5. Replaced the placeholder with “Two Cities, One Campus,” a responsive cream, orange, and blue comparison page. Created original CSS house/campus illustration, navigation, city cards, two bar charts, a comparison table, methods accordions, and source/download links.
6. Added `app.js`: inclusive $10,000–$5,000,000 sale-price range; all/1/2/3/4/5+ bedroom filters; medians; positive-area requirements; per-record price/area ratios; contract-minus-list days; per-metric sample sizes; reset; loading/error handling; dynamic date coverage and exclusion count. The price rule excludes one Champaign sale and no Urbana sales. No address deduplication or home-type analysis.
7. Added an independent SQLite/Python calculation in `checks/verify_numbers.py` and committed its outputs as `checks/expected_metrics.json`. Compared the site's real JavaScript functions against the independent results using `checks/verify_browser_math.cjs`. All 84 metric comparisons pass, plus empty samples and missing/zero-area cases.
8. Updated README with purpose, preview instructions, data rules, reproducibility, limitations, tool attribution, and six independently checked numbers. Created this requested `agent.md` and kept a corresponding entry in `AGENT_LOG.md`.
9. Started a local preview server. The sandbox initially blocked local binding; the approved retry started it. Browser tooling initially assumed a bundled headless executable existed; that was wrong. The missing-executable error exposed the assumption, so testing switched to installed Google Chrome. A sandbox launch failed and an approved browser run was then requested. Actual browser results and publication outcome are recorded in the follow-up below.

### Review notes

- The agent performed the independent checks; the student has not yet personally reviewed the page or checked numbers. Do not present this log as evidence of student review.
- This records actions and verification evidence, not hidden model reasoning.
- Future edits should append a dated entry and record the user's prompt, changes, actual checks, and any fixes.

### Browser correction

The browser test caught a malformed HTML closing tag that removed the one-bedroom option. The agent corrected the option markup and reran the browser checks. This was a real implementation error caught by exercising the dropdown, beyond the independent math checks.

### Verification and GitHub upload

- Browser checks passed at desktop (1440 px) and phone (390 px) widths: every bedroom option, reset, visible comparison table, no horizontal overflow, and no JavaScript page errors. Desktop screenshot visually inspected; a phone viewport screenshot was captured after layout settled. Fixed singular “price outlier” wording during review.
- Git whitespace check passed. Confirmed none of the five original dataset files or the workflow was modified.
- Prepared one GitHub commit containing the page, styles, browser logic, derived subset, reproducibility script, independent checks, README, and both logs. Upload targets `main`, which triggers the existing GitHub Pages workflow. Deployment result will be appended after GitHub reports its outcome.
