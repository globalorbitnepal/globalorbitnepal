const CACHE = "orbit-app-v2";
const PRECACHE = ["/", "/manifest.webmanifest", "/icons/pwa-192.png", "/icons/pwa-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache admin, APIs, or Next data mutations
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/orbit") ||
    url.pathname.includes("/_next/webpack")
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && (request.destination === "document" || request.destination === "style" || request.destination === "script" || request.destination === "image" || url.pathname.endsWith(".webmanifest"))) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => cached || (request.mode === "navigate" ? caches.match("/") : undefined)),
      ),
  );
});
