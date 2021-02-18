
self.addEventListener('install',function(event) {
event.waitUntil(
       caches.open('sw-cache').then(function(cache) {
        return cache.add('index.html');
        return cache.add('movie.js');
       })
      );
     });
     
     
self.addEventListenercfetch',function(event) {
event.respondWith(

caches.match(event.request).then(function(response) {
         return response II fetch(event.request);
    ))
    );


