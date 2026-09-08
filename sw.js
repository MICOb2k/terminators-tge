// Minimal service worker — just enough to satisfy "installable PWA"
// criteria (add to home screen). Does light caching of static shell
// files so the site opens instantly on repeat visits.

const CACHE_NAME = "tge-shell-v1";
const SHELL_FILES = [
  "/index.html",
  "/css/style.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Network-first for everything — this is a live tournament site,
  // stale data is worse than a slightly slower load.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
