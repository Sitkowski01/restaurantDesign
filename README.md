# La Maison Dorée — strona restauracji z systemem rezerwacji

Aplikacja webowa dla restauracji: strona prezentacyjna, pełny proces rezerwacji stolika
oraz trzy panele operacyjne dla personelu. Zbudowana w React i TypeScript, z backendem
na Supabase i wdrożeniem na Vercelu.

## Co robi

**Część dla gościa**

- Strona główna z galerią w układzie coverflow i sekcją o restauracji
- Karta menu
- Podstrona wydarzeń prywatnych
- **Rezerwacja stolika w czterech krokach:** wybór daty i godziny → wybór stolika z planu
  sali → dane gościa → potwierdzenie
- Zgoda na pliki cookie
- Obsługa nieistniejących adresów (404)

**Część dla personelu**

- Logowanie pracownika
- **Panel kelnera** — bieżące rezerwacje i obsługa sali
- **Panel menedżera** — zarządzanie rezerwacjami i dostępnością stolików
- **Panel administratora** — konfiguracja i podgląd całości

Każda rola widzi inny zakres danych i inne akcje.

## Stack

| Warstwa | Technologie |
|---|---|
| Frontend | React, TypeScript, Vite |
| Style | Tailwind CSS |
| Komponenty | Radix UI (shadcn/ui), Material UI |
| Backend | Supabase — Edge Functions, magazyn klucz–wartość |
| Hosting | Vercel |

## Uruchomienie

```bash
npm i
cp .env.example .env      # uzupełnij VITE_SUPABASE_PROJECT_ID i VITE_SUPABASE_ANON_KEY
npm run dev
```

Klucze Supabase znajdziesz w panelu projektu, w **Settings → API**.
W repozytorium nie ma żadnych sekretów — konfiguracja idzie wyłącznie przez zmienne środowiskowe.

## Struktura

```
src/app/pages/        widoki: landing, menu, rezerwacja, panele personelu
src/app/components/   komponenty własne + biblioteka UI
src/app/routes.tsx    routing
supabase/functions/   funkcje serwerowe
utils/supabase/       klient i konfiguracja
```

## Pochodzenie i zależności

Szkielet projektu powstał w Figma Make, a warstwa komponentów bazowych to
[shadcn/ui](https://ui.shadcn.com/) na licencji MIT. Widoki, proces rezerwacji, panele
personelu, routing, integracja z Supabase i wdrożenie są napisane samodzielnie.
Zdjęcia pochodzą z [Unsplash](https://unsplash.com/license). Pełna lista w
[ATTRIBUTIONS.md](ATTRIBUTIONS.md).
