// Think First Family: lets the parent page install as an app. Pages always come from the network
// (so data is fresh); this only keeps a copy of the page itself for when the phone is offline.
const CACHE = 'tf-parent-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['/parent/']))); });
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || !u.pathname.startsWith('/parent/')) return;
  e.respondWith(fetch(e.request).then((r) => { if (r.ok && u.pathname === '/parent/') { const copy = r.clone(); caches.open(CACHE).then((c) => c.put('/parent/', copy)); } return r; })
    .catch(() => caches.match(e.request).then((m) => m || caches.match('/parent/'))));
});
