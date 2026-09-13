'use strict';

var APP_VERSION = '0.7.0';
// ?storage=test — окремий ключ для автотестів, щоб не чіпати реальні дані
var STORAGE_KEY = /[?&]storage=test\b/.test(location.search) ? 'spreya:test' : 'spreya:v1';
var PRESETS = [1000, 1100, 1250];
var MAX_STREAMS = 3;
var CONFIRM_WINDOW_MS = 3000;
var MAX_VARIETIES = 10;

// ── Переклади ───────────────────────────────────────────────────────────────

var T = {
  uk: {
    title: 'Spreya',
    potatoSpeed: 'Швидкість картоплі',
    start: 'СТАРТ',
    lap: 'КОЛО',
    stopBtn: 'СТОП',
    reset: 'Скинути',
    streamsLabel: 'Ваги',
    addStream: '+ Додати ваги',
    removeStream: 'Прибрати ваги',
    totalDelta: 'Набрано',
    before: 'Було',
    after: 'Стало',
    kg: 'кг',
    kgPerMin: 'кг/хв',
    kgPerHour: 'кг/год',
    mlPerTon: 'мл/т',
    mlPerMin: 'мл/хв',
    modeCalc: 'Розрахунок',
    modeManual: 'Вручну',
    hintCalc: 'розрахунок',
    hintManual: 'вручну',
    hintNoData: 'Натисніть КОЛО або СТОП і введіть ваги',
    hintSwitch: 'тапніть, щоб перемкнути',
    preparations: 'Препарати',
    addPrep: '+ Додати препарат',
    name: 'Назва',
    norm: 'Норма',
    saveBtn: 'Зберегти',
    cancelBtn: 'Скасувати',
    namePlaceholder: 'напр. MAXIM',
    perLiterLabel: '1 л =',
    secShort: 'с',
    minShort: 'хв',
    hourShort: 'год',
    canVolume: 'Каністра',
    liter: 'л',
    canShort: 'кан',
    newSession: 'Нова сесія',
    sessionNumber: 'Сесія №',
    draft: 'налаштування',
    variety: 'Сорт',
    varietyPlaceholder: 'напр. Бельмонда',
    containers: 'Ємкості',
    addContainerType: '+ Додати ємкість',
    weight: 'Вага',
    selectPrepsForSession: 'Препарати в цій сесії',
    startSessionBtn: 'СТАРТ СЕСІЇ',
    backBtn: '← Назад',
    needContainer: 'Додайте хоча б одну ємкість',
    pcs: 'шт',
    minusOne: '−1',
    plusOne: '+1',
    totalTonnage: 'Загальний тоннаж',
    fact: 'факт',
    log: 'Журнал',
    endSessionBtn: 'Завершити сесію',
    sessionCompleted: 'Сесія завершена',
    duration: 'Тривалість',
    containersCount: 'Ємкостей',
    avgSpeed: 'Середня швидкість',
    closeBtn: 'Закрити',
    pauseBtn: 'Пауза',
    resumeBtn: 'Продовжити',
    paused: 'НА ПАУЗІ',
    confirmDouble: 'Ще раз — точно',
    deleteType: 'Видалити ємкість',
    removeFromSession: 'Прибрати з сесії',
    deleteSession: 'Видалити сесію',
    kind: 'Тип',
    size: 'Розмір',
    correction: 'Корекція',
    countUnits: 'Кількість штук',
    correctionKg: 'Корекція (кг)',
    correctionL: 'Корекція (л)',
    correctionHintKg: 'додатне — додати, від\'ємне — забрати (повернення)',
    addKindTitle: 'Новий тип',
    addKindHint: 'напр. бочка, контейнер',
    addSizeTitle: 'Новий розмір',
    addSizeHint: 'напр. насіннєва, технічна',
    edit: 'Редагувати',
    sessionsBtn: 'Завершені сесії',
    sessionsList: 'Завершені сесії',
    noSessions: 'Поки що нема завершених сесій',
    viewSession: 'Переглянути',
    share: 'Поділитися',
    copied: 'Підсумок скопійовано',
    dataLabel: 'Дані',
    exportBtn: 'Експорт (JSON)',
    importBtn: 'Імпорт (JSON)',
    exportHint: 'Усі препарати, сесії та налаштування — в один файл. Зберігайте копію: дані живуть лише в цьому браузері.',
    importTitle: 'Імпорт даних',
    importConfirm: 'Замінити всі поточні дані вмістом файлу?',
    importSummary: 'У файлі: {sessions} сесій, {preps} препаратів.',
    importBad: 'Файл не схожий на експорт Spreya',
    replaceBtn: 'Замінити',
    weightRequired: 'Вкажіть вагу ємкості',
    nameRequired: 'Вкажіть назву',
    normRequired: 'Норма має бути більшою за 0',
    canRequired: 'Об\'єм каністри має бути більшим за 0',
    prepInUse: 'Препарат у поточній сесії — спочатку приберіть його там',
    newVersion: 'Є нова версія',
    reloadBtn: 'Оновити',
    offlineReady: 'Готово до роботи офлайн',
    ariaTheme: 'Перемкнути тему',
    ariaEdit: 'Редагувати',
    ariaDelete: 'Видалити',
    ariaRemove: 'Прибрати',
    ariaToggle: 'Увімкнути/вимкнути',
    ariaRemoveEvent: 'Видалити запис'
  },
  en: {
    title: 'Spreya',
    potatoSpeed: 'Potato throughput',
    start: 'START',
    lap: 'LAP',
    stopBtn: 'STOP',
    reset: 'Reset',
    streamsLabel: 'Scales',
    addStream: '+ Add scale',
    removeStream: 'Remove scale',
    totalDelta: 'Added',
    before: 'Before',
    after: 'After',
    kg: 'kg',
    kgPerMin: 'kg/min',
    kgPerHour: 'kg/h',
    mlPerTon: 'ml/t',
    mlPerMin: 'ml/min',
    modeCalc: 'Calculated',
    modeManual: 'Manual',
    hintCalc: 'calculated',
    hintManual: 'manual',
    hintNoData: 'Press LAP or STOP and enter weights',
    hintSwitch: 'tap to switch',
    preparations: 'Treatments',
    addPrep: '+ Add treatment',
    name: 'Name',
    norm: 'Rate',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    namePlaceholder: 'e.g. MAXIM',
    perLiterLabel: '1 L =',
    secShort: 's',
    minShort: 'min',
    hourShort: 'h',
    canVolume: 'Canister',
    liter: 'L',
    canShort: 'can',
    newSession: 'New session',
    sessionNumber: 'Session #',
    draft: 'setup',
    variety: 'Variety',
    varietyPlaceholder: 'e.g. Belmonda',
    containers: 'Containers',
    addContainerType: '+ Add container',
    weight: 'Weight',
    selectPrepsForSession: 'Treatments in this session',
    startSessionBtn: 'START SESSION',
    backBtn: '← Back',
    needContainer: 'Add at least one container',
    pcs: 'pcs',
    minusOne: '−1',
    plusOne: '+1',
    totalTonnage: 'Total tonnage',
    fact: 'actual',
    log: 'Log',
    endSessionBtn: 'End session',
    sessionCompleted: 'Session completed',
    duration: 'Duration',
    containersCount: 'Containers',
    avgSpeed: 'Average speed',
    closeBtn: 'Close',
    pauseBtn: 'Pause',
    resumeBtn: 'Resume',
    paused: 'PAUSED',
    confirmDouble: 'Tap again to confirm',
    deleteType: 'Delete container',
    removeFromSession: 'Remove from session',
    deleteSession: 'Delete session',
    kind: 'Kind',
    size: 'Size',
    correction: 'Correction',
    countUnits: 'Count',
    correctionKg: 'Correction (kg)',
    correctionL: 'Correction (L)',
    correctionHintKg: 'positive — add, negative — subtract (return)',
    addKindTitle: 'New kind',
    addKindHint: 'e.g. barrel, container',
    addSizeTitle: 'New size',
    addSizeHint: 'e.g. seed, technical',
    edit: 'Edit',
    sessionsBtn: 'Completed sessions',
    sessionsList: 'Completed sessions',
    noSessions: 'No completed sessions yet',
    viewSession: 'View',
    share: 'Share',
    copied: 'Summary copied',
    dataLabel: 'Data',
    exportBtn: 'Export (JSON)',
    importBtn: 'Import (JSON)',
    exportHint: 'All treatments, sessions and settings in one file. Keep a copy: data lives only in this browser.',
    importTitle: 'Import data',
    importConfirm: 'Replace all current data with the file contents?',
    importSummary: 'File contains {sessions} sessions, {preps} treatments.',
    importBad: 'File does not look like a Spreya export',
    replaceBtn: 'Replace',
    weightRequired: 'Enter the container weight',
    nameRequired: 'Enter a name',
    normRequired: 'Rate must be greater than 0',
    canRequired: 'Canister volume must be greater than 0',
    prepInUse: 'Treatment is in the current session — remove it there first',
    newVersion: 'New version available',
    reloadBtn: 'Reload',
    offlineReady: 'Ready to work offline',
    ariaTheme: 'Toggle theme',
    ariaEdit: 'Edit',
    ariaDelete: 'Delete',
    ariaRemove: 'Remove',
    ariaToggle: 'Toggle',
    ariaRemoveEvent: 'Remove entry'
  }
};

function tr(key) { return T[state.lang][key] || T.uk[key] || key; }

function trf(key, vars) {
  return tr(key).replace(/\{(\w+)\}/g, function(_, k) { return vars[k] != null ? vars[k] : ''; });
}

// ── Стан ────────────────────────────────────────────────────────────────────

var state = {
  lang: 'uk',
  theme: 'dark',
  manualSpeed: 0,
  speedMode: 'calc',            // 'calc' | 'manual'
  preparations: [
    { id: 1, name: 'MAXIM', norm: 250, canVolume: 5, active: true }
  ],
  timer: { running: false, startMs: null, elapsedMs: 0, frozenElapsedMs: 0 },
  streams: [],
  editingPrepId: null,
  view: 'main',                 // 'main' | 'session' | 'history'
  session: null,                // поточна (чернетка / активна / щойно завершена)
  sessions: [],                 // архів
  varieties: [],
  containerKinds: ['ящик', 'мішок'],
  sizes: ['крупна', 'середня', 'дрібна'],
  viewingSessionId: null,       // перегляд з історії — не чіпає state.session
  modal: null,
  prompt: null,
  ui: { logOpen: false, addPrepOpen: false }
};

var timerInterval = null;
var sessionTicker = null;
var LEGACY_KINDS = ['Bag', 'Box']; // колись додавались автоматично англійською

function loadState() {
  var raw;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { return; }
  if (!raw) return;
  var data;
  try { data = JSON.parse(raw); } catch (e) { console.warn('load failed', e); return; }
  if (!data || typeof data !== 'object') return;

  if (data.lang === 'uk' || data.lang === 'en') state.lang = data.lang;
  if (data.theme === 'light' || data.theme === 'dark') state.theme = data.theme;
  if (typeof data.manualSpeed === 'number' && isFinite(data.manualSpeed)) state.manualSpeed = data.manualSpeed;
  if (data.speedMode === 'manual' || data.speedMode === 'calc') state.speedMode = data.speedMode;
  else state.speedMode = state.manualSpeed > 0 ? 'manual' : 'calc';

  if (Array.isArray(data.preparations)) {
    state.preparations = data.preparations.filter(function(p) { return p && typeof p === 'object'; }).map(function(p) {
      if (p.canVolume == null) p.canVolume = 5;
      if (typeof p.name !== 'string') p.name = '';
      return p;
    });
  }
  if (data.session && typeof data.session === 'object') state.session = migrateSession(data.session);
  if (Array.isArray(data.sessions)) state.sessions = data.sessions.filter(function(s) { return s && typeof s === 'object'; }).map(migrateSession);
  if (Array.isArray(data.varieties)) state.varieties = data.varieties.filter(function(v) { return typeof v === 'string'; });
  if (Array.isArray(data.containerKinds) && data.containerKinds.length > 0) state.containerKinds = data.containerKinds.filter(function(v) { return typeof v === 'string'; });
  if (Array.isArray(data.sizes) && data.sizes.length > 0) state.sizes = data.sizes.filter(function(v) { return typeof v === 'string'; });

  // Прибираємо «Bag»/«Box», якщо їх не використовує жодна ємкість.
  var usedKinds = {};
  allSessions().forEach(function(s) {
    (s.containerTypes || []).forEach(function(t) { usedKinds[t.kind] = true; });
  });
  state.containerKinds = state.containerKinds.filter(function(k) {
    return LEGACY_KINDS.indexOf(k) === -1 || usedKinds[k];
  });
  if (state.containerKinds.length === 0) state.containerKinds = ['ящик'];

  if (data.timer && typeof data.timer === 'object') {
    state.timer.running = !!data.timer.running;
    state.timer.startMs = (typeof data.timer.startMs === 'number') ? data.timer.startMs : null;
    state.timer.elapsedMs = (typeof data.timer.elapsedMs === 'number') ? data.timer.elapsedMs : 0;
    state.timer.frozenElapsedMs = (typeof data.timer.frozenElapsedMs === 'number') ? data.timer.frozenElapsedMs : 0;
    // Секундомір біг, коли застосунок закрили — рахуємо від годинника.
    if (state.timer.running && state.timer.startMs) {
      state.timer.elapsedMs = Date.now() - state.timer.startMs;
    } else if (state.timer.running) {
      state.timer.running = false;
    }
  }
  if (Array.isArray(data.streams) && data.streams.length > 0) state.streams = data.streams;
}

