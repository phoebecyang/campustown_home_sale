# Agent log

Add a dated entry each time you work with your AI coding agent, with the newest entry at the bottom. Each entry records what you asked the agent, what it produced, and what you checked or changed. Paste your key prompts in exactly as you typed them. Include at least one time the agent got something wrong, and how you caught it.


## 2026-11-03: Build Champaign vs. Urbana Comparison Website

- **Asked:** "I choose champaign vs urbana"
- **Asked:** "I am suppose to build the website with a coding ai agent, can you build the website through vscode and push it onto github"
- **Asked:**  " I want the website to be interactive, such as showing the differences between 1 bedroom, 2 bedroom, 3 bedroom and 4 bedroom".


- **Agent produced:** “Two Cities, One Campus,” using plain HTML/CSS/JavaScript; bedroom filters; city cards; price and size charts; per-metric sample counts; methods; reproducible subset script; independent SQLite checks; completed README. Detailed steps and publication evidence are in `agent.md`.
- **Checked or changed:** The agent independently calculated metrics from SQLite and compared them to the browser functions: 84 matches across every bedroom filter, plus empty/missing-data checks. Original dataset files unchanged. The initial browser test wrongly assumed a bundled headless browser executable existed; its missing-executable error caught this, and the agent switched to installed Chrome. The student has not yet personally reviewed the output.

- **Implementation correction:** The real browser test caught malformed option markup that made the one-bedroom filter unavailable. Fixed the closing tag and reran browser verification.
- **Browser result:** Desktop and phone checks pass for all filters, reset, no overflow, and no JavaScript page errors. Prepared a main-branch upload through the connected GitHub tools; deployment outcome is recorded in `agent.md` after verification.
- **Publication confirmed:** Implementation commit `6190b1973c1344f5079235a3f582e893d97fea44`; GitHub Pages run `41699996550` succeeded. Public-site browser checks passed. The About homepage already matches https://phoebecyang.github.io/campustown_home_sale/. Local clone synchronized. See `agent.md` for detailed evidence.

## 2026-11-04: Strengthen the city comparison colors

- **Asked:** "I prefer to have the coloring of the comparison of Urbana and Champaign to be blue and orange"
- **Agent produced:** A consistent city color system: Champaign is orange and Urbana is blue in the legend, cards, headline prices, chart labels and bars, and comparison-table columns.
- **Checked or changed:** Kept city names next to all color cues. All 84 independent metric comparisons passed. Desktop and phone browser checks passed for every bedroom filter, reset, no overflow, and no JavaScript errors. The desktop appearance was visually inspected.

## 2026-11-06: Organize the illustration heading

- **Asked:** "The picture in the first page of the website seems a bit off, since the two words: the twin city and illinois is sort of out of bound, make the words look more organized"
- **Agent produced:** A centered, two-line illustration heading reading “The Twin Cities” and “Champaign · Urbana · Illinois,” with responsive spacing and type sizes.
- **Checked or changed:** Automated desktop and phone checks confirmed the heading stays inside the rounded illustration. No horizontal overflow or JavaScript errors were found. Both screenshots were visually inspected.
