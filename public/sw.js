/**
* @description Code for Service Worker 
*/

// Cache name
let cacheMap = 'cacheMap-1';

// Files list to cache
let cacheFiles = [
	'/',
  '../data/cinemas.json',
  '../data/galeries.json',
  '../data/museums.json',
  '../data/theatres.json',  
  '../icons/cinema.png',
  '../icons/galeria.png',
  '../icons/museum.png',
  '../icons/theatre.png',
  '../images/mapa_Bg.png',
  'index.html',
  './App.css',
  './App.js',
  './index.css',
  './Map.js',
  './Places.js',
  './WikipediaApi.js',
  '/static/js/bundle.js',
  'manifest.json',
]

/**
* @description Installation Service worker 
*/
self.addEventListener('install', e => {
  e.waitUntil(
      caches.open(cacheMap).then(cache => {
      return cache.addAll(cacheFiles);
  }).then( () => {
      return self.skipWaiting();
      })
  );
});

/**
* @description Activation Service worker 
*//**
* @description Activation Service worker 
*/
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(cacheNames => Promise.all(
        cacheNames.filter(cacheName => cacheName.startsWith(cacheMap) && cacheName !== cacheMap
    )
    .map(cacheName => caches.delete(cacheName)))))
});

/**
* @description Fetching Service worker 
*/
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(function(response) {
      if (response) {
        return response;
      } else {
        console.log('There are not response');
      }
      return fetch(e.request);
    })
  );
});