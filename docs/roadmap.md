# Prompt Dashboard roadmap

## Current release: static GitHub Pages dashboard

V1 is intentionally static. It runs in the browser, stores only local browser data, and is meant to prove the usefulness of the workflow before adding any hosted services.

## Next path: Custom GPT wrapper

A Custom GPT can provide a faster ChatGPT-native experience for users who mainly want the guided prompt flow without the full dashboard layout. This path should preserve the Human Field, Time Telescope, and Launch Compass logic as reusable instruction patterns.

## Later path: full ChatGPT App

A future ChatGPT App can support a richer in-ChatGPT workflow once the public static version has proven which interactions matter most. That phase should wait until there is:

- Stable HTTPS hosting
- A maintained MCP server
- A clear shared data model for prompt state and handoff
- Evidence from real user feedback that the richer app experience is worth the added complexity

## Future direction: Historiography

The dashboard already has a Time Telescope that treats historical periods as lenses. A historiography direction would make the *methods of writing and interpreting history* explicit, not just the time periods themselves.

Open questions to resolve when work resumes:

1. **Scope**: Should historiography be a new prompt category, a lens mode, or a meta-field for any request?
2. **Starter integration**: Add a `Historiography` category with options like `Compare how two schools interpret the same event`, `Identify source bias in a narrative`, or `Write a historiographical essay outline`.
3. **Lens options**: Extend Time Telescope entries with a `historiographical angle` field (e.g., Annales school, Marxist history, postcolonial critique, public history) or add a separate `Historiography Lens` selector.
4. **Human Field impact**: Surface how interpretation choices affect affected people, whose voices are centered or excluded, and how revision/redress should work.
5. **Output guidance**: Add a `desired historical approach` field or generated-prompt section that asks the model to compare interpretations, name primary/secondary sources, or flag silences in the record.

Recommended first step: add a `historiography` starter category and a matching generated-prompt section, then evaluate whether a separate lens is necessary.
