const CACHE_NAME = ‘bcp-hub-v1’;
const FILES_TO_CACHE = [
‘./index.html’,
‘./manifest.json’
];

// Install: cache files
self.addEventListener(‘install’, (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
return cache.addAll(FILES_TO_CACHE);
})
);
self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener(‘activate’, (event) => {
event.waitUntil(
caches.keys().then((keyList) =>
Promise.all(
keyList.map((key) => {
if (key !== CACHE_NAME) return caches.delete(key);
})
)
)
);
self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener(‘fetch’, (event) => {
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
})
);
});
