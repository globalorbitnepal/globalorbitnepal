const CACHE = "orbit-app-v4-brand-icons-2026";
const PRECACHE = [
  "/manifest.webmanifest",
  "/icons/favicon-48.png",
  "/icons/pwa-192.png",
  "/icons/apple-touch-180.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/orbit") ||
    url.pathname.includes("/_next/webpack")
  ) {
    return;
  }

  // HTML: always network — avoids showing a pre-cutover cached shell on the same domain.
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/") || Response.error()),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (
          response.ok &&
          (request.destination === "style" ||
            request.destination === "script" ||
            request.destination === "image" ||
            url.pathname.endsWith(".webmanifest"))
        ) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
