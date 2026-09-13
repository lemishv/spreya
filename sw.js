/* Service worker: застосунок працює офлайн.
   Модель «оболонка застосунку»: index.html — з мережі (з відкатом на кеш),
   ресурси з ?v=версія — з кешу. При релізі підняти версію в трьох місцях
   (див. tools/bump_version.py): APP_VERSION в app.js, ?v= в index.html, CACHE тут. */

var VERSION = '0.7.0';
var CACHE = 'spreya-' + VERSION;
var SHELL = [
  './',
  './index.html',
  './style.css?v=' + VERSION,
  './calc.js?v=' + VERSION,
  './app.js?v=' + VERSION,
  './manifest.json',
  './fonts/fonts.css?v=' + VERSION,
  './fonts/fraunces-latin.woff2',
  './fonts/jetbrains-mono-latin.woff2',
  './fonts/jetbrains-mono-cyrillic.woff2',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];
var NETWORK_TIMEOUT_MS = 3000;
var DEV = ['localhost', '127.0.0.1'].indexOf(self.location.hostname) !== -1;

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE).then(function(cache) { return cache.addAll(SHELL); }).then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

function fetchWithTimeout(request, ms) {
  return new Promise(function(resolve, reject) {
    var timer = setTimeout(function() { reject(new Error('timeout')); }, ms);
    fetch(request).then(function(res) { clearTimeout(timer); resolve(res); }, function(err) { clearTimeout(timer); reject(err); });
  });
}

self.addEventListener('fetch', function(event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  var isNavigation = req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') !== -1;

  if (isNavigation) {
    // Сторінка: спершу мережа (свіжа версія), інакше — кеш.
    event.respondWith(
      fetchWithTimeout(req, NETWORK_TIMEOUT_MS).then(function(res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function(cache) { cache.put('./index.html', copy); });
        }
        return res;
      }).catch(function() {
        return caches.match('./index.html', { ignoreSearch: true }).then(function(cached) {
          return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        });
      })
    );
    return;
  }

  // Ресурси: спершу кеш, інакше мережа (і запам'ятати).
  // На localhost — навпаки, спершу мережа: правки видно без підняття версії.
  if (DEV) {
    event.respondWith(
      fetch(req).then(function(res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function(cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function() { return caches.match(req); })
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(function(cached) {
      if (cached) return cached;
      return fetch(req).then(function(res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function(cache) { cache.put(req, copy); });
        }
        return res;
      });
    })
  );
});
