(function () {
  const data = window.PROMPT_DASHBOARD_DATA;
  const builtInCategories = data.starterCategories;
  const starterDescriptions = data.starterDescriptions || {};
  const timeLenses = data.timeLenses;
  const launchRoutes = data.launchRoutes;
  const randomPools = data.randomPools;

  const storage = createSafeStorage();
  const storageKeys = {
    customCategories: 'promptDashboard.customCategories',
    customOptions: 'promptDashboard.customOptions',
    savedRandomResults: 'promptDashboard.savedRandomResults',
    recentRandomHistory: 'promptDashboard.recentRandomHistory',
    mode: 'promptDashboard.mode'
  };

  const MODE_COPY = {
    incubate: {
      label: 'Incubate',
      hint: 'Incubate: play, weird combinations, no goal except emergence.',
      brief: 'Birth a being from the mix. Do not optimize the user\'s wording. Transmogrify it. Prefer strange, specific perspectives over a polished assistant voice.',
      handoff: 'Speak as the being that emerged from this mix. Stay in perspective. Surprise is allowed. Usefulness is optional.'
    },
    manifest: {
      label: 'Manifest',
      hint: 'Manifest: work. Assemble a mixture-of-experts panel that can be deployed.',
      brief: 'Manifest a usable perspective or panel for the undertaking. Combination still rules, but the output must be deployable.',
      handoff: 'Respond as the manifested perspective or panel. Keep the result reviewable, challengeable, and reusable. Name tradeoffs.'
    }
  };

  const state = {
    selectedCategoryKey: builtInCategories[0].key,
    selectedStarterTitle: '',
    selectedTimeLensKey: timeLenses[0].key,
    selectedLaunchRouteKey: launchRoutes[0].key,
    lastRandomResult: null,
    customCategories: storage.get(storageKeys.customCategories, []),
    customOptions: storage.get(storageKeys.customOptions, {}),
    savedRandomResults: storage.get(storageKeys.savedRandomResults, []),
    recentRandomHistory: storage.get(storageKeys.recentRandomHistory, []),
    mode: normalizeMode(storage.get(storageKeys.mode, 'incubate'))
  };

  const elements = {
    starterCategory: document.getElementById('starterCategory'),
    starterCategoryDescription: document.getElementById('starterCategoryDescription'),
    starterCount: document.getElementById('starterCount'),
    starterOptions: document.getElementById('starterOptions'),
    selectedStarterPreview: document.getElementById('selectedStarterPreview'),
    undertaking: document.getElementById('undertaking'),
    context: document.getElementById('context'),
    guardrails: document.getElementById('guardrails'),
    desiredFormat: document.getElementById('desiredFormat'),
    successCriteria: document.getElementById('successCriteria'),
    affectedPeople: document.getElementById('affectedPeople'),
    emotionalTone: document.getElementById('emotionalTone'),
    consentQuestions: document.getElementById('consentQuestions'),
    benefits: document.getElementById('benefits'),
    challengePath: document.getElementById('challengePath'),
    timeLensSelect: document.getElementById('timeLensSelect'),
    timeLensPreview: document.getElementById('timeLensPreview'),
    launchRoutes: document.getElementById('launchRoutes'),
    applyLaunchPlanButton: document.getElementById('applyLaunchPlanButton'),
    launchNotes: document.getElementById('launchNotes'),
    launchMessage: document.getElementById('launchMessage'),
    generatedPrompt: document.getElementById('generatedPrompt'),
    promptSectionCount: document.getElementById('promptSectionCount'),
    promptCharacterCount: document.getElementById('promptCharacterCount'),
    copyPromptButton: document.getElementById('copyPromptButton'),
    selectPromptButton: document.getElementById('selectPromptButton'),
    copyStatus: document.getElementById('copyStatus'),
    customCategoryName: document.getElementById('customCategoryName'),
    customOptionTitle: document.getElementById('customOptionTitle'),
    addCategoryButton: document.getElementById('addCategoryButton'),
    addOptionButton: document.getElementById('addOptionButton'),
    customMessage: document.getElementById('customMessage'),
    biasAmbition: document.getElementById('biasAmbition'),
    biasCollaboration: document.getElementById('biasCollaboration'),
    biasTimeframe: document.getElementById('biasTimeframe'),
    randomResult: document.getElementById('randomResult'),
    useRandomButton: document.getElementById('useRandomButton'),
    rollRandomButton: document.getElementById('rollRandomButton'),
    saveRandomButton: document.getElementById('saveRandomButton'),
    savedRandomList: document.getElementById('savedRandomList'),
    modeIncubate: document.getElementById('modeIncubate'),
    modeManifest: document.getElementById('modeManifest'),
    modeHint: document.getElementById('modeHint')
  };

  init();

  function init() {
    renderStarterCategorySelect();
    renderTimeLensSelect();
    renderLaunchRoutes();
    renderSavedRandomResults();
    renderMode();
    bindEvents();
    renderStarterOptions();
    updateTimeLensPreview();
    generateRandomResult();
    updatePrompt();
  }

  function bindEvents() {
    elements.starterCategory.addEventListener('change', function (event) {
      state.selectedCategoryKey = event.target.value;
      state.selectedStarterTitle = '';
      renderStarterOptions();
      updatePrompt();
    });

    elements.timeLensSelect.addEventListener('change', function (event) {
      state.selectedTimeLensKey = event.target.value;
      updateTimeLensPreview();
      updatePrompt();
    });

    if (elements.modeIncubate) {
      elements.modeIncubate.addEventListener('click', function () {
        setMode('incubate');
      });
    }
    if (elements.modeManifest) {
      elements.modeManifest.addEventListener('click', function () {
        setMode('manifest');
      });
    }

    elements.applyLaunchPlanButton.addEventListener('click', applyLaunchPlan);
    elements.copyPromptButton.addEventListener('click', function () {
      copyPrompt();
    });
    elements.selectPromptButton.addEventListener('click', selectPrompt);
    elements.addCategoryButton.addEventListener('click', addCustomCategory);
    elements.addOptionButton.addEventListener('click', addCustomOption);
    elements.rollRandomButton.addEventListener('click', generateRandomResult);
    elements.useRandomButton.addEventListener('click', useRandomResult);
    elements.saveRandomButton.addEventListener('click', saveRandomResult);
    [elements.biasAmbition, elements.biasCollaboration, elements.biasTimeframe].forEach(function (element) {
      element.addEventListener('change', generateRandomResult);
    });

    [
      elements.undertaking,
      elements.context,
      elements.guardrails,
      elements.desiredFormat,
      elements.successCriteria,
      elements.affectedPeople,
      elements.emotionalTone,
      elements.consentQuestions,
      elements.benefits,
      elements.challengePath,
      elements.launchNotes
    ].forEach(function (element) {
      element.addEventListener('input', updatePrompt);
    });
  }
