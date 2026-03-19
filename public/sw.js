const CACHE_NAME = "studybot-v1";

// Arquivos essenciais para o app funcionar offline
const STATIC_ASSETS = [
  "/",
  "/index.html",
];

// ── Instalação: cacheia os assets estáticos ──────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ── Ativação: remove caches antigos ─────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: network first, fallback para cache ────────────────────────────
self.addEventListener("fetch", (event) => {
  // Ignora requisições não-GET e extensões de browser
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Atualiza o cache com a resposta mais recente
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => {
        // Sem internet: serve do cache
        return caches.match(event.request).then(
          (cached) => cached ?? caches.match("/index.html")
        );
      })
  );
});
