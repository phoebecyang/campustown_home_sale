# Agent log

Add a dated entry each time you work with your AI coding agent, with the newest entry at the bottom. Each entry records what you asked the agent, what it produced, and what you checked or changed. Paste your key prompts in exactly as you typed them. Include at least one time the agent got something wrong, and how you caught it.

Copy this outline for each entry:

```markdown
## YYYY-MM-DD: What you worked on

- **Asked:** "Paste your prompt here."
- **Agent produced:** What it made or changed.
- **Checked or changed:** How you checked it, and what you fixed.
```

## 2026-11-03: Build Champaign vs. Urbana comparison

- **Asked:** "I choose champaign vs urbana"
- **Asked:** "I am suppose to build the website with a coding ai agent, can you build the website from here through github and log every step inside the agent.md"
- **Agent produced:** “Two Cities, One Campus,” using plain HTML/CSS/JavaScript; bedroom filters; city cards; price and size charts; per-metric sample counts; methods; reproducible subset script; independent SQLite checks; completed README. Detailed steps and publication evidence are in `agent.md`.
- **Checked or changed:** The agent independently calculated metrics from SQLite and compared them to the browser functions: 84 matches across every bedroom filter, plus empty/missing-data checks. Original dataset files unchanged. The initial browser test wrongly assumed a bundled headless browser executable existed; its missing-executable error caught this, and the agent switched to installed Chrome. The student has not yet personally reviewed the output.

- **Implementation correction:** The real browser test caught malformed option markup that made the one-bedroom filter unavailable. Fixed the closing tag and reran browser verification.
- **Browser result:** Desktop and phone checks pass for all filters, reset, no overflow, and no JavaScript page errors. Prepared a main-branch upload through the connected GitHub tools; deployment outcome is recorded in `agent.md` after verification.
- **Publication confirmed:** Implementation commit `6190b1973c1344f5079235a3f582e893d97fea44`; GitHub Pages run `41699996550` succeeded. Public-site browser checks passed. The About homepage already matches https://phoebecyang.github.io/campustown_home_sale/. Local clone synchronized. See `agent.md` for detailed evidence.
