\# Vývojový deník - Collegium Bonum



\## Aktuální stav (únor 2026)

\- \[x] Inicializace SanityPress starteru

\- \[x] Definice schémat: `concert` (v `koncert.ts`) a `musicPiece.ts`

\- \[x] Registrace schémat v `schemaTypes/index.ts`

\- \[x] Vytvořena komponenta `ConcertCard.tsx`

\- \[x] Vytvořeny stránky `/koncerty` (list) a `/koncerty/\[slug]` (detail)



\## Rozpracováno / Blokery

\- \*\*Chyba importu:\*\* Stránka `/koncerty` padá na `Module not found: Can't resolve '@/sanity/lib/live'`.

\- \*\*Úkol:\*\* Opravit importy na `@/sanity/lib/client` a ověřit kompatibilitu s Next.js 15 (async params).



\## Další kroky

1\. Zprovoznit list a detail koncertů.

2\. Přidat schéma pro Aktuality (News).

3\. Vyřešit lokalizaci (pokud bude potřeba CZ/EN).



https://aistudio.google.com/u/1/prompts/1cZessFTbPnlLRfKpFi6qrNKEujFdzx4w





To je rozumné. Jako seniorní vývojář vím, že nejlepší způsob, jak udržet kontinuitu u dlouhodobého projektu, je "Status Log" a Git.

Jak zajistíme návrat:

Commit do Gitu: Prosím, uložte si rozdělanou práci do gitu. I když kód teď hází chybu, uložte ho do větve (např. feat/concerts).

code

Bash

git add .

git commit -m "Work in progress: concert schemas and listing pages"

Tato konverzace: ChatGPT si historii pamatuje, takže stačí příště pokračovat v tomto vlákně.

Checkpoint Summary: Pokud byste začínal nové vlákno, stačí mi vložit následující odstavec:

Checkpoint projektu Collegium Bonum:

Stav: Máme hotová schémata concert (v koncert.ts) a musicPiece.ts. Jsou registrovaná v schemaTypes/index.ts.

Frontend: Vytvořeny soubory src/app/koncerty/page.tsx a src/app/koncerty/\[slug]/page.tsx.

Blokáda: Řešíme chybu Module not found u importu @/sanity/lib/live vs @/sanity/lib/client a ověřujeme funkčnost zobrazení na localhost:3000/koncerty.

Tech Info: Next.js 15 (asynchronní params), Sanity v3, SanityPress starter.

Co udělat jako první, až se k tomu vrátíte:

Jen mi napište: "Ahoj, pokračujeme. Skončili jsme u chybějícího importu klienta v /koncerty."

Budu přesně vědět, kde jsme. Odpočiňte si a sborový web dotáhneme příště! 🎶


Projektový Checkpoint: Collegium Bonum
Stav k 1. 2. 2026:
Sanity Schémata: Kompletní a funkční: concert (Koncerty), news (Aktuality), musicPiece (Repertoár).
Sanity Studio: Levý panel (structure.tsx) je plně funkční, ikony opraveny (VscMegaphone, VscEdit, VscLibrary).
Data: Inicializovány Site Settings a Navigation, což vyřešilo chybu reading '_rev'.
Frontend:
/koncerty (list) a /koncerty/[slug] (detail) jsou připraveny a ošetřeny pro Next.js 15 (async params).
ConcertCard je robustní a zabezpečený proti chybějícím datům.
Úvodní stránka (src/app/page.tsx) má připravenou logiku pro Hero sekci a Aktuality.
Rozpracováno / Kde jsme přestali:
Máme rozepsaný kód pro HomePage, který čeká na první zobrazení a doladění designu.
V Sanity je publikován první koncert (Nová Horka) a první aktualita.
Plán pro příští session:
Verifikace Home Page: Zkontrolovat, jak vypadá nová úvodní stránka na localhost:3000.
Frontend pro Aktuality: Vytvořit stránky /aktuality (seznam) a /aktuality/[slug] (detail), podobně jako u koncertů.
Hlavička a Patička: Propojit menu ze Sanity (Navigation) do reálného webu, aby fungovaly odkazy.
Repertoár: Vytvořit veřejný seznam skladeb, které sbor zpívá.
Tip pro vás: Před vypnutím počítače udělejte poslední git add . a git commit -m "Sanity structure fixed, home page logic drafted", ať máte jistotu, že je vše uloženo.