function migrateSession(s) {
  if (!Array.isArray(s.events)) s.events = [];
  if (!Array.isArray(s.containerTypes)) s.containerTypes = [];
  if (!Array.isArray(s.activePrepIds)) s.activePrepIds = [];
  if (!s.canVolumes || typeof s.canVolumes !== 'object') s.canVolumes = {};
  if (!s.prepSnapshots || typeof s.prepSnapshots !== 'object') s.prepSnapshots = {};
  if (typeof s.totalPausedMs !== 'number') s.totalPausedMs = 0;
  s.containerTypes.forEach(function(t) {
    if (!t.kind) t.kind = 'ящик';
    if (t.size === undefined || t.size === null) t.size = '';
  });
  return s;
}

function allSessions() {
  var list = state.sessions.slice();
  if (state.session) list.push(state.session);
  return list;
}

function serializeState() {
  return {
    lang: state.lang,
    theme: state.theme,
    manualSpeed: state.manualSpeed,
    speedMode: state.speedMode,
    preparations: state.preparations,
    session: state.session,
    sessions: state.sessions,
    varieties: state.varieties,
    containerKinds: state.containerKinds,
    sizes: state.sizes,
    timer: state.timer,
    streams: state.streams
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeState()));
  } catch (e) { console.warn('save failed', e); }
}

// ── Утиліти ─────────────────────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

function vibrate(p) { if (navigator.vibrate) { try { navigator.vibrate(p); } catch (e) {} } }

function fmtNum(n, decimals) { return Calc.fmtNum(n, decimals, state.lang); }
function fmtLiters(l) { return Calc.fmtLiters(l, state.lang); }
function fmtTime(ms) { return Calc.fmtHMS(ms); }
function fmtMinutes(min) {
  return Calc.fmtMinutes(min, { sec: tr('secShort'), min: tr('minShort'), hour: tr('hourShort') });
}
function fmtSigned(n, decimals) {
  return (n > 0 ? '+' : '') + fmtNum(n, decimals);
}

