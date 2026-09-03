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
    recentRandomHistory: 'promptDashboard.recentRandomHistory'
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
    recentRandomHistory: storage.get(storageKeys.recentRandomHistory, [])
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
    savedRandomList: document.getElementById('savedRandomList')
  };

  init();

  function init() {
    renderStarterCategorySelect();
    renderTimeLensSelect();
    renderLaunchRoutes();
    renderSavedRandomResults();
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

  function renderStarterCategorySelect() {
    const categories = getAllCategories();
    elements.starterCategory.innerHTML = categories
      .map(function (category) {
        return '<option value="' + escapeAttribute(category.key) + '">' + escapeHtml(category.label) + '</option>';
      })
      .join('');
    elements.starterCategory.value = state.selectedCategoryKey;
    elements.starterCount.textContent = countStarterOptions(categories) + ' starter options across ' + categories.length + ' categories';
  }

  function renderStarterOptions() {
    const category = getCategoryByKey(state.selectedCategoryKey);
    if (!category) {
      return;
    }

    elements.starterCategoryDescription.textContent = category.description;
    elements.starterOptions.innerHTML = category.options
      .map(function (optionTitle) {
        const isActive = optionTitle === state.selectedStarterTitle;
        return (
          '<button type="button" class="chip secondary' + (isActive ? ' active' : '') + '" data-starter-title="' +
          escapeAttribute(optionTitle) +
          '">' +
          '<span class="chip-title">' +
          escapeHtml(optionTitle) +
          '</span>' +
          '<span>' +
          escapeHtml(getStarterSummary(optionTitle)) +
          '</span></button>'
        );
      })
      .join('');

    elements.starterOptions.querySelectorAll('[data-starter-title]').forEach(function (button) {
      button.addEventListener('click', function () {
        const title = button.getAttribute('data-starter-title');
        state.selectedStarterTitle = title;
        applyStarterToFields(title);
        renderStarterOptions();
        renderStarterPreview();
        updatePrompt();
      });
    });

    renderStarterPreview();
  }

  function renderStarterPreview() {
    if (!state.selectedStarterTitle) {
      elements.selectedStarterPreview.innerHTML = '<p><strong>No starter selected yet.</strong> Pick one to seed the dashboard without overwriting your existing notes.</p>';
      return;
    }

    elements.selectedStarterPreview.innerHTML =
      '<h4>' + escapeHtml(state.selectedStarterTitle) + '</h4><p>' + escapeHtml(getStarterSummary(state.selectedStarterTitle)) + '</p>';
  }

  function renderTimeLensSelect() {
    elements.timeLensSelect.innerHTML = timeLenses
      .map(function (lens) {
        return '<option value="' + escapeAttribute(lens.key) + '">' + escapeHtml(lens.label) + '</option>';
      })
      .join('');
    elements.timeLensSelect.value = state.selectedTimeLensKey;
  }

  function updateTimeLensPreview() {
    const lens = getTimeLensByKey(state.selectedTimeLensKey);
    if (!lens) {
      return;
    }
    elements.timeLensPreview.innerHTML = '<h4>' + escapeHtml(lens.label) + '</h4><p>' + escapeHtml(lens.guidance) + '</p>';
  }

  function renderLaunchRoutes() {
    elements.launchRoutes.innerHTML = launchRoutes
      .map(function (route) {
        const active = route.key === state.selectedLaunchRouteKey ? ' active' : '';
        return (
          '<button type="button" role="radio" aria-checked="' + (active ? 'true' : 'false') + '" class="route-card' + active + '" data-launch-route="' + escapeAttribute(route.key) + '">' +
          '<span class="route-title">' + escapeHtml(route.title) + '</span>' +
          '<span>' + escapeHtml(route.summary) + '</span>' +
          '</button>'
        );
      })
      .join('');

    elements.launchRoutes.querySelectorAll('[data-launch-route]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.selectedLaunchRouteKey = button.getAttribute('data-launch-route');
        elements.launchMessage.textContent = '';
        renderLaunchRoutes();
        updatePrompt();
      });
    });
  }

  function applyLaunchPlan() {
    const route = getLaunchRouteByKey(state.selectedLaunchRouteKey);
    if (!route) {
      return;
    }
    const current = elements.launchNotes.value.trim();
    if (!current.includes(route.promptText)) {
      elements.launchNotes.value = current ? current + '\n\n' + route.promptText : route.promptText;
    }
    elements.launchMessage.textContent = 'Added \u201c' + route.title + '\u201d to the launch notes.';
    updatePrompt();
  }

  function addCustomCategory() {
    const label = elements.customCategoryName.value.trim();
    if (!label) {
      elements.customMessage.textContent = 'Enter a category name first.';
      return;
    }

    const key = slugify(label);
    if (getCategoryByKey(key)) {
      elements.customMessage.textContent = 'That category already exists.';
      return;
    }

    state.customCategories.push({
      key: key,
      label: label,
      description: 'Custom category created in this browser.',
      options: []
    });
    storage.set(storageKeys.customCategories, state.customCategories);
    state.selectedCategoryKey = key;
    elements.customCategoryName.value = '';
    elements.customMessage.textContent = 'Added custom category.';
    renderStarterCategorySelect();
    elements.starterCategory.value = key;
    renderStarterOptions();
    updatePrompt();
  }

  function addCustomOption() {
    const optionTitle = elements.customOptionTitle.value.trim();
    if (!optionTitle) {
      elements.customMessage.textContent = 'Enter an option title first.';
      return;
    }

    const category = getCategoryByKey(state.selectedCategoryKey);
    if (!category) {
      elements.customMessage.textContent = 'Select a category before adding an option.';
      return;
    }

    if (category.options.includes(optionTitle)) {
      elements.customMessage.textContent = 'That option already exists in this category.';
      return;
    }

    if (isBuiltInCategory(category.key)) {
      const nextOptions = state.customOptions[category.key] || [];
      nextOptions.push(optionTitle);
      state.customOptions[category.key] = nextOptions;
      storage.set(storageKeys.customOptions, state.customOptions);
    } else {
      const customCategory = state.customCategories.find(function (entry) {
        return entry.key === category.key;
      });
      customCategory.options.push(optionTitle);
      storage.set(storageKeys.customCategories, state.customCategories);
    }

    elements.customOptionTitle.value = '';
    elements.customMessage.textContent = 'Added custom option.';
    renderStarterOptions();
    updatePrompt();
  }

  function generateRandomResult() {
    const ambition = elements.biasAmbition.value;
    const collaboration = elements.biasCollaboration.value;
    const timeframe = elements.biasTimeframe.value;
    const basePool = randomPools[ambition];
    let result = null;

    for (let attempt = 0; attempt < 24; attempt += 1) {
      const candidate = {
        title:
          basePool.verbs[randomIndex(basePool.verbs.length)] + ' ' +
          basePool.nouns[randomIndex(basePool.nouns.length)],
        support:
          randomPools[collaboration][randomIndex(randomPools[collaboration].length)] +
          ' ' +
          randomPools[timeframe][randomIndex(randomPools[timeframe].length)],
        ambition: ambition,
        collaboration: collaboration,
        timeframe: timeframe
      };
      candidate.summary = candidate.title + ' ' + candidate.support + '.';
      candidate.signature = [candidate.title, candidate.support, ambition, collaboration, timeframe].join('|');

      if (!state.recentRandomHistory.includes(candidate.signature) || attempt === 23) {
        result = candidate;
        break;
      }
    }

    if (!result) {
      state.recentRandomHistory = [];
      storage.set(storageKeys.recentRandomHistory, state.recentRandomHistory);
      return generateRandomResult();
    }

    state.lastRandomResult = result;
    state.recentRandomHistory = pushUniqueLimited(state.recentRandomHistory, result.signature, 12);
    storage.set(storageKeys.recentRandomHistory, state.recentRandomHistory);
    elements.randomResult.innerHTML =
      '<h4>' + escapeHtml(result.title) + '</h4><p>' + escapeHtml(result.summary) + '</p>' +
      '<p><strong>Biases:</strong> ' + escapeHtml(result.ambition) + ', ' + escapeHtml(result.collaboration) + ', ' + escapeHtml(result.timeframe) + '</p>';
  }

  function useRandomResult() {
    if (!state.lastRandomResult) {
      generateRandomResult();
    }
    if (!state.lastRandomResult) {
      return;
    }

    if (!elements.undertaking.value.trim()) {
      elements.undertaking.value = state.lastRandomResult.title;
    } else if (!elements.undertaking.value.includes(state.lastRandomResult.title)) {
      elements.undertaking.value += '\n- ' + state.lastRandomResult.title;
    }

    if (!elements.context.value.trim()) {
      elements.context.value = state.lastRandomResult.summary;
    }

    if (!elements.successCriteria.value.trim()) {
      elements.successCriteria.value = 'Make the output actionable, understandable, and reusable by the intended audience.';
    }

    updatePrompt();
  }

  function saveRandomResult() {
    if (!state.lastRandomResult) {
      elements.customMessage.textContent = 'Roll a new random direction before saving.';
      return;
    }

    const serialized = {
      title: state.lastRandomResult.title,
      summary: state.lastRandomResult.summary
    };
    const signature = serialized.title + '|' + serialized.summary;
    const existing = state.savedRandomResults.filter(function (entry) {
      return entry.title + '|' + entry.summary !== signature;
    });
    state.savedRandomResults = [serialized].concat(existing).slice(0, 8);
    storage.set(storageKeys.savedRandomResults, state.savedRandomResults);
    renderSavedRandomResults();
    elements.customMessage.textContent = 'Saved the current random direction.';
  }

  function renderSavedRandomResults() {
    if (!state.savedRandomResults.length) {
      elements.savedRandomList.innerHTML = '<li>No saved inspirations yet.</li>';
      return;
    }

    elements.savedRandomList.innerHTML = state.savedRandomResults
      .map(function (entry, index) {
        return (
          '<li><strong>' + escapeHtml(entry.title) + '</strong>: ' + escapeHtml(entry.summary) +
          '<button type="button" class="chip secondary" data-saved-random-index="' + index + '">Use</button></li>'
        );
      })
      .join('');

    elements.savedRandomList.querySelectorAll('[data-saved-random-index]').forEach(function (button) {
      button.addEventListener('click', function () {
        const index = Number(button.getAttribute('data-saved-random-index'));
        const entry = state.savedRandomResults[index];
        if (!entry) {
          return;
        }
        state.lastRandomResult = {
          title: entry.title,
          summary: entry.summary
        };
        elements.randomResult.innerHTML = '<h4>' + escapeHtml(entry.title) + '</h4><p>' + escapeHtml(entry.summary) + '</p>';
        useRandomResult();
      });
    });
  }

  function updatePrompt() {
    const lens = getTimeLensByKey(state.selectedTimeLensKey);
    const route = getLaunchRouteByKey(state.selectedLaunchRouteKey);
    const sections = [
      {
        title: 'Outcome',
        body: [
          fieldOrFallback(elements.undertaking.value, state.selectedStarterTitle || 'Define the main request.'),
          state.selectedStarterTitle ? 'Starter direction: ' + state.selectedStarterTitle + '. ' + getStarterSummary(state.selectedStarterTitle) : ''
        ]
      },
      {
        title: 'Context',
        body: [fieldOrFallback(elements.context.value, 'Provide the relevant background, current state, and audience context.')]
      },
      {
        title: 'Human considerations',
        body: [
          'Affected people: ' + fieldOrFallback(elements.affectedPeople.value, 'Name who the work affects.'),
          'Desired tone: ' + fieldOrFallback(elements.emotionalTone.value, 'Choose a tone that fits the people involved.'),
          'Consent and checkpoints: ' + fieldOrFallback(elements.consentQuestions.value, 'State what should be confirmed before continuing.'),
          'Benefits: ' + fieldOrFallback(elements.benefits.value, 'Describe who benefits and how.'),
          'Challenge and revision path: ' + fieldOrFallback(elements.challengePath.value, 'Explain how others can challenge or revise the result.')
        ]
      },
      {
        title: 'Constraints',
        body: [
          'Guardrails: ' + fieldOrFallback(elements.guardrails.value, 'List boundaries, exclusions, and non-negotiables.'),
          'Success criteria: ' + fieldOrFallback(elements.successCriteria.value, 'Define what makes the answer useful and ready.'),
          'Desired format: ' + fieldOrFallback(elements.desiredFormat.value, 'Specify the structure or format you want back.')
        ]
      },
      {
        title: 'Historical/future lens',
        body: ['Lens: ' + lens.label, lens.guidance]
      },
      {
        title: 'Launch or delivery path',
        body: [route.title + ': ' + route.summary, fieldOrFallback(elements.launchNotes.value, 'Add route-specific delivery notes if helpful.')]
      },
      {
        title: 'Handoff / expected output',
        body: [
          'Please respond with a clear, structured result that a person can review, challenge, revise, and then reuse in ChatGPT or a public workflow.',
          'If tradeoffs appear, name them explicitly and suggest the next checkpoint.'
        ]
      }
    ];

    const lines = [];
    sections.forEach(function (section) {
      const bodyLines = section.body
        .map(function (line) {
          return line && line.trim();
        })
        .filter(Boolean);
      if (!bodyLines.length) {
        return;
      }
      lines.push('## ' + section.title);
      bodyLines.forEach(function (line) {
        lines.push(line);
      });
      lines.push('');
    });

    const prompt = lines.join('\n').trim();
    elements.generatedPrompt.value = prompt;
    elements.promptSectionCount.textContent = sections.filter(function (section) {
      return section.body.some(function (line) {
        return line && line.trim();
      });
    }).length + ' sections';
    elements.promptCharacterCount.textContent = prompt.length + ' characters';
  }

  async function copyPrompt() {
    const value = elements.generatedPrompt.value;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        elements.copyStatus.textContent = 'Prompt copied to clipboard.';
        return;
      }
    } catch (error) {
      // fall through to manual selection
    }

    selectPrompt();
    elements.copyStatus.textContent = 'Clipboard API unavailable here. The prompt text is selected so you can copy it manually.';
  }

  function selectPrompt() {
    elements.generatedPrompt.focus();
    elements.generatedPrompt.select();
  }

  function applyStarterToFields(title) {
    const summary = getStarterSummary(title);
    if (!elements.undertaking.value.trim()) {
      elements.undertaking.value = title;
    }
    if (!elements.context.value.trim()) {
      elements.context.value = summary;
    }
    if (!elements.desiredFormat.value.trim()) {
      elements.desiredFormat.value = 'A structured response with headings, concise bullets, and practical next steps.';
    }
    if (!elements.successCriteria.value.trim()) {
      elements.successCriteria.value = 'Useful on first read, easy to adapt, and explicit about assumptions or tradeoffs.';
    }
  }

  function getAllCategories() {
    return builtInCategories
      .map(function (category) {
        const customOptions = state.customOptions[category.key] || [];
        return {
          key: category.key,
          label: category.label,
          description: category.description,
          options: category.options.concat(customOptions)
        };
      })
      .concat(state.customCategories);
  }

  function getCategoryByKey(key) {
    return getAllCategories().find(function (category) {
      return category.key === key;
    });
  }

  function getTimeLensByKey(key) {
    return timeLenses.find(function (lens) {
      return lens.key === key;
    });
  }

  function getLaunchRouteByKey(key) {
    return launchRoutes.find(function (route) {
      return route.key === key;
    });
  }

  function countStarterOptions(categories) {
    return categories.reduce(function (total, category) {
      return total + category.options.length;
    }, 0);
  }

  function getStarterSummary(title) {
    return starterDescriptions[title] || ('Use this starter to help ChatGPT ' + title.charAt(0).toLowerCase() + title.slice(1) + '.');
  }

  function fieldOrFallback(value, fallback) {
    return value.trim() || fallback;
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || ('custom-' + Date.now());
  }

  function isBuiltInCategory(key) {
    return builtInCategories.some(function (category) {
      return category.key === key;
    });
  }

  function randomIndex(length) {
    if (length <= 0) {
      return 0;
    }

    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const values = new Uint32Array(1);
      window.crypto.getRandomValues(values);
      return values[0] % length;
    }

    return Math.floor(Math.random() * length);
  }

  function pushUniqueLimited(list, value, limit) {
    const filtered = list.filter(function (entry) {
      return entry !== value;
    });
    filtered.unshift(value);
    return filtered.slice(0, limit);
  }

  function createSafeStorage() {
    const memoryStore = {};

    return {
      get: function (key, fallback) {
        try {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
          return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : fallback;
        }
      },
      set: function (key, value) {
        memoryStore[key] = value;
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          return false;
        }
        return true;
      }
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }
})();
