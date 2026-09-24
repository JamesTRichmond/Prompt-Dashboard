(function () {
  const agents = (window.PROMPT_DASHBOARD_DATA && window.PROMPT_DASHBOARD_DATA.dialAgents) || [];
  const storageKey = 'promptDashboard.activeDials';
  const markerStart = '## Council of Dials';
  const council = document.getElementById('dialCouncil');
  const preview = document.getElementById('dialPreview');
  const rail = document.getElementById('generatedPrompt');
  const sectionCount = document.getElementById('promptSectionCount');
  const characterCount = document.getElementById('promptCharacterCount');

  if (!council || !rail) {
    return;
  }

  let activeKeys = readActive();

  render();
  inject();

  function readActive() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeActive() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(activeKeys));
    } catch (error) {
      return;
    }
  }

  function seated() {
    return agents.filter(function (agent) {
      return activeKeys.indexOf(agent.key) !== -1;
    });
  }

  function render() {
    council.innerHTML = agents
      .map(function (agent) {
        const on = activeKeys.indexOf(agent.key) !== -1;
        return (
          '<button type="button" class="chip secondary' +
          (on ? ' active' : '') +
          '" data-dial-key="' +
          escapeAttr(agent.key) +
          '" aria-pressed="' +
          (on ? 'true' : 'false') +
          '">' +
          '<span class="chip-title">' +
          escapeHtml(agent.name) +
          '</span><span>' +
          escapeHtml(agent.bias) +
          '</span></button>'
        );
      })
      .join('');

    council.querySelectorAll('[data-dial-key]').forEach(function (button) {
      button.addEventListener('click', function () {
        const key = button.getAttribute('data-dial-key');
        const index = activeKeys.indexOf(key);
        if (index === -1) {
          activeKeys = activeKeys.concat([key]);
        } else {
          activeKeys = activeKeys.filter(function (entry) {
            return entry !== key;
          });
        }
        writeActive();
        render();
        inject();
      });
    });

    if (!preview) {
      return;
    }
    const chosen = seated();
    if (!chosen.length) {
      preview.innerHTML =
        '<p><strong>Empty chairs.</strong> Seat a dial and it will argue over the Human Field and the undertaking.</p>';
      return;
    }
    preview.innerHTML = chosen
      .map(function (agent) {
        return '<h4>' + escapeHtml(agent.name) + '</h4><p>' + escapeHtml(agent.agenda) + '</p>';
      })
      .join('');
  }

  function councilBlock() {
    const chosen = seated();
    if (!chosen.length) {
      return '';
    }
    const lines = [markerStart];
    chosen.forEach(function (agent) {
      lines.push(agent.name + ' (' + agent.bias + '): ' + agent.argument);
    });
    return lines.join('\n');
  }

  function stripCouncil(text) {
    const start = text.indexOf(markerStart);
    if (start === -1) {
      return text.trim();
    }
    const after = text.indexOf('\n## ', start + markerStart.length);
    if (after === -1) {
      return text.slice(0, start).trim();
    }
    return (text.slice(0, start) + text.slice(after)).trim();
  }

  function inject() {
    const block = councilBlock();
    const base = stripCouncil(rail.value);
    if (!block) {
      rail.value = base;
    } else {
      const insertAt = base.indexOf('## Historical/future lens');
      if (insertAt === -1) {
        rail.value = base ? base + '\n\n' + block : block;
      } else {
        rail.value = (base.slice(0, insertAt) + block + '\n\n' + base.slice(insertAt)).trim();
      }
    }
    if (sectionCount) {
      const count = (rail.value.match(/^## /gm) || []).length;
      sectionCount.textContent = count + ' sections';
    }
    if (characterCount) {
      characterCount.textContent = rail.value.length + ' characters';
    }
  }

  const observer = new MutationObserver(function () {
    inject();
  });
  observer.observe(rail, { attributes: true });
  rail.addEventListener('input', inject);

  const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
  if (originalDescriptor && originalDescriptor.set) {
    let syncing = false;
    const proto = HTMLTextAreaElement.prototype;
    const setter = originalDescriptor.set;
    Object.defineProperty(rail, 'value', {
      configurable: true,
      get: function () {
        return originalDescriptor.get.call(this);
      },
      set: function (next) {
        setter.call(this, next);
        if (!syncing && next.indexOf(markerStart) === -1 && seated().length) {
          syncing = true;
          inject();
          syncing = false;
        }
      }
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, '&#39;');
  }
})();