function fmtClock(ts) {
  var d = new Date(ts);
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function fmtDate(ts) {
  var d = new Date(ts);
  return String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + d.getFullYear();
}

function fmtDateISO(ts) {
  var d = new Date(ts);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function uid() {
  return Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function sameId(a, b) { return String(a) === String(b); }

// Двоетапне підтвердження: перший тап «зводить» кнопку, другий протягом
// CONFIRM_WINDOW_MS виконує дію. Повертає true, коли дію можна виконувати.
function confirmTap(btn) {
  if (btn._armed) {
    disarmConfirm(btn);
    return true;
  }
  btn._armed = true;
  btn._origText = btn.textContent;
  btn.classList.add('armed');
  btn.textContent = '↻ ' + tr('confirmDouble');
  vibrate(40);
  btn._armTimer = setTimeout(function() { disarmConfirm(btn); }, CONFIRM_WINDOW_MS);
  return false;
}

function disarmConfirm(btn) {
  if (!btn) return;
  if (btn._armTimer) { clearTimeout(btn._armTimer); btn._armTimer = null; }
  if (btn._armed) {
    btn.classList.remove('armed');
    btn.textContent = btn._origText;
  }
  btn._armed = false;
}

// Спливаюче повідомлення знизу. action: { label, onClick } — необов'язково.
var toastTimer = null;
function showToast(msg, action, sticky) {
  var el = $('toast');
  if (!el) return;
  el.innerHTML = '<span class="toast-msg">' + escapeHtml(msg) + '</span>';
  if (action) {
    var b = document.createElement('button');
    b.className = 'toast-action';
    b.textContent = action.label;
    b.addEventListener('click', function() { hideToast(); action.onClick(); });
    el.appendChild(b);
  }
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  if (!sticky) toastTimer = setTimeout(hideToast, action ? 8000 : 2500);
}

function hideToast() {
  var el = $('toast');
  if (el) el.classList.remove('show');
}

// Повідомлення про помилку під полем; зникає при наступному введенні.
function fieldError(input, msg) {
  if (!input) return;
  input.classList.add('invalid');
  var holder = input.closest('.field') || input.parentNode;
  var err = holder.querySelector('.field-error');
  if (!err) {
    err = document.createElement('div');
    err.className = 'field-error';
    holder.appendChild(err);
  }
  err.textContent = msg;
  input.focus();
  input.addEventListener('input', function clear() {
    input.classList.remove('invalid');
    if (err.parentNode) err.parentNode.removeChild(err);
    input.removeEventListener('input', clear);
  });
}

// ── Тема, мова ──────────────────────────────────────────────────────────────

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', state.theme === 'light' ? '#faf8f4' : '#0a0a0a');
  var btn = $('themeBtn');
  if (btn) {
    btn.textContent = state.theme === 'dark' ? '☀' : '☾';
    btn.setAttribute('aria-label', tr('ariaTheme'));
  }
}

function renderI18n() {
  document.documentElement.lang = state.lang;
  document.title = tr('title');
  var els = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < els.length; i++) {
    var key = els[i].getAttribute('data-i18n');
    if (T[state.lang][key]) els[i].textContent = T[state.lang][key];
  }
  var ariaEls = document.querySelectorAll('[data-i18n-aria]');
  for (var k = 0; k < ariaEls.length; k++) {
    ariaEls[k].setAttribute('aria-label', tr(ariaEls[k].getAttribute('data-i18n-aria')));
  }
  var langBtns = document.querySelectorAll('#langToggle button');
  for (var j = 0; j < langBtns.length; j++) {
    var active = langBtns[j].getAttribute('data-lang') === state.lang;
    langBtns[j].classList.toggle('active', active);
    langBtns[j].setAttribute('aria-pressed', active ? 'true' : 'false');
  }
  applyTheme();
}

function renderAll() {
  renderI18n();
  renderTimer();
  renderStreams();
  renderPreparations();
  updateSpeedDisplay();
  renderViews();
}

// ── Секундомір і швидкість ──────────────────────────────────────────────────

function timerPhase() {
  if (state.timer.running) return 'running';
  if (state.timer.elapsedMs > 0 || state.timer.frozenElapsedMs > 0) return 'stopped';
  return 'idle';
}

function renderTimer() {
  var display = $('timerDisplay');
  var lapTimeEl = $('lapTime');
  var lapRow = $('lapDisplay');
  var btn1 = $('timerBtn');
  var btn2 = $('timerBtn2');
  var phase = timerPhase();

  display.textContent = fmtTime(state.timer.elapsedMs);
  display.className = 'timer-display ' + (phase === 'running' ? 'running' : (phase === 'idle' ? 'idle' : ''));

  if (state.timer.frozenElapsedMs > 0) {
    lapTimeEl.textContent = fmtTime(state.timer.frozenElapsedMs);
    lapRow.classList.remove('empty');
  } else {
    lapTimeEl.textContent = '—';
    lapRow.classList.add('empty');
  }

  disarmConfirm(btn1);
  disarmConfirm(btn2);
  if (phase === 'idle') {
    btn1.textContent = tr('start');
    btn1.className = 'btn btn-primary';
    btn2.classList.add('hidden');
  } else if (phase === 'running') {
    btn1.textContent = tr('lap');
    btn1.className = 'btn btn-primary';
    btn2.textContent = tr('stopBtn');
    btn2.className = 'btn btn-stop';
    btn2.classList.remove('hidden');
  } else {
    btn1.textContent = tr('start');
    btn1.className = 'btn btn-primary';
    btn2.textContent = tr('reset');
    btn2.className = 'btn btn-secondary';
    btn2.classList.remove('hidden');
  }
}

function onTimerBtn1() {
  var phase = timerPhase();
  if (phase === 'idle') { startTimer(); return; }
  if (phase === 'running') { lapTimer(); return; }
  // stopped: новий старт стирає поточний вимір — підтверджуємо, якщо є що втрачати
  if (Calc.streamsTotal(state.streams) > 0 && !confirmTap($('timerBtn'))) return;
  startTimer();
}

function onTimerBtn2() {
  var phase = timerPhase();
  if (phase === 'running') { stopTimer(); return; }
  if (phase === 'stopped') {
    if (!confirmTap($('timerBtn2'))) return;
    resetTimer();
  }
}

function startTimer() {
  state.timer = { running: true, startMs: Date.now(), elapsedMs: 0, frozenElapsedMs: 0 };
  state.streams.forEach(function(s) { s.after = ''; });
  vibrate(50);
  clearInterval(timerInterval);
  timerInterval = setInterval(tickTimer, 100);
  acquireWakeLock();
  saveState();
  renderTimer();
  renderStreams();
  updateSpeedDisplay();
}

function lapTimer() {
  if (state.timer.elapsedMs < 500) return; // захист від випадкового подвійного тапу
  state.timer.frozenElapsedMs = state.timer.elapsedMs;
  state.speedMode = 'calc';
  vibrate([40, 40, 80]);
  saveState();
  renderTimer();
  updateSpeedDisplay();
}

function stopTimer() {
  if (!state.timer.running) return;
  state.timer.elapsedMs = Date.now() - state.timer.startMs;
  state.timer.frozenElapsedMs = state.timer.elapsedMs; // СТОП = фінальне коло
  state.timer.running = false;
  state.speedMode = 'calc';
  clearInterval(timerInterval);
  releaseWakeLock();
  vibrate([40, 40, 80]);
  saveState();
  renderTimer();
  updateSpeedDisplay();
}

function resetTimer() {
  state.timer = { running: false, startMs: null, elapsedMs: 0, frozenElapsedMs: 0 };
  state.streams = [
    { id: uid(), before: '', after: '' },
    { id: uid(), before: '', after: '' }
  ];
  clearInterval(timerInterval);
  releaseWakeLock();
  saveState();
  renderTimer();
  renderStreams();
  updateSpeedDisplay();
}

// Запис у localStorage не частіше, ніж раз на ~3 с.
var lastTimerSaveMs = 0;
function tickTimer() {
  if (!state.timer.running) return;
  state.timer.elapsedMs = Date.now() - state.timer.startMs;
  $('timerDisplay').textContent = fmtTime(state.timer.elapsedMs);
  var now = Date.now();
  if (now - lastTimerSaveMs > 3000) {
    lastTimerSaveMs = now;
    saveState();
  }
}

// Wake Lock: не гасити екран, поки біжить секундомір.
var wakeLock = null;
function acquireWakeLock() {
  if (!('wakeLock' in navigator)) return;
  if (document.visibilityState !== 'visible') return;
  navigator.wakeLock.request('screen').then(function(lock) {
    wakeLock = lock;
    lock.addEventListener('release', function() { wakeLock = null; });
  }).catch(function() { /* не критично */ });
}
function releaseWakeLock() {
  if (wakeLock) {
    try { wakeLock.release(); } catch (e) {}
    wakeLock = null;
  }
}

function calculatedSpeed() {
  return Calc.speedKgPerMin(Calc.streamsTotal(state.streams), state.timer.frozenElapsedMs);
}

function currentSpeed() {
  if (state.speedMode === 'manual') return state.manualSpeed > 0 ? state.manualSpeed : 0;
  var calc = calculatedSpeed();
  return calc !== null ? calc : 0;
}

function setSpeedMode(mode) {
  if (mode !== 'calc' && mode !== 'manual') return;
  state.speedMode = mode;
  saveState();
  updateSpeedDisplay();
  if (mode === 'manual') {
    var inp = $('manualSpeed');
    if (inp) inp.focus();
  }
}

function updateSpeedDisplay() {
  var speed = currentSpeed();
  var numEl = $('speedNum');
  var hourEl = $('speedHour');
  if (speed > 0) {
    numEl.className = 'num';
    numEl.textContent = fmtNum(speed, speed < 100 ? 1 : 0);
    hourEl.textContent = fmtNum(speed * 60);
  } else {
    numEl.className = 'num zero';
    numEl.textContent = '0';
    hourEl.textContent = '0';
  }

  var modeBtns = document.querySelectorAll('#speedMode button');
  for (var i = 0; i < modeBtns.length; i++) {
    var on = modeBtns[i].getAttribute('data-mode') === state.speedMode;
    modeBtns[i].classList.toggle('active', on);
    modeBtns[i].setAttribute('aria-checked', on ? 'true' : 'false');
  }
  var manualRow = $('manualRow');
  var manualInput = $('manualSpeed');
  manualRow.classList.toggle('hidden', state.speedMode !== 'manual');
  if (manualInput && document.activeElement !== manualInput) {
    manualInput.value = state.manualSpeed > 0 ? state.manualSpeed : '';
  }

  // Підказка про другий, неактивний режим.
  var hint = $('speedHint');
  var calc = calculatedSpeed();
  var hintText = '';
  if (state.speedMode === 'manual') {
    hintText = calc !== null
      ? tr('hintCalc') + ': ' + fmtNum(calc, calc < 100 ? 1 : 0) + ' ' + tr('kgPerMin') + ' · ' + tr('hintSwitch')
      : '';
  } else {
    if (calc === null) {
      hintText = tr('hintNoData');
      if (state.manualSpeed > 0) hintText += ' · ' + tr('hintManual') + ': ' + fmtNum(state.manualSpeed, state.manualSpeed < 100 ? 1 : 0) + ' ' + tr('kgPerMin');
    } else if (state.manualSpeed > 0) {
      hintText = tr('hintManual') + ': ' + fmtNum(state.manualSpeed, state.manualSpeed < 100 ? 1 : 0) + ' ' + tr('kgPerMin') + ' · ' + tr('hintSwitch');
    }
  }
  hint.textContent = hintText;
  hint.classList.toggle('hidden', !hintText);

  refreshPrepNumbers();
}

// ── Ваги (потоки) ───────────────────────────────────────────────────────────

function ensureStreams() {
  while (state.streams.length < 2) {
    state.streams.push({ id: uid(), before: '', after: '' });
  }
}

function refreshStreamDeltas() {
  var total = Calc.streamsTotal(state.streams);
  var blocks = document.querySelectorAll('#streamsList .stream-block');
  var multi = state.streams.length > 1;
  state.streams.forEach(function(stream, idx) {
    if (!blocks[idx]) return;
    var deltaEl = blocks[idx].querySelector('[data-role="delta"]');
    if (!deltaEl) return;
    var d = Calc.streamDelta(stream);
    if (d > 0) {
      var content = 'Δ <strong>' + fmtNum(d) + '</strong> ' + tr('kg');
      if (multi && total > 0) content += ' · ' + fmtNum(d / total * 100, 0) + '%';
      deltaEl.innerHTML = content;
    } else {
      deltaEl.innerHTML = '';
    }
  });
  $('streamTotal').textContent = fmtNum(total);
}

function onStreamInput() {
  refreshStreamDeltas();
  updateSpeedDisplay();
  saveState();
}

function renderStreams() {
  var list = $('streamsList');
  list.innerHTML = '';
  ensureStreams();

  state.streams.forEach(function(stream, idx) {
    var block = document.createElement('div');
    block.className = 'stream-block';
    var showRemove = state.streams.length > 2;

    var html = '';
    html += '<div class="stream-head">';
    html += '<div class="stream-num">№' + (idx + 1) + '</div>';
    html += '<div class="stream-delta-inline" data-role="delta"></div>';
    if (showRemove) html += '<button class="icon-btn remove-stream" data-role="remove" aria-label="' + escapeHtml(tr('removeStream')) + '">✕</button>';
    html += '</div>';
    html += '<div class="stream-pair">';
    html += '<label class="stream-field"><span class="stream-field-label">' + tr('before') + '</span>';
    html += '<input type="number" inputmode="decimal" min="0" data-role="before" value="' + escapeHtml(String(stream.before)) + '" placeholder="0"></label>';
    html += '<div class="arrow" aria-hidden="true">→</div>';
    html += '<label class="stream-field"><span class="stream-field-label">' + tr('after') + '</span>';
    html += '<input type="number" inputmode="decimal" min="0" data-role="after" value="' + escapeHtml(String(stream.after)) + '" placeholder="0"></label>';
    html += '</div>';
    html += '<div class="stream-presets" data-role="presets"></div>';
    block.innerHTML = html;

    var beforeInput = block.querySelector('[data-role="before"]');
    var afterInput = block.querySelector('[data-role="after"]');
    var presetsEl = block.querySelector('[data-role="presets"]');

    beforeInput.addEventListener('input', function(e) {
      stream.before = e.target.value === '' ? '' : Number(e.target.value);
      onStreamInput();
    });
    afterInput.addEventListener('input', function(e) {
      stream.after = e.target.value === '' ? '' : Number(e.target.value);
      onStreamInput();
    });

    if (showRemove) {
      block.querySelector('[data-role="remove"]').addEventListener('click', function() {
        state.streams = state.streams.filter(function(s) { return s.id !== stream.id; });
        renderStreams();
        updateSpeedDisplay();
        saveState();
      });
    }

    PRESETS.forEach(function(p) {
      var b = document.createElement('button');
      b.className = 'preset-btn';
      b.textContent = p;
      b.addEventListener('click', function() {
        stream.after = p;
        afterInput.value = p;
        onStreamInput();
      });
      presetsEl.appendChild(b);
    });

    list.appendChild(block);
  });

  refreshStreamDeltas();
  $('addStreamBtn').disabled = state.streams.length >= MAX_STREAMS;
}

// ── Препарати (головний екран) ──────────────────────────────────────────────

function findPrep(pid) {
  for (var i = 0; i < state.preparations.length; i++) {
    if (sameId(state.preparations[i].id, pid)) return state.preparations[i];
  }
  return null;
}

// Назва/норма препарату для сесії: спершу знімок у сесії, потім поточний список.
function sessionPrep(sess, pid) {
  var snap = sess.prepSnapshots ? (sess.prepSnapshots[pid] || sess.prepSnapshots[String(pid)]) : null;
  var live = findPrep(pid);
  if (live) return { id: live.id, name: live.name, norm: live.norm, canVolume: live.canVolume };
  if (snap) return { id: pid, name: snap.name, norm: snap.norm, canVolume: snap.canVolume };
  return null;
}

function snapshotPrep(sess, pid) {
  var p = findPrep(pid);
  if (!p) return;
  if (!sess.prepSnapshots) sess.prepSnapshots = {};
  sess.prepSnapshots[String(pid)] = { name: p.name, norm: p.norm, canVolume: p.canVolume || 5 };
}

// Препарат задіяний у сесії, що вже йде (чернетку можна правити вільно).
function prepInCurrentSession(pid) {
  var s = state.session;
  if (!s || !s.startedAt || s.endedAt) return false;
  return s.activePrepIds.some(function(x) { return sameId(x, pid); });
}

function prepCardNumbers(prep, speed) {
  var ml = prep.active ? Calc.mlPerMin(speed, prep.norm) : null;
  var minPerL = ml !== null ? Calc.minutesPerLiter(ml) : null;
  return {
    mlText: ml !== null ? fmtNum(ml, ml < 100 ? 1 : 0) : '—',
    mlDimmed: ml === null,
    rtText: minPerL !== null ? fmtMinutes(minPerL) : '—',
    rtDimmed: minPerL === null
  };
}

function refreshPrepNumbers() {
  var speed = currentSpeed();
  var cards = document.querySelectorAll('#prepList .prep-card[data-prep-id]');
  for (var i = 0; i < cards.length; i++) {
    var prep = findPrep(cards[i].getAttribute('data-prep-id'));
    if (!prep) continue;
    var n = prepCardNumbers(prep, speed);
    var mlEl = cards[i].querySelector('.ml-min');
    var rtEl = cards[i].querySelector('.po-runtime');
    if (mlEl) { mlEl.textContent = n.mlText; mlEl.classList.toggle('dimmed', n.mlDimmed); }
    if (rtEl) { rtEl.querySelector('[data-role="rt"]').textContent = n.rtText; rtEl.classList.toggle('dimmed', n.rtDimmed); }
  }
}

function renderPreparations() {
  var list = $('prepList');
  list.innerHTML = '';
  var speed = currentSpeed();

  state.preparations.forEach(function(prep) {
    var card = document.createElement('div');
    card.className = 'prep-card' + (prep.active ? ' active' : '');
    card.setAttribute('data-prep-id', String(prep.id));

    if (sameId(state.editingPrepId, prep.id)) {
      renderPrepEdit(card, prep);
    } else {
      renderPrepCard(card, prep, speed);
    }
    list.appendChild(card);
  });
}

function renderPrepEdit(card, prep) {
  var html = '';
  html += '<div class="prep-edit">';
  html += '<div class="field-row field"><label for="pn' + prep.id + '">' + tr('name') + '</label>';
  html += '<input id="pn' + prep.id + '" type="text" data-role="editName" value="' + escapeHtml(prep.name) + '" placeholder="' + escapeHtml(tr('namePlaceholder')) + '" autocomplete="off"></div>';
  html += '<div class="field-row field"><label for="pr' + prep.id + '">' + tr('norm') + '</label>';
  html += '<input id="pr' + prep.id + '" type="number" inputmode="decimal" min="0" data-role="editNorm" value="' + prep.norm + '">';
  html += '<span class="unit-tag">' + tr('mlPerTon') + '</span></div>';
  html += '<div class="field-row field"><label for="pc' + prep.id + '">' + tr('canVolume') + '</label>';
  html += '<input id="pc' + prep.id + '" type="number" inputmode="decimal" min="0" data-role="editCan" value="' + (prep.canVolume || 5) + '">';
  html += '<span class="unit-tag">' + tr('liter') + '</span></div>';
  html += '<div class="edit-actions">';
  html += '<button class="btn btn-secondary" data-action="cancel">' + tr('cancelBtn') + '</button>';
  html += '<button class="btn btn-primary" data-action="save">' + tr('saveBtn') + '</button>';
  html += '</div>';
  html += '</div>';
  card.innerHTML = html;

  card.querySelector('[data-action="cancel"]').addEventListener('click', function() {
    if (!prep.name) {
      state.preparations = state.preparations.filter(function(p) { return p.id !== prep.id; });
    }
    state.editingPrepId = null;
    saveState();
    renderPreparations();
  });
  card.querySelector('[data-action="save"]').addEventListener('click', function() {
    var nameEl = card.querySelector('[data-role="editName"]');
    var normEl = card.querySelector('[data-role="editNorm"]');
    var canEl = card.querySelector('[data-role="editCan"]');
    var newName = nameEl.value.trim();
    var newNorm = Number(normEl.value);
    var newCan = Number(canEl.value);
    if (!newName) { fieldError(nameEl, tr('nameRequired')); return; }
    if (!isFinite(newNorm) || newNorm <= 0) { fieldError(normEl, tr('normRequired')); return; }
    if (!isFinite(newCan) || newCan <= 0) { fieldError(canEl, tr('canRequired')); return; }
    prep.name = newName;
    prep.norm = newNorm;
    prep.canVolume = newCan;
    state.editingPrepId = null;
    saveState();
    renderPreparations();
    if (state.view === 'session') renderSessionView();
  });
  setTimeout(function() { var f = card.querySelector('[data-role="editName"]'); if (f) f.focus(); }, 30);
}

function renderPrepCard(card, prep, speed) {
  var n = prepCardNumbers(prep, speed);
  var html = '';
  html += '<div class="prep-head">';
  html += '<button class="prep-checkbox ' + (prep.active ? 'checked' : '') + '" role="checkbox" aria-checked="' + (prep.active ? 'true' : 'false') + '" data-action="toggle" aria-label="' + escapeHtml(tr('ariaToggle') + ' ' + prep.name) + '"></button>';
  html += '<div class="prep-name">' + escapeHtml(prep.name) + '<span class="prep-norm-inline">' + fmtNum(prep.norm, 0) + ' ' + tr('mlPerTon') + '</span></div>';
  html += '<div class="prep-actions">';
  html += '<button class="icon-btn prep-action-btn" data-action="edit" aria-label="' + escapeHtml(tr('ariaEdit') + ' ' + prep.name) + '">✎</button>';
  html += '<button class="icon-btn prep-action-btn del confirm-btn" data-action="delete" aria-label="' + escapeHtml(tr('ariaDelete') + ' ' + prep.name) + '">✕</button>';
  html += '</div>';
  html += '</div>';
  html += '<div class="prep-output">';
  html += '<div class="po-main">';
  html += '<span class="arrow" aria-hidden="true">→</span>';
  html += '<span class="ml-min ' + (n.mlDimmed ? 'dimmed' : '') + '">' + n.mlText + '</span>';
  html += '<span class="ml-unit">' + tr('mlPerMin') + '</span>';
  html += '</div>';
  html += '<div class="po-runtime ' + (n.rtDimmed ? 'dimmed' : '') + '">';
  html += '<span class="rt-label">' + tr('perLiterLabel') + '</span>';
  html += '<span data-role="rt">' + n.rtText + '</span>';
  html += '</div>';
  html += '</div>';
  html += '<div class="prep-reverse">';
  html += '<input type="number" inputmode="decimal" min="0" placeholder="0" data-role="revMl" aria-label="' + escapeHtml(tr('mlPerMin')) + '">';
  html += '<span class="rev-unit">' + tr('mlPerMin') + '</span>';
  html += '<span class="rev-arrow" aria-hidden="true">→</span>';
  html += '<span class="rev-result" data-role="revResult">—</span>';
  html += '<span class="rev-result-unit">' + tr('kgPerHour') + '</span>';
  html += '</div>';
  card.innerHTML = html;

  card.querySelector('[data-role="revMl"]').addEventListener('input', function(e) {
    var ml = Number(e.target.value) || 0;
    var kgh = Calc.kgPerHourFromMlPerMin(ml, prep.norm);
    card.querySelector('[data-role="revResult"]').textContent = kgh !== null ? fmtNum(kgh, 0) : '—';
  });

  card.querySelector('[data-action="toggle"]').addEventListener('click', function() {
    prep.active = !prep.active;
    saveState();
    renderPreparations();
    refreshPrepNumbers();
  });
  card.querySelector('[data-action="edit"]').addEventListener('click', function() {
    state.editingPrepId = prep.id;
    renderPreparations();
  });
  var delBtn = card.querySelector('[data-action="delete"]');
  delBtn.addEventListener('click', function() {
    if (prepInCurrentSession(prep.id)) { showToast(tr('prepInUse')); return; }
    if (!confirmTap(delBtn)) return;
    state.preparations = state.preparations.filter(function(p) { return p.id !== prep.id; });
    if (state.session && !state.session.startedAt) {
      state.session.activePrepIds = state.session.activePrepIds.filter(function(x) { return !sameId(x, prep.id); });
    }
    saveState();
    renderPreparations();
  });
}

function addPreparation() {
  var newId = Date.now();
  state.preparations.push({ id: newId, name: '', norm: 250, canVolume: 5, active: true });
  state.editingPrepId = newId;
  renderPreparations();
}

// ── Сесія: дані ─────────────────────────────────────────────────────────────

function nextSessionNumber() {
  var max = 0;
  allSessions().forEach(function(s) { if (s.number > max) max = s.number; });
  return max + 1;
}

function createDraftSession() {
  state.session = {
    id: uid(),
    number: nextSessionNumber(),
    variety: '',
    containerTypes: [],
    activePrepIds: state.preparations.filter(function(p) { return p.active && p.name; }).map(function(p) { return p.id; }),
    canVolumes: {},
    prepSnapshots: {},
    startedAt: null,
    endedAt: null,
    paused: false,
    pauseStartedAt: null,
    totalPausedMs: 0,
    events: []
  };
  saveState();
}

function startSession() {
  var s = state.session;
  if (!s || s.startedAt) return;
  if (!s.containerTypes || s.containerTypes.length === 0) {
    showToast(tr('needContainer'));
    var addBtn = document.querySelector('#sessionView [data-action="add-ctype"]');
    if (addBtn) { addBtn.classList.add('attention'); addBtn.focus(); }
    return;
  }
  s.canVolumes = {};
  s.prepSnapshots = {};
  s.activePrepIds = s.activePrepIds.filter(function(pid) { return !!findPrep(pid); });
  s.activePrepIds.forEach(function(pid) {
    var p = findPrep(pid);
    s.canVolumes[pid] = p.canVolume || 5;
    snapshotPrep(s, pid);
  });
  var v = (s.variety || '').trim();
  s.variety = v;
  if (v && state.varieties.indexOf(v) === -1) {
    state.varieties.unshift(v);
    if (state.varieties.length > MAX_VARIETIES) state.varieties.length = MAX_VARIETIES;
  }
  s.startedAt = Date.now();
  state.ui.logOpen = false;
  state.ui.addPrepOpen = false;
  saveState();
  startSessionTicker();
  renderSessionView();
}

function pauseSession() {
  var s = state.session;
  if (!s || !s.startedAt || s.paused || s.endedAt) return;
  s.paused = true;
  s.pauseStartedAt = Date.now();
  saveState();
  renderSessionView();
}

function resumeSession() {
  var s = state.session;
  if (!s || !s.paused) return;
  s.totalPausedMs += Date.now() - s.pauseStartedAt;
  s.paused = false;
  s.pauseStartedAt = null;
  saveState();
  renderSessionView();
}

function endSession() {
  var s = state.session;
  if (!s || !s.startedAt || s.endedAt) return;
  if (s.paused) {
    s.totalPausedMs += Date.now() - s.pauseStartedAt;
    s.paused = false;
    s.pauseStartedAt = null;
  }
  s.endedAt = Date.now();
  stopSessionTicker();
  saveState();
  renderSessionView();
}

// Щойно завершену сесію — в архів, на головний екран.
function archiveSession() {
  var s = state.session;
  if (!s || !s.endedAt) return;
  if (!state.sessions.some(function(x) { return x.id === s.id; })) state.sessions.push(s);
  state.session = null;
  state.view = 'main';
  saveState();
  renderViews();
}

function discardDraftSession() {
  if (!state.session || state.session.startedAt) return;
  state.session = null;
  state.view = 'main';
  saveState();
  renderViews();
}

function deleteCurrentSession() {
  state.session = null;
  state.view = 'main';
  stopSessionTicker();
  saveState();
  renderViews();
}

function sessionElapsedMs(sess) {
  return Calc.sessionElapsedMs(sess || state.session, Date.now());
}

function addContainerType(weight, kind, size) {
  var s = state.session;
  if (!s) return;
  s.containerTypes.push({ id: uid(), weight: weight, kind: kind || 'ящик', size: size || '' });
  saveState();
  renderSessionView();
}

function updateContainerType(typeId, patch) {
  var s = state.session;
  if (!s) return;
  var t = s.containerTypes.find(function(x) { return x.id === typeId; });
  if (!t) return;
  if (patch.weight != null) t.weight = patch.weight;
  if (patch.kind != null) t.kind = patch.kind;
  if (patch.size !== undefined) t.size = patch.size;
  saveState();
}

function pushEvent(ev) {
  ev.id = uid();
  ev.ts = ev.ts || Date.now();
  state.session.events.push(ev);
}

function applyContainerCorrection(typeId, deltaKg) {
  if (!state.session || !deltaKg) return;
  pushEvent({ type: 'container_corr', refId: typeId, deltaKg: deltaKg });
  saveState();
}

function applyCanisterCorrection(prepId, deltaL) {
  if (!state.session || !deltaL) return;
  pushEvent({ type: 'canister_corr', refId: prepId, deltaL: deltaL });
  saveState();
}

// Виставити лічильник у задане значення: додати або зняти події (найновіші першими).
function setEventCount(type, refId, newCount) {
  var s = state.session;
  if (!s) return;
  if (newCount < 0) newCount = 0;
  var current = s.events.filter(function(e) { return e.type === type && sameId(e.refId, refId); }).length;
  if (newCount === current) return;
  if (newCount > current) {
    for (var i = 0; i < newCount - current; i++) {
      pushEvent({ type: type, refId: refId, ts: Date.now() + i });
    }
  } else {
    var toRemove = current - newCount;
    for (var idx = s.events.length - 1; idx >= 0 && toRemove > 0; idx--) {
      var e = s.events[idx];
      if (e.type === type && sameId(e.refId, refId)) {
        s.events.splice(idx, 1);
        toRemove--;
      }
    }
  }
  saveState();
}

function removeContainerType(typeId) {
  var s = state.session;
  if (!s) return;
  s.containerTypes = s.containerTypes.filter(function(t) { return t.id !== typeId; });
  // разом із подіями типу — і його корекціями, щоб не лишались «сироти»
  s.events = s.events.filter(function(e) {
    return !((e.type === 'container' || e.type === 'container_corr') && e.refId === typeId);
  });
  saveState();
  renderSessionView();
}

function removePrepFromSession(prepId) {
  var s = state.session;
  if (!s) return;
  s.activePrepIds = s.activePrepIds.filter(function(p) { return !sameId(p, prepId); });
  s.events = s.events.filter(function(e) {
    return !((e.type === 'canister' || e.type === 'canister_corr') && sameId(e.refId, prepId));
  });
  delete s.canVolumes[prepId];
  delete s.canVolumes[String(prepId)];
  saveState();
  renderSessionView();
}

function addPrepToSession(prepId) {
  var s = state.session;
  var p = findPrep(prepId);
  if (!s || !p) return;
  if (s.activePrepIds.some(function(x) { return sameId(x, p.id); })) return;
  s.activePrepIds.push(p.id);
  s.canVolumes[p.id] = p.canVolume || 5;
  snapshotPrep(s, p.id);
  state.ui.addPrepOpen = false;
  saveState();
  renderSessionView();
}

function sessionAcceptsEvents() {
  var s = state.session;
  return !!(s && s.startedAt && !s.endedAt && !s.paused);
}

function addContainerEvent(typeId) {
  if (!sessionAcceptsEvents()) return;
  pushEvent({ type: 'container', refId: typeId });
  vibrate(30);
  saveState();
  refreshSessionNumbers();
}

function addCanisterEvent(prepId) {
  if (!sessionAcceptsEvents()) return;
  var p = findPrep(prepId);
  pushEvent({ type: 'canister', refId: p ? p.id : prepId });
  vibrate([30, 30, 30]);
  saveState();
  refreshSessionNumbers();
}

// «−1»: зняти останню подію цього типу.
function undoLastEvent(type, refId) {
  if (!sessionAcceptsEvents()) return;
  var s = state.session;
  for (var idx = s.events.length - 1; idx >= 0; idx--) {
    var e = s.events[idx];
    if (e.type === type && sameId(e.refId, refId)) {
      s.events.splice(idx, 1);
      vibrate(20);
      saveState();
      refreshSessionNumbers();
      return;
    }
  }
}

function removeEvent(eventId) {
  var s = state.session;
  if (!s) return;
  s.events = s.events.filter(function(e) { return e.id !== eventId; });
  saveState();
  refreshSessionNumbers();
}

function startSessionTicker() {
  stopSessionTicker();
  sessionTicker = setInterval(function() {
    var s = state.session;
    if (!s || !s.startedAt || s.endedAt) { stopSessionTicker(); return; }
    if (s.paused) return;
    if (state.view === 'session' && !state.viewingSessionId) {
      var el = $('sessionTimer');
      if (el) el.textContent = fmtTime(sessionElapsedMs());
    } else if (state.view === 'main') {
      renderSessionEntry();
    }
  }, 1000);
}

function stopSessionTicker() {
  if (sessionTicker) clearInterval(sessionTicker);
  sessionTicker = null;
}

// ── Маршрутизація екранів ───────────────────────────────────────────────────

function renderViews() {
  var mainEl = $('mainView');
  var sessionEl = $('sessionView');
  var historyEl = $('historyView');
  mainEl.classList.toggle('hidden', state.view !== 'main');
  sessionEl.classList.toggle('hidden', state.view !== 'session');
  historyEl.classList.toggle('hidden', state.view !== 'history');
  if (state.view === 'session') renderSessionView();
  else if (state.view === 'history') renderHistoryView();
  else renderSessionEntry();
  window.scrollTo(0, 0);
}

function renderSessionEntry() {
  var btn = $('sessionEntry');
  var s = state.session;
  if (s && s.startedAt && !s.endedAt) {
    var pausedTag = s.paused ? ' · ' + tr('paused') : '';
    btn.className = 'session-entry active';
    btn.innerHTML = '<div class="se-status">↻ ' + tr('sessionNumber') + s.number + ' · ' + fmtTime(sessionElapsedMs()) + pausedTag + '</div>'
      + '<div class="se-meta">' + escapeHtml(s.variety || '—') + ' · ' + fmtNum(Calc.sessionTotalKg(s)) + ' ' + tr('kg') + '</div>';
  } else if (s && s.endedAt) {
    btn.className = 'session-entry active';
    btn.innerHTML = '<div class="se-status">' + tr('sessionNumber') + s.number + ' · ' + tr('sessionCompleted').toLowerCase() + '</div>';
  } else if (s) {
    btn.className = 'session-entry';
    btn.innerHTML = '<div class="se-status">' + tr('sessionNumber') + s.number + ' · ' + tr('draft') + '</div>';
  } else {
    btn.className = 'session-entry';
    btn.innerHTML = '<div class="se-status">+ ' + tr('newSession') + '</div>';
  }
}

function enterSessionView() {
  if (!state.session) createDraftSession();
  state.viewingSessionId = null;
  state.view = 'session';
  renderViews();
  if (state.session.startedAt && !state.session.endedAt) startSessionTicker();
}

function exitSessionView() {
  state.viewingSessionId = null;
  state.view = 'main';
  renderViews();
}

function viewedSession() {
  if (state.viewingSessionId) {
    return state.sessions.find(function(x) { return x.id === state.viewingSessionId; }) || null;
  }
  return state.session;
}

// ── Сесія: рендер ───────────────────────────────────────────────────────────

function renderSessionView() {
  var root = $('sessionView');
  var s = viewedSession();
  if (!s) { root.innerHTML = ''; return; }
  if (state.viewingSessionId) renderSessionCompleted(root, s, true);
  else if (s.endedAt) renderSessionCompleted(root, s, false);
  else if (s.startedAt) renderSessionActive(root, s);
  else renderSessionPreStart(root, s);
}

function ctypeLabel(t) {
  return t.kind + ' ' + fmtNum(t.weight) + ' ' + tr('kg') + (t.size ? ' · ' + t.size : '');
}

function sessionHeader(leftHtml, title) {
  return '<div class="session-header">' + leftHtml
    + '<h1 class="session-title">' + escapeHtml(title) + '</h1><span class="session-header-spacer"></span></div>';
}

function renderSessionPreStart(root, s) {
  var html = '';
  html += sessionHeader('<button class="session-back" data-action="discard">' + tr('backBtn') + '</button>', tr('sessionNumber') + s.number);

  html += '<div class="session-form">';
  html += '<label class="form-label" for="sessVariety">' + tr('variety') + '</label>';
  html += '<input class="form-input" id="sessVariety" value="' + escapeHtml(s.variety) + '" placeholder="' + escapeHtml(tr('varietyPlaceholder')) + '" autocomplete="off">';
  if (state.varieties.length > 0) {
    html += '<div class="variety-suggestions">';
    state.varieties.slice(0, 6).forEach(function(v) {
      html += '<button class="variety-chip" data-action="variety" data-value="' + escapeHtml(v) + '">' + escapeHtml(v) + '</button>';
    });
    html += '</div>';
  }
  html += '</div>';

  html += '<div class="session-form">';
  html += '<div class="form-label">' + tr('containers') + '</div>';
  s.containerTypes.forEach(function(t) {
    html += '<div class="ctype-row">';
    html += '<div class="ctype-info"><div class="ctype-name">' + escapeHtml(ctypeLabel(t)) + '</div></div>';
    html += '<button class="icon-btn ctype-menu-btn" data-action="edit-ctype" data-id="' + t.id + '" aria-label="' + escapeHtml(tr('edit') + ' ' + ctypeLabel(t)) + '">⋮</button>';
    html += '</div>';
  });
  html += '<button class="add-stream-btn" data-action="add-ctype">' + tr('addContainerType') + '</button>';
  html += '</div>';

  html += '<div class="session-form">';
  html += '<div class="form-label">' + tr('selectPrepsForSession') + '</div>';
  html += '<div class="prep-select-list">';
  state.preparations.forEach(function(p) {
    if (!p.name) return;
    var sel = s.activePrepIds.some(function(x) { return sameId(x, p.id); });
    html += '<button class="prep-select-row ' + (sel ? 'selected' : '') + '" role="checkbox" aria-checked="' + (sel ? 'true' : 'false') + '" data-action="toggle-prep" data-id="' + p.id + '">';
    html += '<span class="pscb" aria-hidden="true"></span>';
    html += '<span class="prep-select-name">' + escapeHtml(p.name) + '</span>';
    html += '<span class="prep-select-meta">' + fmtNum(p.norm) + ' ' + tr('mlPerTon') + ' · ' + (p.canVolume || 5) + ' ' + tr('liter') + '</span>';
    html += '</button>';
  });
  html += '</div>';
  html += '</div>';

  html += '<button class="session-major-btn" data-action="start">' + tr('startSessionBtn') + '</button>';
  root.innerHTML = html;

  root.querySelector('#sessVariety').addEventListener('input', function(e) {
    if (state.session) state.session.variety = e.target.value;
    saveState();
  });
}

function ctypeMetaText(s, t) {
  var cnt = Calc.containerCount(s, t.id);
  var corr = Calc.containerCorrectionKg(s, t.id);
  var text = cnt + ' ' + tr('pcs') + ' · ' + fmtNum(Calc.typeTotalKg(s, t)) + ' ' + tr('kg');
  if (corr) text += ' (' + tr('correction').toLowerCase() + ' ' + fmtSigned(corr) + ')';
  return text;
}

function prepActualText(s, pid, prep) {
  var canCount = Calc.canisterCount(s, pid);
  var corr = Calc.canisterCorrectionL(s, pid);
  if (canCount === 0 && !corr) return { text: tr('fact') + ': —', dimmed: true };
  var liters = Calc.prepLiters(s, pid, prep.canVolume);
  var actual = Calc.actualMlPerTon(liters, Calc.sessionTotalKg(s));
  if (actual === null) return { text: tr('fact') + ': —', dimmed: true };
  var dev = Calc.deviationPct(actual, prep.norm);
  var devStr = dev !== null ? ' (' + fmtSigned(dev, 1) + '%)' : '';
  return { text: tr('fact') + ': ' + fmtNum(actual, 1) + ' ' + tr('mlPerTon') + devStr, dimmed: false };
}

function renderSessionActive(root, s) {
  var html = '';
  html += sessionHeader('<button class="session-back" data-action="back">' + tr('backBtn') + '</button>', tr('sessionNumber') + s.number);
  html += '<div class="session-subtitle">' + escapeHtml(s.variety || '—') + '</div>';

  html += '<div class="session-timer-block ' + (s.paused ? 'paused' : '') + '">';
  html += '<div class="session-timer ' + (s.paused ? 'paused-text' : '') + '" id="sessionTimer">' + fmtTime(sessionElapsedMs(s)) + '</div>';
  if (s.paused) html += '<div class="session-paused-label">' + tr('paused') + '</div>';
  html += '<div class="session-tonnage">' + tr('totalTonnage') + ': <strong id="sessionTonnage">' + fmtNum(Calc.sessionTotalKg(s)) + '</strong> ' + tr('kg') + '</div>';
  html += '<button class="session-pause-btn" data-action="' + (s.paused ? 'resume' : 'pause') + '">' + (s.paused ? '▶ ' + tr('resumeBtn') : '⏸ ' + tr('pauseBtn')) + '</button>';
  html += '</div>';

  html += '<h2>' + tr('containers') + '</h2>';
  s.containerTypes.forEach(function(t) {
    var cnt = Calc.containerCount(s, t.id);
    html += '<div class="ctype-card" data-ctype-id="' + t.id + '">';
    html += '<div class="ctype-card-head">';
    html += '<div class="ctype-info">';
    if (t.size) html += '<div class="ctype-size">' + escapeHtml(t.size) + '</div>';
    html += '<div class="ctype-name">' + escapeHtml(t.kind) + ' ' + fmtNum(t.weight) + ' ' + tr('kg') + '</div>';
    html += '</div>';
    html += '<button class="icon-btn ctype-menu-btn" data-action="edit-ctype" data-id="' + t.id + '" aria-label="' + escapeHtml(tr('edit') + ' ' + ctypeLabel(t)) + '">⋮</button>';
    html += '</div>';
    html += '<div class="ctype-card-row">';
    html += '<div class="ctype-meta">' + ctypeMetaText(s, t) + '</div>';
    html += '<div class="count-actions">';
    html += '<button class="count-undo-btn" data-action="undo-container" data-id="' + t.id + '" ' + (s.paused || cnt === 0 ? 'disabled' : '') + ' aria-label="' + escapeHtml(tr('minusOne') + ' ' + ctypeLabel(t)) + '">' + tr('minusOne') + '</button>';
    html += '<div class="ctype-count" aria-live="polite">' + cnt + '</div>';
    html += '<button class="ctype-add-btn" data-action="add-container" data-id="' + t.id + '" ' + (s.paused ? 'disabled' : '') + ' aria-label="' + escapeHtml(tr('plusOne') + ' ' + ctypeLabel(t)) + '">' + tr('plusOne') + '</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });
  html += '<button class="add-stream-btn" data-action="add-ctype" style="margin-bottom:18px;">' + tr('addContainerType') + '</button>';

  html += '<h2>' + tr('preparations') + '</h2>';
  s.activePrepIds.forEach(function(pid) {
    var p = sessionPrep(s, pid);
    if (!p) return;
    var canVol = Calc.sessionCanVolume(s, pid, p.canVolume);
    var liters = Calc.prepLiters(s, pid, p.canVolume);
    var canCount = Calc.canisterCount(s, pid);
    var actual = prepActualText(s, pid, p);
    html += '<div class="session-prep-card" data-prep-card-id="' + pid + '">';
    html += '<div class="session-prep-head">';
    html += '<div class="session-prep-name">' + escapeHtml(p.name) + '</div>';
    html += '<div class="session-prep-head-right">';
    html += '<div class="session-prep-volume">' + fmtLiters(liters) + ' ' + tr('liter') + '</div>';
    html += '<button class="icon-btn ctype-menu-btn" data-action="edit-prep" data-id="' + pid + '" aria-label="' + escapeHtml(tr('edit') + ' ' + p.name) + '">⋮</button>';
    html += '</div>';
    html += '</div>';
    html += '<div class="session-prep-actual ' + (actual.dimmed ? 'dimmed' : '') + '">' + actual.text + '</div>';
    html += '<div class="session-prep-row">';
    html += '<div class="session-prep-meta">' + canCount + ' × ' + canVol + ' ' + tr('liter') + '</div>';
    html += '<div class="count-actions">';
    html += '<button class="count-undo-btn" data-action="undo-canister" data-id="' + pid + '" ' + (s.paused || canCount === 0 ? 'disabled' : '') + ' aria-label="' + escapeHtml(tr('minusOne') + ' ' + p.name) + '">' + tr('minusOne') + '</button>';
    html += '<button class="ctype-add-btn" data-action="add-canister" data-id="' + pid + '" ' + (s.paused ? 'disabled' : '') + ' aria-label="' + escapeHtml(tr('plusOne') + ' ' + p.name) + '">' + tr('plusOne') + '</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });

  var inactivePreps = state.preparations.filter(function(p) {
    return p.name && !s.activePrepIds.some(function(x) { return sameId(x, p.id); });
  });
  if (inactivePreps.length > 0) {
    html += '<button class="add-stream-btn" data-action="show-add-prep" aria-expanded="' + (state.ui.addPrepOpen ? 'true' : 'false') + '" style="margin-bottom:18px;">' + tr('addPrep') + '</button>';
    html += '<div id="inSessionAddPrep" class="' + (state.ui.addPrepOpen ? '' : 'hidden') + '" style="margin-bottom:18px;">';
    html += '<div class="add-ctype-form"><div class="prep-select-list">';
    inactivePreps.forEach(function(p) {
      html += '<button class="prep-select-row" data-action="add-prep" data-id="' + p.id + '">';
      html += '<span class="pscb" aria-hidden="true"></span>';
      html += '<span class="prep-select-name">' + escapeHtml(p.name) + '</span>';
      html += '<span class="prep-select-meta">' + fmtNum(p.norm) + ' ' + tr('mlPerTon') + ' · ' + (p.canVolume || 5) + ' ' + tr('liter') + '</span>';
      html += '</button>';
    });
    html += '</div></div></div>';
  }

  html += '<div class="session-log">';
  html += '<button class="log-toggle" data-action="toggle-log" aria-expanded="' + (state.ui.logOpen ? 'true' : 'false') + '"><span>' + tr('log') + ' (<span id="logCount">' + s.events.length + '</span>)</span><span id="logChevron" aria-hidden="true">' + (state.ui.logOpen ? '⌃' : '⌄') + '</span></button>';
  html += '<div id="logList" class="' + (state.ui.logOpen ? 'log-list' : 'hidden') + '"></div>';
  html += '</div>';

  html += '<div class="session-controls">';
  html += '<button class="session-major-btn danger confirm-btn" data-action="end" data-confirm="1">' + tr('endSessionBtn') + '</button>';
  html += '<button class="session-delete-btn confirm-btn" data-action="delete-session" data-confirm="1">' + tr('deleteSession') + '</button>';
  html += '</div>';

  root.innerHTML = html;
  if (state.ui.logOpen) renderLogList(root.querySelector('#logList'), s);
}

// Оновити лише цифри активної сесії — без перебудови DOM (журнал і форми не згортаються).
function refreshSessionNumbers() {
  var s = state.session;
  if (!s || !s.startedAt || s.endedAt || state.view !== 'session' || state.viewingSessionId) return;
  var root = $('sessionView');
  var tEl = $('sessionTonnage');
  if (tEl) tEl.textContent = fmtNum(Calc.sessionTotalKg(s));

  s.containerTypes.forEach(function(t) {
    var card = root.querySelector('[data-ctype-id="' + t.id + '"]');
    if (!card) return;
    var cnt = Calc.containerCount(s, t.id);
    card.querySelector('.ctype-count').textContent = cnt;
    card.querySelector('.ctype-meta').textContent = ctypeMetaText(s, t);
    card.querySelector('[data-action="undo-container"]').disabled = s.paused || cnt === 0;
  });

  s.activePrepIds.forEach(function(pid) {
    var card = root.querySelector('[data-prep-card-id="' + pid + '"]');
    var p = sessionPrep(s, pid);
    if (!card || !p) return;
    var canCount = Calc.canisterCount(s, pid);
    var actual = prepActualText(s, pid, p);
    card.querySelector('.session-prep-volume').textContent = fmtLiters(Calc.prepLiters(s, pid, p.canVolume)) + ' ' + tr('liter');
    var actEl = card.querySelector('.session-prep-actual');
    actEl.textContent = actual.text;
    actEl.classList.toggle('dimmed', actual.dimmed);
    card.querySelector('.session-prep-meta').textContent = canCount + ' × ' + Calc.sessionCanVolume(s, pid, p.canVolume) + ' ' + tr('liter');
    card.querySelector('[data-action="undo-canister"]').disabled = s.paused || canCount === 0;
  });

  var lc = $('logCount');
  if (lc) lc.textContent = s.events.length;
  if (state.ui.logOpen) renderLogList(root.querySelector('#logList'), s);
}

function eventDescription(s, e) {
  if (e.type === 'container') {
    var t = s.containerTypes.find(function(x) { return x.id === e.refId; });
    return t ? '+1 ' + ctypeLabel(t) : '+1 ?';
  }
  if (e.type === 'container_corr') {
    var ct = s.containerTypes.find(function(x) { return x.id === e.refId; });
    var dKg = Number(e.deltaKg) || 0;
    return fmtSigned(dKg) + ' ' + tr('kg') + ' ' + (ct ? ctypeLabel(ct) : '?') + ' (' + tr('correction').toLowerCase() + ')';
  }
  if (e.type === 'canister') {
    var p = sessionPrep(s, e.refId);
    return '+' + Calc.sessionCanVolume(s, e.refId, p ? p.canVolume : 5) + ' ' + tr('liter') + ' ' + (p ? p.name : '?');
  }
  if (e.type === 'canister_corr') {
    var pp = sessionPrep(s, e.refId);
    var dL = Number(e.deltaL) || 0;
    return (dL > 0 ? '+' : '') + fmtLiters(dL) + ' ' + tr('liter') + ' ' + (pp ? pp.name : '?') + ' (' + tr('correction').toLowerCase() + ')';
  }
  return '?';
}

function renderLogList(container, s) {
  if (!container) return;
  if (!s.events.length) {
    container.innerHTML = '<div class="log-empty">—</div>';
    return;
  }
  // найновіші згори; при однаковому часі — пізніше додані
  var sorted = s.events.map(function(e, i) { return { e: e, i: i }; })
    .sort(function(a, b) { return (b.e.ts - a.e.ts) || (b.i - a.i); })
    .map(function(x) { return x.e; });
  var html = '';
  sorted.forEach(function(e) {
    html += '<div class="log-item">';
    html += '<div class="log-time">' + fmtClock(e.ts) + '</div>';
    html += '<div class="log-desc">' + escapeHtml(eventDescription(s, e)) + '</div>';
    html += '<button class="icon-btn log-remove" data-action="remove-event" data-id="' + e.id + '" aria-label="' + escapeHtml(tr('ariaRemoveEvent')) + '">✕</button>';
    html += '</div>';
  });
  container.innerHTML = html;
}

function sessionSummary(s) {
  var totalMs = Calc.sessionElapsedMs(s, Date.now());
  var totalKg = Calc.sessionTotalKg(s);
  return {
    totalMs: totalMs,
    totalKg: totalKg,
    containers: Calc.sessionContainers(s),
    avgSpeed: Calc.avgSpeedKgPerMin(totalKg, totalMs),
    types: s.containerTypes.map(function(t) {
      return { type: t, count: Calc.containerCount(s, t.id), corr: Calc.containerCorrectionKg(s, t.id), total: Calc.typeTotalKg(s, t) };
    }),
    preps: s.activePrepIds.map(function(pid) {
      var p = sessionPrep(s, pid);
      if (!p) return null;
      var liters = Calc.prepLiters(s, pid, p.canVolume);
      var actual = Calc.actualMlPerTon(liters, totalKg);
      return { prep: p, liters: liters, actual: actual, dev: Calc.deviationPct(actual, p.norm) };
    }).filter(Boolean)
  };
}

function typeFormula(row) {
  var f = row.count + ' × ' + fmtNum(row.type.weight);
  if (row.corr) f += ' ' + (row.corr > 0 ? '+' : '−') + ' ' + fmtNum(Math.abs(row.corr));
  return f + ' = ' + fmtNum(row.total) + ' ' + tr('kg');
}

function renderSessionCompleted(root, s, viewing) {
  var sum = sessionSummary(s);
  var html = '';
  var left = viewing ? '<button class="session-back" data-action="back-history">' + tr('backBtn') + '</button>' : '<span class="session-header-spacer"></span>';
  html += sessionHeader(left, viewing ? tr('sessionNumber') + s.number : tr('sessionCompleted'));

  html += '<div class="summary-card">';
  html += '<div class="summary-title">' + tr('sessionNumber') + s.number + '</div>';
  html += '<div class="summary-subtitle">' + escapeHtml(s.variety || '—') + ' · ' + fmtDate(s.startedAt) + '</div>';
  html += summaryRow(tr('duration'), fmtTime(sum.totalMs));
  html += summaryRow(tr('containersCount'), sum.containers + ' ' + tr('pcs'));
  html += summaryRow(tr('totalTonnage'), fmtNum(sum.totalKg) + ' ' + tr('kg'), 'highlight');
  html += summaryRow(tr('avgSpeed'), sum.avgSpeed > 0 ? fmtNum(sum.avgSpeed, 0) + ' ' + tr('kgPerMin') : '—');

  if (sum.types.length > 0) {
    html += '<div class="summary-section"><div class="summary-section-label">' + tr('containers') + '</div>';
    sum.types.forEach(function(row) {
      html += summaryRow(escapeHtml(ctypeLabel(row.type)), typeFormula(row));
    });
    html += '</div>';
  }

  if (sum.preps.length > 0) {
    html += '<div class="summary-section"><div class="summary-section-label">' + tr('preparations') + '</div>';
    sum.preps.forEach(function(row) {
      html += summaryRow(escapeHtml(row.prep.name), fmtLiters(row.liters) + ' ' + tr('liter'));
      if (row.actual !== null) {
        var devStr = row.dev !== null ? ' (' + fmtSigned(row.dev, 1) + '%)' : '';
        html += '<div class="summary-row summary-row-sub"><div class="summary-key">' + tr('fact') + '</div>';
        html += '<div class="summary-val summary-val-fact">' + fmtNum(row.actual, 1) + ' ' + tr('mlPerTon') + devStr + '</div></div>';
      }
    });
    html += '</div>';
  }
  html += '</div>';

  html += '<div class="summary-actions">';
  html += '<button class="btn btn-secondary" data-action="share">↗ ' + tr('share') + '</button>';
  if (!viewing) html += '<button class="session-major-btn" data-action="archive" style="margin-top:0;">' + tr('closeBtn') + '</button>';
  html += '</div>';
  root.innerHTML = html;
}

function summaryRow(key, val, cls) {
  return '<div class="summary-row"><div class="summary-key">' + key + '</div><div class="summary-val ' + (cls || '') + '">' + val + '</div></div>';
}

function summaryText(s) {
  var sum = sessionSummary(s);
  var lines = [];
  lines.push(tr('title') + ' — ' + tr('sessionNumber') + s.number + ' · ' + (s.variety || '—') + ' · ' + fmtDate(s.startedAt));
  lines.push(tr('duration') + ': ' + fmtTime(sum.totalMs));
  lines.push(tr('containersCount') + ': ' + sum.containers + ' ' + tr('pcs') + ' · ' + tr('totalTonnage').toLowerCase() + ': ' + fmtNum(sum.totalKg) + ' ' + tr('kg'));
  lines.push(tr('avgSpeed') + ': ' + (sum.avgSpeed > 0 ? fmtNum(sum.avgSpeed, 0) + ' ' + tr('kgPerMin') : '—'));
  if (sum.types.length) {
    lines.push(tr('containers') + ':');
    sum.types.forEach(function(row) { lines.push(' • ' + ctypeLabel(row.type) + ': ' + typeFormula(row)); });
  }
  if (sum.preps.length) {
    lines.push(tr('preparations') + ':');
    sum.preps.forEach(function(row) {
      var line = ' • ' + row.prep.name + ': ' + fmtLiters(row.liters) + ' ' + tr('liter');
      if (row.actual !== null) {
        line += ' · ' + tr('fact') + ' ' + fmtNum(row.actual, 1) + ' ' + tr('mlPerTon');
        if (row.dev !== null) line += ' (' + fmtSigned(row.dev, 1) + '%)';
      }
      line += ' · ' + tr('norm').toLowerCase() + ' ' + fmtNum(row.prep.norm) + ' ' + tr('mlPerTon');
      lines.push(line);
    });
  }
  return lines.join('\n');
}

function shareSession(s) {
  var text = summaryText(s);
  var title = tr('title') + ' — ' + tr('sessionNumber') + s.number;
  if (navigator.share) {
    navigator.share({ title: title, text: text }).catch(function() {});
    return;
  }
  copyText(text);
}

function copyText(text) {
  var done = function() { showToast(tr('copied')); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function() { copyFallback(text); done(); });
  } else {
    copyFallback(text);
    done();
  }
}

function copyFallback(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
}

// Один делегований обробник на весь екран сесії.
function onSessionViewClick(e) {
  var btn = e.target.closest('[data-action]');
  if (!btn || btn.disabled) return;
  var action = btn.getAttribute('data-action');
  var id = btn.getAttribute('data-id');
  var s = state.session;

  if (btn.hasAttribute('data-confirm') && !confirmTap(btn)) return;

  switch (action) {
    // перегляд з історії / завершена
    case 'back-history': state.viewingSessionId = null; state.view = 'history'; renderViews(); return;
    case 'share': { var v = viewedSession(); if (v) shareSession(v); return; }
    case 'archive': archiveSession(); return;
  }
  if (!s || state.viewingSessionId) return;

  if (!s.startedAt) {
    switch (action) {
      case 'discard': discardDraftSession(); return;
      case 'variety': {
        s.variety = btn.getAttribute('data-value');
        var vi = $('sessVariety');
        if (vi) vi.value = s.variety;
        saveState();
        return;
      }
      case 'edit-ctype': openContainerModal(id); return;
      case 'add-ctype': openContainerModal(null); return;
      case 'toggle-prep': {
        var p = findPrep(id);
        if (!p) return;
        var idx = -1;
        s.activePrepIds.forEach(function(x, i) { if (sameId(x, p.id)) idx = i; });
        if (idx === -1) s.activePrepIds.push(p.id); else s.activePrepIds.splice(idx, 1);
        saveState();
        renderSessionView();
        return;
      }
      case 'start': startSession(); return;
    }
    return;
  }

  if (s.endedAt) return;

  switch (action) {
    case 'back': exitSessionView(); return;
    case 'pause': pauseSession(); return;
    case 'resume': resumeSession(); return;
    case 'add-container': addContainerEvent(id); return;
    case 'undo-container': undoLastEvent('container', id); return;
    case 'add-canister': addCanisterEvent(id); return;
    case 'undo-canister': undoLastEvent('canister', id); return;
    case 'edit-ctype': openContainerModal(id); return;
    case 'edit-prep': openPrepModal(id); return;
    case 'add-ctype': openContainerModal(null); return;
    case 'show-add-prep': {
      state.ui.addPrepOpen = !state.ui.addPrepOpen;
      var box = $('inSessionAddPrep');
      if (box) box.classList.toggle('hidden', !state.ui.addPrepOpen);
      btn.setAttribute('aria-expanded', state.ui.addPrepOpen ? 'true' : 'false');
      return;
    }
    case 'add-prep': addPrepToSession(id); return;
    case 'toggle-log': {
      state.ui.logOpen = !state.ui.logOpen;
      var list = $('logList');
      var chev = $('logChevron');
      if (state.ui.logOpen) {
        renderLogList(list, s);
        list.className = 'log-list';
        if (chev) chev.textContent = '⌃';
      } else {
        list.className = 'hidden';
        if (chev) chev.textContent = '⌄';
      }
      btn.setAttribute('aria-expanded', state.ui.logOpen ? 'true' : 'false');
      return;
    }
    case 'remove-event': removeEvent(id); return;
    case 'end': endSession(); return;
    case 'delete-session': deleteCurrentSession(); return;
  }
}

// ── Модальні вікна ──────────────────────────────────────────────────────────

function closeModal() {
  closePrompt();
  var existing = $('modalRoot');
  if (existing) existing.parentNode.removeChild(existing);
  state.modal = null;
}

function closePrompt() {
  var existing = $('promptRoot');
  if (existing) existing.parentNode.removeChild(existing);
  state.prompt = null;
}

function makeBackdrop(id, onBackdropClick) {
  var backdrop = document.createElement('div');
  backdrop.id = id;
  backdrop.className = 'modal-backdrop';
  backdrop.addEventListener('click', function(e) { if (e.target === backdrop) onBackdropClick(); });
  return backdrop;
}

function renderModal() {
  var existing = $('modalRoot');
  if (existing) existing.parentNode.removeChild(existing);
  if (!state.modal) return;
  var backdrop = makeBackdrop('modalRoot', closeModal);
  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  if (state.modal.kind === 'container') renderContainerModal(modal);
  else if (state.modal.kind === 'prep') renderPrepModal(modal);
  else if (state.modal.kind === 'confirm') renderConfirmModal(modal);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
}

function modalHeader(title) {
  return '<div class="modal-header"><div class="modal-title">' + escapeHtml(title) + '</div>'
    + '<button class="icon-btn modal-close" data-action="close" aria-label="' + escapeHtml(tr('cancelBtn')) + '">✕</button></div>';
}

// Текстовий запит поверх поточної модалки (не закриває її).
function openTextPrompt(title, hint, onSubmit) {
  closePrompt();
  state.prompt = { title: title, hint: hint, onSubmit: onSubmit };
  var backdrop = makeBackdrop('promptRoot', closePrompt);
  backdrop.classList.add('modal-backdrop-top');
  var modal = document.createElement('div');
  modal.className = 'modal modal-small';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = modalHeader(title)
    + '<div class="modal-section"><input type="text" class="modal-input" data-role="textInput" placeholder="' + escapeHtml(hint || '') + '" autocomplete="off"></div>'
    + '<div class="modal-actions"><button class="btn btn-secondary" data-action="close">' + tr('cancelBtn') + '</button>'
    + '<button class="btn btn-primary" data-action="submit">' + tr('saveBtn') + '</button></div>';
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  var input = modal.querySelector('[data-role="textInput"]');
  setTimeout(function() { input.focus(); }, 50);
  function submit() {
    var v = input.value.trim();
    closePrompt();
    if (v) onSubmit(v);
  }
  modal.querySelectorAll('[data-action="close"]').forEach(function(el) { el.addEventListener('click', closePrompt); });
  modal.querySelector('[data-action="submit"]').addEventListener('click', submit);
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
}

function openContainerModal(typeId) {
  var s = state.session;
  if (!s) return;
  var t = null;
  if (typeId) {
    t = s.containerTypes.find(function(x) { return x.id === typeId; });
    if (!t) return;
  }
  state.modal = {
    kind: 'container',
    typeId: typeId,
    draft: {
      kind: t ? t.kind : (state.containerKinds[0] || 'ящик'),
      size: t ? (t.size || '') : '',
      weight: t ? t.weight : '',
      count: t ? Calc.containerCount(s, t.id) : 0,
      correction: t ? Calc.containerCorrectionKg(s, t.id) : 0
    }
  };
  renderModal();
}

function chipRowHtml(items, selected, dataKey, removable, addAction, addLabel) {
  var html = '<div class="chip-row">';
  items.forEach(function(v) {
    html += '<span class="chip-wrap"><button class="chip ' + (selected === v ? 'selected' : '') + '" ' + dataKey + '="' + escapeHtml(v) + '" aria-pressed="' + (selected === v ? 'true' : 'false') + '">' + escapeHtml(v) + '</button>';
    if (removable) html += '<button class="chip-remove" data-remove-' + removable + '="' + escapeHtml(v) + '" aria-label="' + escapeHtml(tr('ariaRemove') + ' ' + v) + '">×</button>';
    html += '</span>';
  });
  html += '<button class="chip chip-add" data-action="' + addAction + '" aria-label="' + escapeHtml(addLabel) + '">+</button>';
  html += '</div>';
  return html;
}

function counterHtml(value) {
  return '<div class="counter-row">'
    + '<button class="counter-btn" data-action="decCount" aria-label="−1">−</button>'
    + '<input type="number" inputmode="numeric" min="0" class="counter-value" data-role="count" value="' + value + '" aria-label="' + escapeHtml(tr('countUnits')) + '">'
    + '<button class="counter-btn" data-action="incCount" aria-label="+1">+</button>'
    + '</div>';
}

function renderContainerModal(modal) {
  var m = state.modal;
  var s = state.session;
  var isNew = !m.typeId;
  var t = isNew ? null : s.containerTypes.find(function(x) { return x.id === m.typeId; });
  var d = m.draft;

  var html = modalHeader(isNew ? tr('addContainerType') : tr('edit'));

  html += '<div class="modal-section"><div class="modal-label">' + tr('size') + '</div>';
  html += chipRowHtml(state.sizes, d.size, 'data-size', 'size', 'addSize', tr('addSizeTitle'));
  html += '</div>';

  html += '<div class="modal-section"><div class="modal-label">' + tr('kind') + '</div>';
  html += chipRowHtml(state.containerKinds, d.kind, 'data-kind', 'kind', 'addKind', tr('addKindTitle'));
  html += '</div>';

  html += '<div class="modal-section field"><label class="modal-label" for="ctWeight">' + tr('weight') + '</label>';
  html += '<div class="modal-row"><input id="ctWeight" type="number" inputmode="decimal" min="0" class="modal-input text-right" data-role="weight" value="' + (d.weight === '' ? '' : d.weight) + '" placeholder="' + tr('kg') + '">';
  html += '<span class="unit-tag">' + tr('kg') + '</span></div>';
  html += '<div class="chip-row" style="margin-top:8px;">';
  PRESETS.forEach(function(p) { html += '<button class="chip" data-weight-preset="' + p + '">' + p + '</button>'; });
  html += '</div></div>';

  if (!isNew) {
    html += '<div class="modal-section modal-section-sep"><div class="modal-label">' + tr('countUnits') + '</div>' + counterHtml(d.count) + '</div>';
    html += '<div class="modal-section field"><label class="modal-label" for="ctCorr">' + tr('correctionKg') + '</label>';
    html += '<div class="modal-row"><input id="ctCorr" type="number" inputmode="numeric" class="modal-input text-right" data-role="correction" value="' + (d.correction || '') + '" placeholder="±N">';
    html += '<span class="unit-tag">' + tr('kg') + '</span></div>';
    html += '<div class="modal-hint">' + tr('correctionHintKg') + '</div>';
    html += '<div class="summary-line" data-role="summary"></div>';
    html += '</div>';
  }

  html += '<div class="modal-actions">';
  html += '<button class="btn btn-secondary" data-action="close">' + tr('cancelBtn') + '</button>';
  html += '<button class="btn btn-primary" data-action="save">' + tr('saveBtn') + '</button>';
  html += '</div>';
  if (!isNew) {
    html += '<button class="modal-delete-btn confirm-btn" data-action="delete">✕ ' + tr('deleteType') + (d.count > 0 ? ' (' + d.count + ' ' + tr('pcs') + ')' : '') + '</button>';
  }
  modal.innerHTML = html;

  var weightInput = modal.querySelector('[data-role="weight"]');
  var countInput = modal.querySelector('[data-role="count"]');
  var corrInput = modal.querySelector('[data-role="correction"]');
  var summaryEl = modal.querySelector('[data-role="summary"]');

  function refreshSummary() {
    if (!summaryEl) return;
    var w = Number(d.weight) || 0;
    var total = d.count * w + (Number(d.correction) || 0);
    summaryEl.innerHTML = typeFormula({ count: d.count, corr: Number(d.correction) || 0, total: total, type: { weight: w } })
      .replace(/= (.+)$/, '= <strong>$1</strong>');
  }
  refreshSummary();

  modal.querySelectorAll('[data-action="close"]').forEach(function(el) { el.addEventListener('click', closeModal); });

  modal.querySelectorAll('[data-kind]').forEach(function(el) {
    el.addEventListener('click', function() { d.kind = el.getAttribute('data-kind'); renderModal(); });
  });
  modal.querySelectorAll('[data-remove-kind]').forEach(function(el) {
    el.addEventListener('click', function() {
      var name = el.getAttribute('data-remove-kind');
      if (state.containerKinds.length <= 1) return;
      state.containerKinds = state.containerKinds.filter(function(k) { return k !== name; });
      if (d.kind === name) d.kind = state.containerKinds[0] || '';
      saveState();
      renderModal();
    });
  });
  modal.querySelector('[data-action="addKind"]').addEventListener('click', function() {
    openTextPrompt(tr('addKindTitle'), tr('addKindHint'), function(name) {
      if (state.containerKinds.indexOf(name) === -1) { state.containerKinds.push(name); saveState(); }
      d.kind = name;
      renderModal();
    });
  });

  modal.querySelectorAll('[data-size]').forEach(function(el) {
    el.addEventListener('click', function() {
      var v = el.getAttribute('data-size');
      d.size = d.size === v ? '' : v; // повторний тап знімає розмір
      renderModal();
    });
  });
  modal.querySelectorAll('[data-remove-size]').forEach(function(el) {
    el.addEventListener('click', function() {
      var name = el.getAttribute('data-remove-size');
      state.sizes = state.sizes.filter(function(x) { return x !== name; });
      if (d.size === name) d.size = '';
      saveState();
      renderModal();
    });
  });
  modal.querySelector('[data-action="addSize"]').addEventListener('click', function() {
    openTextPrompt(tr('addSizeTitle'), tr('addSizeHint'), function(name) {
      if (state.sizes.indexOf(name) === -1) { state.sizes.push(name); saveState(); }
      d.size = name;
      renderModal();
    });
  });

  modal.querySelectorAll('[data-weight-preset]').forEach(function(el) {
    el.addEventListener('click', function() {
      d.weight = Number(el.getAttribute('data-weight-preset'));
      weightInput.value = d.weight;
      weightInput.dispatchEvent(new Event('input'));
    });
  });
  weightInput.addEventListener('input', function(e) {
    d.weight = e.target.value === '' ? '' : Number(e.target.value);
    refreshSummary();
  });

  if (countInput) {
    countInput.addEventListener('input', function() { d.count = Math.max(0, Math.floor(Number(countInput.value) || 0)); refreshSummary(); });
    modal.querySelector('[data-action="decCount"]').addEventListener('click', function() {
      if (d.count > 0) d.count--;
      countInput.value = d.count;
      refreshSummary();
    });
    modal.querySelector('[data-action="incCount"]').addEventListener('click', function() {
      d.count++;
      countInput.value = d.count;
      refreshSummary();
    });
  }
  if (corrInput) {
    corrInput.addEventListener('input', function() { d.correction = Number(corrInput.value) || 0; refreshSummary(); });
  }

  modal.querySelector('[data-action="save"]').addEventListener('click', function() {
    var w = Number(d.weight);
    if (d.weight === '' || !isFinite(w) || w <= 0) { fieldError(weightInput, tr('weightRequired')); return; }
    if (isNew) {
      addContainerType(w, d.kind, d.size);
    } else {
      updateContainerType(t.id, { weight: w, kind: d.kind, size: d.size });
      setEventCount('container', t.id, d.count);
      var delta = (Number(d.correction) || 0) - Calc.containerCorrectionKg(s, t.id);
      if (delta) applyContainerCorrection(t.id, delta);
      renderSessionView();
    }
    closeModal();
  });

  var delBtn = modal.querySelector('[data-action="delete"]');
  if (delBtn) delBtn.addEventListener('click', function() {
    if (!confirmTap(delBtn)) return;
    removeContainerType(t.id);
    closeModal();
  });

  if (isNew) setTimeout(function() { weightInput.focus(); }, 50);
}

function openPrepModal(prepId) {
  var s = state.session;
  var p = s ? sessionPrep(s, prepId) : null;
  if (!p) return;
  state.modal = {
    kind: 'prep',
    prepId: p.id,
    draft: {
      canVolume: Calc.sessionCanVolume(s, p.id, p.canVolume),
      count: Calc.canisterCount(s, p.id),
      correction: Calc.canisterCorrectionL(s, p.id)
    }
  };
  renderModal();
}

function renderPrepModal(modal) {
  var m = state.modal;
  var s = state.session;
  var p = sessionPrep(s, m.prepId);
  if (!p) { closeModal(); return; }
  var d = m.draft;

  var html = modalHeader(p.name);
  html += '<div class="modal-section field"><label class="modal-label" for="prCan">' + tr('canVolume') + '</label>';
  html += '<div class="modal-row"><input id="prCan" type="number" inputmode="decimal" min="0" class="modal-input text-right" data-role="canVol" value="' + d.canVolume + '">';
  html += '<span class="unit-tag">' + tr('liter') + '</span></div></div>';
  html += '<div class="modal-section modal-section-sep"><div class="modal-label">' + tr('countUnits') + '</div>' + counterHtml(d.count) + '</div>';
  html += '<div class="modal-section field"><label class="modal-label" for="prCorr">' + tr('correctionL') + '</label>';
  html += '<div class="modal-row"><input id="prCorr" type="number" inputmode="decimal" class="modal-input text-right" data-role="correction" value="' + (d.correction || '') + '" placeholder="±N">';
  html += '<span class="unit-tag">' + tr('liter') + '</span></div>';
  html += '<div class="modal-hint">' + tr('correctionHintKg') + '</div>';
  html += '<div class="summary-line" data-role="summary"></div>';
  html += '</div>';
  html += '<div class="modal-actions">';
  html += '<button class="btn btn-secondary" data-action="close">' + tr('cancelBtn') + '</button>';
  html += '<button class="btn btn-primary" data-action="save">' + tr('saveBtn') + '</button>';
  html += '</div>';
  html += '<button class="modal-delete-btn confirm-btn" data-action="remove">✕ ' + tr('removeFromSession') + (d.count > 0 ? ' (' + d.count + ' ' + tr('canShort') + ')' : '') + '</button>';
  modal.innerHTML = html;

  var canVolInput = modal.querySelector('[data-role="canVol"]');
  var countInput = modal.querySelector('[data-role="count"]');
  var corrInput = modal.querySelector('[data-role="correction"]');
  var summaryEl = modal.querySelector('[data-role="summary"]');

  function refreshSummary() {
    var v = Number(d.canVolume) || 0;
    var corr = Number(d.correction) || 0;
    var total = d.count * v + corr;
    var f = d.count + ' × ' + v;
    if (corr) f += ' ' + (corr > 0 ? '+' : '−') + ' ' + fmtLiters(Math.abs(corr));
    summaryEl.innerHTML = f + ' = <strong>' + fmtLiters(total) + '</strong> ' + tr('liter');
  }
  refreshSummary();

  canVolInput.addEventListener('input', function() { d.canVolume = canVolInput.value === '' ? '' : Number(canVolInput.value); refreshSummary(); });
  countInput.addEventListener('input', function() { d.count = Math.max(0, Math.floor(Number(countInput.value) || 0)); refreshSummary(); });
  corrInput.addEventListener('input', function() { d.correction = Number(corrInput.value) || 0; refreshSummary(); });
  modal.querySelector('[data-action="decCount"]').addEventListener('click', function() {
    if (d.count > 0) d.count--;
    countInput.value = d.count;
    refreshSummary();
  });
  modal.querySelector('[data-action="incCount"]').addEventListener('click', function() {
    d.count++;
    countInput.value = d.count;
    refreshSummary();
  });
  modal.querySelectorAll('[data-action="close"]').forEach(function(el) { el.addEventListener('click', closeModal); });

  modal.querySelector('[data-action="save"]').addEventListener('click', function() {
    var newCan = Number(d.canVolume);
    if (d.canVolume === '' || !isFinite(newCan) || newCan <= 0) { fieldError(canVolInput, tr('canRequired')); return; }
    s.canVolumes[p.id] = newCan;
    setEventCount('canister', p.id, d.count);
    var delta = (Number(d.correction) || 0) - Calc.canisterCorrectionL(s, p.id);
    if (delta) applyCanisterCorrection(p.id, delta);
    saveState();
    closeModal();
    renderSessionView();
  });

  var rmBtn = modal.querySelector('[data-action="remove"]');
  rmBtn.addEventListener('click', function() {
    if (!confirmTap(rmBtn)) return;
    removePrepFromSession(p.id);
    closeModal();
  });
}

// Просте підтвердження: { title, text, okLabel, onOk }
function openConfirmModal(opts) {
  state.modal = { kind: 'confirm', opts: opts };
  renderModal();
}

function renderConfirmModal(modal) {
  var o = state.modal.opts;
  modal.classList.add('modal-small');
  modal.innerHTML = modalHeader(o.title)
    + '<div class="modal-section modal-text">' + escapeHtml(o.text) + '</div>'
    + '<div class="modal-actions"><button class="btn btn-secondary" data-action="close">' + tr('cancelBtn') + '</button>'
    + '<button class="btn btn-primary" data-action="ok">' + escapeHtml(o.okLabel) + '</button></div>';
  modal.querySelectorAll('[data-action="close"]').forEach(function(el) { el.addEventListener('click', closeModal); });
  modal.querySelector('[data-action="ok"]').addEventListener('click', function() { closeModal(); o.onOk(); });
}

// ── Історія ─────────────────────────────────────────────────────────────────

function deleteSessionFromHistory(sessionId) {
  state.sessions = state.sessions.filter(function(s) { return s.id !== sessionId; });
  saveState();
  renderHistoryView();
}

function renderHistoryView() {
  var root = $('historyView');
  var html = sessionHeader('<button class="session-back" data-action="back">' + tr('backBtn') + '</button>', tr('sessionsList'));

  if (state.sessions.length === 0) {
    html += '<div class="history-empty">' + tr('noSessions') + '</div>';
  } else {
    var sorted = state.sessions.slice().sort(function(a, b) { return (b.endedAt || 0) - (a.endedAt || 0); });
    sorted.forEach(function(s) {
      html += '<div class="history-row">';
      html += '<button class="history-main" data-action="view" data-id="' + s.id + '">';
      html += '<span class="history-head"><span class="history-num">' + tr('sessionNumber') + s.number + '</span><span class="history-date">' + fmtDate(s.startedAt) + '</span></span>';
      if (s.variety) html += '<span class="history-variety">' + escapeHtml(s.variety) + '</span>';
      html += '<span class="history-meta"><span><strong>' + fmtNum(Calc.sessionTotalKg(s)) + '</strong> ' + tr('kg') + '</span>';
      html += '<span>' + Calc.sessionContainers(s) + ' ' + tr('pcs') + ' · ' + fmtTime(Calc.sessionElapsedMs(s, Date.now())) + '</span></span>';
      html += '</button>';
      html += '<div class="history-actions">';
      html += '<button data-action="view" data-id="' + s.id + '">' + tr('viewSession') + '</button>';
      html += '<button class="del confirm-btn" data-action="delete" data-id="' + s.id + '" data-confirm="1" aria-label="' + escapeHtml(tr('deleteSession')) + '">✕</button>';
      html += '</div></div>';
    });
  }
  root.innerHTML = html;
}

function onHistoryViewClick(e) {
  var btn = e.target.closest('[data-action]');
  if (!btn) return;
  var action = btn.getAttribute('data-action');
  var id = btn.getAttribute('data-id');
  if (action === 'back') { state.view = 'main'; renderViews(); return; }
  if (action === 'view') {
    if (!state.sessions.some(function(x) { return x.id === id; })) return;
    state.viewingSessionId = id;   // активна сесія лишається недоторканою
    state.view = 'session';
    renderViews();
    return;
  }
  if (action === 'delete') {
    if (!confirmTap(btn)) return;
    deleteSessionFromHistory(id);
  }
}

// ── Експорт / імпорт ────────────────────────────────────────────────────────

function exportData() {
  var payload = { app: 'spreya', format: 1, version: APP_VERSION, exportedAt: new Date().toISOString(), data: serializeState() };
  var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'spreya-' + fmtDateISO(Date.now()) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
}

function importDataFromFile(file) {
  var reader = new FileReader();
  reader.onload = function() {
    var parsed;
    try { parsed = JSON.parse(reader.result); } catch (e) { showToast(tr('importBad')); return; }
    var data = parsed && parsed.app === 'spreya' && parsed.data ? parsed.data : parsed;
    if (!data || typeof data !== 'object' || !Array.isArray(data.preparations)) { showToast(tr('importBad')); return; }
    var sessions = Array.isArray(data.sessions) ? data.sessions.length : 0;
    openConfirmModal({
      title: tr('importTitle'),
      text: tr('importConfirm') + ' ' + trf('importSummary', { sessions: sessions, preps: data.preparations.length }),
      okLabel: tr('replaceBtn'),
      onOk: function() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { showToast(tr('importBad')); return; }
        location.reload();
      }
    });
  };
  reader.readAsText(file);
}

// ── Service worker ──────────────────────────────────────────────────────────

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  navigator.serviceWorker.register('./sw.js').then(function(reg) {
    // Є контролер — це оновлення; нема — перша установка (після неї працює офлайн).
    var hadController = !!navigator.serviceWorker.controller;
    reg.addEventListener('updatefound', function() {
      var w = reg.installing;
      if (!w) return;
      w.addEventListener('statechange', function() {
        if (w.state !== 'installed') return;
        if (hadController) {
          showToast(tr('newVersion'), { label: tr('reloadBtn'), onClick: function() { location.reload(); } }, true);
        } else {
          showToast(tr('offlineReady'));
        }
      });
    });
  }).catch(function() { /* без SW застосунок теж працює */ });
}

// ── Ініціалізація ───────────────────────────────────────────────────────────

function init() {
  loadState();
  ensureStreams();
  renderAll();

  if (state.timer.running && state.timer.startMs) {
    clearInterval(timerInterval);
    timerInterval = setInterval(tickTimer, 100);
    acquireWakeLock();
  }
  if (state.session && state.session.startedAt && !state.session.endedAt) startSessionTicker();

  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState !== 'visible') return;
    if (state.timer.running && state.timer.startMs) {
      state.timer.elapsedMs = Date.now() - state.timer.startMs;
      $('timerDisplay').textContent = fmtTime(state.timer.elapsedMs);
      acquireWakeLock();
    }
    if (state.view === 'main') renderSessionEntry();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    if (state.prompt) { closePrompt(); return; }
    if (state.modal) closeModal();
  });

  $('sessionEntry').addEventListener('click', enterSessionView);
  $('historyEntry').addEventListener('click', function() { state.view = 'history'; renderViews(); });
  $('sessionView').addEventListener('click', onSessionViewClick);
  $('historyView').addEventListener('click', onHistoryViewClick);

  $('themeBtn').addEventListener('click', function() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    saveState();
    applyTheme();
  });

  $('langToggle').addEventListener('click', function(e) {
    var btn = e.target.closest('button[data-lang]');
    if (!btn || btn.getAttribute('data-lang') === state.lang) return;
    state.lang = btn.getAttribute('data-lang');
    saveState();
    renderAll();
  });

  $('timerBtn').addEventListener('click', onTimerBtn1);
  $('timerBtn2').addEventListener('click', onTimerBtn2);

  $('addStreamBtn').addEventListener('click', function() {
    if (state.streams.length >= MAX_STREAMS) return;
    state.streams.push({ id: uid(), before: '', after: '' });
    renderStreams();
    updateSpeedDisplay();
    saveState();
  });

  $('speedMode').addEventListener('click', function(e) {
    var btn = e.target.closest('button[data-mode]');
    if (btn) setSpeedMode(btn.getAttribute('data-mode'));
  });
  $('speedHint').addEventListener('click', function() {
    setSpeedMode(state.speedMode === 'manual' ? 'calc' : 'manual');
  });
  $('manualSpeed').addEventListener('input', function(e) {
    state.manualSpeed = Number(e.target.value) || 0;
    state.speedMode = 'manual';
    saveState();
    updateSpeedDisplay();
  });

  $('addPrepBtn').addEventListener('click', addPreparation);

  $('exportBtn').addEventListener('click', exportData);
  $('importBtn').addEventListener('click', function() { $('importFile').click(); });
  $('importFile').addEventListener('change', function(e) {
    var f = e.target.files && e.target.files[0];
    if (f) importDataFromFile(f);
    e.target.value = '';
  });

  $('appVersion').textContent = 'v' + APP_VERSION;
  registerServiceWorker();
}

init();
