// Service Worker for offline functionality
const CACHE_NAME = 'covid-learn-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/learn.html',
  '/quiz.html',
  '/stats.html',
  '/game.html',
  '/end.html',
  '/highscores.html',
  '/Styles/style.css',
  '/Styles/quiz.css',
  '/Styles/game.css',
  '/Styles/highscores.css',
  '/Styles/normalize.css',
  '/Styles/modern-enhancements.css',
  '/Scripts/loadapi.js',
  '/Scripts/quiz.js',
  '/Scripts/learn.js',
  '/Scripts/end.js',
  '/Scripts/highscores.js',
  '/Scripts/modern-enhancements.js',
  '/country-codes-lat-long-alpha3.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});