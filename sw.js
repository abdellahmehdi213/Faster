const CACHE_NAME = 'faster-food-v5';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Always fetch live from network
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
