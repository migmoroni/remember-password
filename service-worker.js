// Arquivo: service-worker.js

const CACHE_VERSION = '0704002';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        return cache.addAll(['/']);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'checkForUpdates') {
    fetch('/index.html')  // Substitua pelo caminho real do seu arquivo principal
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const metaVersionTag = doc.querySelector('meta[name="version"]');
        const remoteVersion = metaVersionTag ? metaVersionTag.getAttribute('content') : null;

        if (remoteVersion && remoteVersion > CACHE_VERSION) {
          console.log('Nova versão disponível. Recarregando página...');
          self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage({ action: 'reloadPage' }));
          });
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar versão:', error);
      });
  }
});