# apexsignal-app

Statický frontend pro ApexSignal, nasazovaný na Netlify (`apexsignal-tickets`
projekt, doména `apexsignal.cz`) ručním nahráním souborů — repozitář sám o
sobě nasazení nespouští.

## Stav tohoto repozitáře (25. 7. 2026)

`index.html`, `manifest.json` a `sw.js` jsou byte-přesná kopie souborů, které
tou dobou skutečně běžely na `apexsignal.cz` — ověřeno porovnáním SHA1 otisku
proti tomu, co hlásí Netlify API. Předchozí obsah repozitáře byl výrazně
starší verzí appky (jen přihlašovací obrazovka bez zbytku appky) a při
nasazení z něj přepsal živý web o hodně starší verzí.

**Chybí `netlify.toml`.** Živé nasazení ho obsahuje (391 bajtů), ale Netlify
API u tohoto konkrétního souboru vždy vrátí jen jeho popis (otisk, velikost),
nikdy skutečný obsah — ani přes veřejnou adresu webu (tam appka na tuhle
cestu dostane Netlify vlastní stránku "Page not found"). Obsah tedy nejde bez
přístupu do Netlify UI ověřit, a proto tu chybí — hádat si ho je horší než
nemít nic.

Než se doplní, nasazení POUZE z tohoto repozitáře (bez ručního přidání
`netlify.toml`) nemusí být 100% identické s tím, co běží na `apexsignal.cz`.
