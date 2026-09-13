'use strict';

// Чисті розрахунки без DOM і стану. Одне джерело правди для картки в сесії,
// підсумку та історії — щоб цифри всюди сходились.
// Завантажується перед app.js; у тестах підключається окремо.
var Calc = (function() {

  // ── Швидкість потоку ───────────────────────────────────────────────────

  // Приріст ваги на одних вагах: «стало» − «було», від'ємне → 0.
  function streamDelta(stream) {
    if (stream.after === '' || stream.after == null) return 0;
    var after = Number(stream.after);
    var before = Number(stream.before) || 0;
    if (!isFinite(after)) return 0;
    var delta = after - before;
    return delta > 0 ? delta : 0;
  }

  function streamsTotal(streams) {
    var sum = 0;
    for (var i = 0; i < streams.length; i++) sum += streamDelta(streams[i]);
    return sum;
  }

  // кг/хв за набраною масою і зафіксованим часом; null, якщо даних нема.
  function speedKgPerMin(totalKg, elapsedMs) {
    var minutes = elapsedMs / 60000;
    if (!(totalKg > 0) || !(minutes > 0)) return null;
    return totalKg / minutes;
  }

  // ── Препарати ──────────────────────────────────────────────────────────

  // мл/хв = кг/хв × (мл/т) / 1000
  function mlPerMin(speedKgPerMin, normMlPerTon) {
    if (!(speedKgPerMin > 0) || !(normMlPerTon > 0)) return null;
    return speedKgPerMin * normMlPerTon / 1000;
  }

  // Скільки хвилин триває 1 л при такій витраті.
  function minutesPerLiter(mlPerMinValue) {
    if (!(mlPerMinValue > 0)) return null;
    return 1000 / mlPerMinValue;
  }

  // Зворотний розрахунок: яка швидкість картоплі (кг/год) відповідає витраті мл/хв.
  function kgPerHourFromMlPerMin(mlPerMinValue, normMlPerTon) {
    if (!(mlPerMinValue > 0) || !(normMlPerTon > 0)) return null;
    return mlPerMinValue * 1000 / normMlPerTon * 60;
  }

  // Фактична норма: літри на тонни → мл/т.
  function actualMlPerTon(liters, totalKg) {
    if (!(totalKg > 0)) return null;
    return liters * 1000 / (totalKg / 1000);
  }

  function deviationPct(actual, norm) {
    if (actual == null || !(norm > 0)) return null;
    return (actual - norm) / norm * 100;
  }

  // ── Сесія ──────────────────────────────────────────────────────────────

  function containerCount(session, typeId) {
    var c = 0;
    session.events.forEach(function(e) {
      if (e.type === 'container' && e.refId === typeId) c++;
    });
    return c;
  }

  function canisterCount(session, prepId) {
    var c = 0;
    session.events.forEach(function(e) {
      if (e.type === 'canister' && String(e.refId) === String(prepId)) c++;
    });
    return c;
  }

  function containerCorrectionKg(session, typeId) {
    var sum = 0;
    session.events.forEach(function(e) {
      if (e.type === 'container_corr' && e.refId === typeId) sum += Number(e.deltaKg) || 0;
    });
    return sum;
  }

  function canisterCorrectionL(session, prepId) {
    var sum = 0;
    session.events.forEach(function(e) {
      if (e.type === 'canister_corr' && String(e.refId) === String(prepId)) sum += Number(e.deltaL) || 0;
    });
    return sum;
  }

  // Маса по одному типу ємкості з урахуванням корекцій.
  function typeTotalKg(session, type) {
    return containerCount(session, type.id) * type.weight + containerCorrectionKg(session, type.id);
  }

  function sessionTotalKg(session) {
    var sum = 0;
    session.containerTypes.forEach(function(t) { sum += typeTotalKg(session, t); });
    return sum;
  }

  function sessionContainers(session) {
    return session.events.filter(function(e) { return e.type === 'container'; }).length;
  }

  // Об'єм каністри для препарату в сесії (сесія може перевизначати).
  function sessionCanVolume(session, prepId, fallback) {
    var v = session.canVolumes ? session.canVolumes[prepId] : null;
    if (v == null && session.canVolumes) v = session.canVolumes[String(prepId)];
    if (v == null) v = fallback;
    if (v == null) v = 5;
    return v;
  }

  function prepLiters(session, prepId, fallbackVol) {
    return canisterCount(session, prepId) * sessionCanVolume(session, prepId, fallbackVol)
      + canisterCorrectionL(session, prepId);
  }

  // Чистий час сесії без пауз. now — для активної сесії.
  function sessionElapsedMs(session, now) {
    if (!session || !session.startedAt) return 0;
    var endTs = session.endedAt || now;
    var pausedMs = session.totalPausedMs || 0;
    if (session.paused && session.pauseStartedAt) pausedMs += now - session.pauseStartedAt;
    return Math.max(0, endTs - session.startedAt - pausedMs);
  }

  function avgSpeedKgPerMin(totalKg, elapsedMs) {
    if (!(elapsedMs > 0)) return 0;
    return totalKg / (elapsedMs / 60000);
  }

  // ── Форматування ───────────────────────────────────────────────────────

  var NBSP = ' ';

  // 12345.6 → "12 345,6" (uk) / "12 345.6" (en); розряди через нерозривний пробіл.
  function fmtNum(n, decimals, lang) {
    if (decimals == null) decimals = 0;
    if (typeof n !== 'number' || !isFinite(n)) return '—';
    var fixed = n.toFixed(decimals);
    var neg = fixed.charAt(0) === '-';
    if (neg) fixed = fixed.slice(1);
    var parts = fixed.split('.');
    var intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
    var dec = lang === 'en' ? '.' : ',';
    var out = parts.length > 1 ? intPart + dec + parts[1] : intPart;
    return (neg ? '−' : '') + out;
  }

  // Для літрів: ціле → без десяткових, інакше одна.
  function fmtLiters(l, lang) {
    return fmtNum(l, Math.abs(l) % 1 ? 1 : 0, lang);
  }

  function fmtHMS(ms) {
    if (!isFinite(ms) || ms < 0) ms = 0;
    var totalSec = Math.floor(ms / 1000);
    var h = Math.floor(totalSec / 3600);
    var m = Math.floor((totalSec % 3600) / 60);
    var s = totalSec % 60;
    return pad2(h) + ':' + pad2(m) + ':' + pad2(s);
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  // Хвилини → «45 с» / «12 хв» / «1 год 5 хв». units: {sec, min, hour}
  function fmtMinutes(minutes, units) {
    if (!isFinite(minutes) || minutes <= 0) return '—';
    if (minutes < 1) return Math.max(1, Math.round(minutes * 60)) + ' ' + units.sec;
    var total = Math.round(minutes);
    if (total < 60) return total + ' ' + units.min;
    var h = Math.floor(total / 60);
    var m = total % 60;
    if (m === 0) return h + ' ' + units.hour;
    return h + ' ' + units.hour + ' ' + m + ' ' + units.min;
  }

  return {
    streamDelta: streamDelta,
    streamsTotal: streamsTotal,
    speedKgPerMin: speedKgPerMin,
    mlPerMin: mlPerMin,
    minutesPerLiter: minutesPerLiter,
    kgPerHourFromMlPerMin: kgPerHourFromMlPerMin,
    actualMlPerTon: actualMlPerTon,
    deviationPct: deviationPct,
    containerCount: containerCount,
    canisterCount: canisterCount,
    containerCorrectionKg: containerCorrectionKg,
    canisterCorrectionL: canisterCorrectionL,
    typeTotalKg: typeTotalKg,
    sessionTotalKg: sessionTotalKg,
    sessionContainers: sessionContainers,
    sessionCanVolume: sessionCanVolume,
    prepLiters: prepLiters,
    sessionElapsedMs: sessionElapsedMs,
    avgSpeedKgPerMin: avgSpeedKgPerMin,
    fmtNum: fmtNum,
    fmtLiters: fmtLiters,
    fmtHMS: fmtHMS,
    fmtMinutes: fmtMinutes,
    NBSP: NBSP
  };
})();
