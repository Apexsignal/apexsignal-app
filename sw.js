// sw.js — minimální service worker pro ApexSignal.
//
// Appka tohle potřebuje JEN proto, aby ji telefon (hlavně Android/Chrome)
// vůbec nabídl k instalaci na domovskou obrazovku — bez zaregistrovaného
// service workeru "Add to Home Screen" prompt na Androidu nenaskočí.
//
// Appka NEMÁ offline ambice — živá data (kurzy, signály) bez sítě nemají
// smysl, appka proto nic agresivně necachuje. Jen zachytí app shell
// (index.html), ať appka nezůstane úplně bílá obrazovka, když síť na
// telefonu na okamžik vypadne.

const CACHE_NAME = "apexsignal-shell-v1";
const SHELL_FILES = ["./index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  // appka jede "network first" — živá appka potřebuje čerstvá data, ne
  // starý cache. Cache je tu jen jako záchranná síť, když síť úplně vypadne.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
