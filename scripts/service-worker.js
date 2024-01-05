// service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Requisição fetch capturada:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});