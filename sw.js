// Service Worker - 推し活記録
const CACHE_NAME = 'oshi-katsu-v1';
const ASSETS = [
  './',
  './index.html',
  './home.html',
  './venues.html',
  './venue-detail.html',
  './seat-add.html',
  './seat-edit.html',
  './expenses.html',
  './calendar.html',
  './timeline.html',
  './css/style.css',
  './js/firebase.js',
  './js/auth-guard.js',
  './manifest.json',
];

// インストール時にキャッシュ
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 古いキャッシュ削除
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ネットワーク優先、失敗時キャッシュ
self.addEventListener('fetch', e => {
  // Firebase APIはキャッシュしない
  if (e.request.url.includes('firestore') || e.request.url.includes('firebase')) return;
  
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
