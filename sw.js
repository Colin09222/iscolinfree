/* Kill switch. cancolinfort.com used to host the Bender HQ app, which installed an
   offline service worker here. This replaces it, clears its caches and unregisters,
   so visitors get the live status site instead of a stale cached app. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
  })());
});
