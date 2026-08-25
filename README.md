# La Maison Dorée — strona restauracji z systemem rezerwacji

Aplikacja webowa dla restauracji: strona prezentacyjna, pełny proces rezerwacji stolika
oraz trzy rozbudowane panele operacyjne dla personelu — kelnera, menedżera i administratora,
każdy z własnym zakresem uprawnień. Zbudowana w React i TypeScript, z backendem
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

**Część dla personelu — trzy panele, trzy różne role**

Logowanie pracownika kieruje do panelu zależnego od roli. Każdy z nich to osobny,
rozbudowany widok — łącznie ponad 7 000 linii kodu.

**Panel kelnera** — narzędzie do obsługi sali w trakcie serwisu

- Interaktywny **plan sali** z podziałem na sekcje i przeciąganiem stolików
- Statusy stolików i lista nadchodzących rezerwacji, także gości bez rezerwacji
- **Przyjmowanie zamówień** z karty: dania, napoje, dobór win, dolewki
- Zbiorcze oznaczanie napojów jako podanych i kontrola, czy całe zamówienie wyszło
- **Alergeny przy pozycji zamówienia**, z możliwością dopisania własnego,
  i oznaczenie, że kuchnia została powiadomiona

**Panel menedżera** — bieżące zarządzanie zmianą

- Nadchodzące rezerwacje z filtrami i podsumowaniem dnia oraz tygodnia
- **Grafik zmian** i obsada personelu
- Zarządzanie stolikami i ich dostępnością
- Edycja karty: dania, składniki, kategorie, oznaczenia alergenów i zawartości alkoholu

**Panel administratora** — konfiguracja całego lokalu

- **Zarządzanie personelem:** role (administrator, menedżer, serwis), stanowiska,
  umowy, aktywacja i dezaktywacja kont
- Pełna edycja karty dań i napojów wraz z kategoriami i alergenami
- Wydarzenia i rezerwacje na wyłączność
- **Polityka anulacji** z regułami opłat po terminie
- **Analityka:** przychody, podsumowania tygodniowe i miesięczne, aktywność personelu

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
