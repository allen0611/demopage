const CACHE_NAME = "your-app-cache-v1";
let urlsToCache = [];

fetch("asset-manifest.json")
  .then(response => response.json())
  .then(assets => {
    urlsToCache = [
      "/",
      assets["static/css/main.css"],
      assets["static/js/main.js"],
      "/favicon.ico"
    ];
  });

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
