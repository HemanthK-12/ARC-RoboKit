self.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service worker activating...');
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.open('mysite-dynamic').then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });
  