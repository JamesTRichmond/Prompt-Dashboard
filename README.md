# Prompt Dashboard

Prompt Dashboard is a static, human-centered request builder for composing better ChatGPT prompts in the browser. It keeps human impact, context, constraints, time lenses, and launch choices visible while it assembles a structured request you can copy.

## What Prompt Dashboard is

Prompt Dashboard turns prompt writing into a full-window thinking room instead of a single text box. The first public version is designed for GitHub Pages and runs entirely in the browser with HTML, CSS, and JavaScript.

It includes:
- A three-zone dashboard with **Human Field**, **Main Prompt Builder**, and **Live Request Rail**
- 11 starter prompt categories with 100+ starter options
- A **Time Telescope** with historical and speculative future lenses
- A **Launch Compass** for staged GitHub Pages, Custom GPT, GitHub Pages-only, and future ChatGPT App routes
- **Randominator V2** for controlled, non-repeating inspiration
- Browser-only persistence for custom categories, custom options, and saved random inspirations

## How to use it locally

1. Clone or download this repository.
2. Open `index.html` directly in a browser, or serve the repository root with any static file server.
3. Fill in the Human Field and Main Prompt Builder.
4. Choose a time lens and launch route.
5. Copy the generated prompt from the Live Request Rail and paste it into ChatGPT.

## How to publish with GitHub Pages

1. Push the repository contents to GitHub.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select the default branch and the **/(root)** folder.
4. Save the setting and wait for GitHub Pages to publish the site.
5. Open the Pages URL and verify the dashboard loads as a static site.

## What is included in V1

- Static HTML/CSS/JavaScript only
- No backend
- No build server requirement
- No login
- No private or local workspace dependencies
- Real-time prompt assembly with copy support and manual-select fallback
- localStorage persistence for custom category data and recent random results

## Privacy note

The first public version is static and does **not** send user data anywhere. All persistence stays in the browser through localStorage.

## Future path

The intended next path is:
1. Refine the static GitHub Pages workflow with public feedback
2. Wrap the strongest workflow as a **Custom GPT**
3. Expand into a full **ChatGPT App** with an MCP server and stable HTTPS hosting

See `docs/roadmap.md` for the future-path outline.
