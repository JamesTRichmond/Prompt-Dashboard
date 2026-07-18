window.PROMPT_DASHBOARD_DATA = {
  starterCategories: [
    {
      key: 'writing-editing',
      label: 'Writing & Editing',
      description: 'Draft, sharpen, restructure, or adapt writing for real readers.',
      options: [
        'Rewrite a rough draft into a clear public note',
        'Turn meeting notes into a polished recap',
        'Draft a confident but kind follow-up email',
        'Condense a long explanation into an executive summary',
        'Expand bullet points into readable narrative copy',
        'Edit for clarity without losing the original voice',
        'Create headline and subhead options for an announcement',
        'Transform technical writing into plain-language guidance',
        'Prepare a version for skeptical readers',
        'Draft a revision plan for a messy document'
      ]
    },
    {
      key: 'research-synthesis',
      label: 'Research & Synthesis',
      description: 'Frame questions, compare sources, and turn information into insight.',
      options: [
        'Map the key questions before doing deeper research',
        'Summarize a topic for a busy decision-maker',
        'Compare three approaches to the same problem',
        'Turn source notes into a usable brief',
        'Extract patterns from scattered observations',
        'Identify assumptions that need verification',
        'Build a glossary for a complex domain',
        'Summarize opposing viewpoints fairly',
        'Translate research into action steps',
        'Create a research handoff for the next person'
      ]
    },
    {
      key: 'strategy-planning',
      label: 'Strategy & Planning',
      description: 'Scope work, set milestones, and make the path forward visible.',
      options: [
        'Turn an ambitious goal into a staged plan',
        'Outline a 30-60-90 day strategy',
        'Build a roadmap with clear tradeoffs',
        'Create a planning memo for leadership review',
        'List the critical dependencies before launch',
        'Turn a fuzzy initiative into concrete workstreams',
        'Design a lightweight decision framework',
        'Create milestone checkpoints and owners',
        'Plan a pilot before a wider rollout',
        'Translate strategy into an execution checklist'
      ]
    },
    {
      key: 'teaching-learning',
      label: 'Teaching & Learning',
      description: 'Teach concepts clearly, scaffold difficulty, and support real understanding.',
      options: [
        'Explain a hard concept in plain language',
        'Design a beginner-friendly lesson outline',
        'Create practice questions with feedback',
        'Build a study guide from class notes',
        'Turn expert knowledge into a teachable walkthrough',
        'Make an analogy set for difficult topics',
        'Draft a coaching script for a learner',
        'Sequence ideas from foundational to advanced',
        'Create a workshop agenda with exercises',
        'Adapt a lesson for mixed experience levels'
      ]
    },
    {
      key: 'product-software',
      label: 'Product & Software',
      description: 'Shape requirements, specs, UX flows, and implementation thinking.',
      options: [
        'Draft a product requirement from raw notes',
        'Turn a feature idea into acceptance criteria',
        'Write a user story set with edge cases',
        'Plan a bug triage response',
        'Describe a dashboard UX flow end to end',
        'Outline a static site release plan',
        'Translate a problem statement into implementation tasks',
        'Create test scenarios for a new feature',
        'Summarize technical debt and possible fixes',
        'Design a handoff between product and engineering'
      ]
    },
    {
      key: 'analysis-decisions',
      label: 'Analysis & Decision Support',
      description: 'Compare options, weigh evidence, and make reasoning explicit.',
      options: [
        'Create a pros and cons matrix',
        'Explain a recommendation with evidence and caveats',
        'Compare short-term and long-term consequences',
        'Identify what data would change the decision',
        'Turn observations into ranked options',
        'Draft a decision memo with uncertainties',
        'Create a risk table with mitigations',
        'Pressure-test a preferred option',
        'Name likely blind spots before acting',
        'Summarize an argument for a mixed audience'
      ]
    },
    {
      key: 'operations-docs',
      label: 'Operations & Documentation',
      description: 'Clarify procedures, ownership, readiness, and maintenance work.',
      options: [
        'Turn a process into a usable SOP',
        'Draft a runbook for recurring tasks',
        'Create an onboarding checklist for new contributors',
        'Document roles and responsibilities clearly',
        'Prepare a release readiness checklist',
        'Write a status update that surfaces blockers',
        'Create a triage flow for incoming requests',
        'Summarize what changed and what to do next',
        'Turn tribal knowledge into shared documentation',
        'Draft a simple incident retrospective outline'
      ]
    },
    {
      key: 'facilitation-communication',
      label: 'Facilitation & Communication',
      description: 'Support meetings, alignment, conversation repair, and shared understanding.',
      options: [
        'Draft an agenda that leads to decisions',
        'Write talking points for a difficult conversation',
        'Prepare questions for a feedback session',
        'Turn disagreement into a constructive comparison',
        'Create a workshop opening and closing script',
        'Summarize a discussion without flattening nuance',
        'Draft a stakeholder update with clear asks',
        'Design a check-in round for a team session',
        'Create communication options for different audiences',
        'Plan how to respond to objections respectfully'
      ]
    },
    {
      key: 'personal-productivity',
      label: 'Personal Productivity',
      description: 'Organize work, reduce overwhelm, and move from intention to action.',
      options: [
        'Turn a brain dump into next actions',
        'Build a realistic weekly plan',
        'Create a prioritization list with reasons',
        'Break a large task into the first five moves',
        'Draft a habit-supporting checklist',
        'Design a reflection prompt for the end of the week',
        'Turn scattered ideas into a project outline',
        'Create a low-friction personal review template',
        'Organize goals across short and long time horizons',
        'Design a reset plan after losing momentum'
      ]
    },
    {
      key: 'ethics-care',
      label: 'Ethics & Care',
      description: 'Surface harm, accountability, fairness, and human impact before shipping work.',
      options: [
        'Identify who could be unintentionally harmed',
        'Create a fairness review checklist',
        'Draft questions to test consent and agency',
        'Plan how to communicate limitations honestly',
        'Design an accountability section for a proposal',
        'Name likely exclusion risks in a rollout',
        'Compare efficiency gains with human costs',
        'Draft a revision pathway for affected users',
        'Create a red-team prompt for hidden harms',
        'Summarize ethical tradeoffs for decision-makers'
      ]
    },
    {
      key: 'public-launch-outreach',
      label: 'Public Launch & Outreach',
      description: 'Prepare something useful for a public audience, rollout, or GitHub release.',
      options: [
        'Bring this to ChatGPT',
        'Draft a GitHub Pages launch checklist',
        'Write release notes for a first public version',
        'Create a public-facing feature summary',
        'Draft FAQ answers for first-time users',
        'Turn internal goals into a public roadmap snapshot',
        'Prepare a feedback request for early testers',
        'Write a README section that reduces setup friction',
        'Design a launch post for a technical audience',
        'Draft a before-and-after story for the product'
      ]
    }
  ],
  starterDescriptions: {
    'Bring this to ChatGPT': 'Translate this dashboard into a clear public-facing ChatGPT request that preserves human considerations, guardrails, time lenses, and a practical GitHub launch path.'
  },
  timeLenses: [
    {
      key: 'earliest-records',
      label: 'Earliest tally / record systems',
      guidance: 'Favor simple categories, counted outcomes, and direct evidence. Ask for the few signals that prove the work is real and trackable.'
    },
    {
      key: 'bronze-ledgers',
      label: 'Bronze Age ledgers',
      guidance: 'Think in inputs, obligations, exchanges, and stewards. Ask for clear ownership, what is owed, and what must be reconciled.'
    },
    {
      key: 'manuscript-1400s',
      label: '1400s manuscript / planning culture',
      guidance: 'Slow the work down enough for annotation and revision. Ask for margin notes, alternatives, and a durable record that others can continue.'
    },
    {
      key: 'industrial-1800s',
      label: '1800s industrial / scientific systems',
      guidance: 'Request method, repeatability, measurement, and failure modes. Ask for a process another operator could reproduce.'
    },
    {
      key: 'web-2000s',
      label: '2000s web / software dashboards',
      guidance: 'Prioritize usability, modular structure, visible controls, and feedback loops. Ask for an interface people can actually navigate.'
    },
    {
      key: 'ai-present',
      label: 'Present-day AI workflows',
      guidance: 'Make the handoff to an AI explicit: roles, examples, guardrails, and output formatting should be concrete and copy-ready.'
    },
    {
      key: 'future-10',
      label: '10 years future (speculative)',
      guidance: 'Speculative lens: favor adaptability, interoperability, and human oversight. Ask for output that still works as tools and norms change.'
    },
    {
      key: 'future-20',
      label: '20 years future (speculative)',
      guidance: 'Speculative lens: test whether the design scales across institutions, memory systems, and multi-step collaboration.'
    },
    {
      key: 'future-50',
      label: '50 years future (speculative)',
      guidance: 'Speculative lens: ask what remains legible across generations, what should be documented for continuity, and what harms compound over time.'
    },
    {
      key: 'future-100',
      label: '100 years future (speculative)',
      guidance: 'Speculative lens: optimize for archival clarity, stewardship, and long-horizon consequences rather than short-lived convenience.'
    }
  ],
  launchRoutes: [
    {
      key: 'staged-route',
      title: 'Staged route (recommended)',
      summary: 'Launch on GitHub Pages first, gather feedback, then wrap the strongest workflow as a Custom GPT and later a full ChatGPT App.',
      promptText: 'Recommend a staged launch plan that starts with GitHub Pages for fast public feedback, identifies what to learn from real usage, and names the criteria for later moving into Custom GPT and ChatGPT App versions.'
    },
    {
      key: 'custom-gpt',
      title: 'Custom GPT',
      summary: 'Fastest ChatGPT-native route, useful for conversational flow, but slimmer than the full dashboard interface.',
      promptText: 'Frame the request for a Custom GPT wrapper that preserves the core workflow, makes tradeoffs explicit, and notes what interface depth is lost compared with the full dashboard.'
    },
    {
      key: 'github-pages',
      title: 'GitHub Pages',
      summary: 'Fastest way to share the exact static interface with no backend and no build server dependency.',
      promptText: 'Treat GitHub Pages as the primary release target and prioritize a static, polished, browser-based experience that anyone can open, copy from, and reuse.'
    },
    {
      key: 'chatgpt-app',
      title: 'ChatGPT App',
      summary: 'Richest in-ChatGPT route, but it needs MCP support, stable HTTPS hosting, and a mature interaction model.',
      promptText: 'Describe the future ChatGPT App path as a richer follow-on, including MCP server needs, HTTPS hosting expectations, and why it should wait until the static workflow proves itself.'
    }
  ],
  randomPools: {
    practical: {
      verbs: ['Clarify', 'Organize', 'Refine', 'Map', 'Package'],
      nouns: ['a reusable checklist', 'an onboarding flow', 'a decision brief', 'a public explainer', 'a review template']
    },
    balanced: {
      verbs: ['Reframe', 'Build', 'Translate', 'Design', 'Stage'],
      nouns: ['a launch rehearsal', 'a trust-building handoff', 'a scenario map', 'an ethical release note', 'a collaborative playbook']
    },
    bold: {
      verbs: ['Invent', 'Prototype', 'Reimagine', 'Pressure-test', 'Compose'],
      nouns: ['a future-facing prompt ritual', 'a civic dashboard concept', 'a multi-voice briefing room', 'a next-generation governance pattern', 'a speculative product story']
    },
    solo: ['for an individual operator', 'for one focused creator', 'for a solo builder with limited time'],
    team: ['for a working team', 'for a cross-functional group', 'for collaborators who need alignment'],
    public: ['for a public audience', 'for first-time users on the open web', 'for a community feedback loop'],
    grounded: ['for this week', 'for the next release cycle', 'for immediate testing'],
    horizon: ['for the next year of iteration', 'for a staged rollout with learning loops', 'for a roadmap that evolves with feedback'],
    speculative: ['for tools people may use a decade from now', 'for long-horizon stewardship', 'for speculative future collaboration systems']
  }
};
