# La Maison Dorée — strona restauracji z systemem rezerwacji

[![CI](https://github.com/Sitkowski01/restaurantDesign/actions/workflows/ci.yml/badge.svg)](https://github.com/Sitkowski01/restaurantDesign/actions/workflows/ci.yml)

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

## Decyzje projektowe

**Klucz rezerwacji niesie datę i godzinę.** Rezerwacje leżą pod
`reservation:{data}:{godzina}:{id}`, więc pytanie „co jest zajęte tego dnia o tej porze"
to jeden skan po prefiksie, bez przeglądania całego zbioru. Ta sama sztuczka obsługuje
stoliki (`table:{id}`). Cena: nie da się tanio zapytać „wszystkie rezerwacje tego gościa" —
trzeba by drugiego indeksu, którego tu nie ma, bo żaden ekran tego nie potrzebuje.

**Plan sali jest danymi, nie układem w kodzie.** Każdy stolik trzyma własne `x`, `y`,
`width`, `height` i `shape`, dlatego menedżer może przeciągnąć stolik w panelu i zmiana
zostaje. Gdyby rozkład sali siedział w komponencie, każda zmiana ustawienia oznaczałaby
wdrożenie.

**Dopasowanie stolika to przedział, nie równość.** Stolik pasuje, gdy jego pojemność
mieści się w `[liczba gości, liczba gości + 2]`. Sama równość odrzucałaby trójkę przy
czteroosobowym stoliku, a brak górnego ograniczenia sadzałby parę przy stole na osiem
i wypychał z sali większe grupy.

**Trzy osobne panele zamiast jednego z uprawnieniami.** Kelner w trakcie serwisu, menedżer
układający grafik i administrator konfigurujący lokal patrzą na zupełnie inne dane. Jeden
ekran z ukrywanymi kawałkami byłby zlepkiem trzech, a kontrola dostępu rozsypałaby się po
warunkach w widoku. Tu rola decyduje o trasie, a nie o tym, co jest schowane.

**Testy chodzą po zbudowanej paczce.** `vite preview` serwuje dokładnie to, co trafia na
produkcję. Serwer deweloperski ma inny bundling i inne ścieżki — testy na nim potrafią być
zielone przy zepsutym buildzie.

**Selektory na `data-testid`, nie na klasach Tailwinda.** Przemalowanie przycisku nie może
wywracać testu, który sprawdza rezerwację.

## Czego tu świadomie nie ma

Uczciwie, żeby nie było niespodzianek przy czytaniu kodu:

- **Logowanie personelu opiera się na PIN-ie**, nie na prawdziwym uwierzytelnianiu.
  Do demonstracji ról wystarcza; w lokalu, gdzie panel administratora ma dostęp do umów
  i przychodów, trzeba by kont z hasłami i drugiego składnika.
- **Zapis rezerwacji to odczyt, potem zapis, bez transakcji.** Magazyn klucz–wartość nie
  daje warunku „zapisz tylko, jeśli nadal wolne", więc dwie osoby rezerwujące ten sam
  stolik w tej samej sekundzie mogą obie dostać potwierdzenie. Rozwiązanie to unikalne
  ograniczenie na (stolik, data, godzina) w bazie relacyjnej — i to jest pierwszy powód,
  dla którego ten projekt powinien przejść na tabele.
- **Magazyn klucz–wartość zamiast tabel** — bez relacji, bez ograniczeń, bez raportów
  po stronie bazy. Analityka w panelu administratora liczy się w aplikacji, co przy
  kilkuset rezerwacjach jest bez znaczenia, a przy kilkudziesięciu tysiącach przestanie być.
- **CORS otwarty na wszystkie źródła** w funkcji serwerowej — wygodne przy pracy lokalnej,
  do zawężenia przed produkcją.

## Uruchomienie

```bash
npm ci
cp .env.example .env      # uzupełnij VITE_SUPABASE_PROJECT_ID i VITE_SUPABASE_ANON_KEY
npm run dev               # serwer deweloperski
npm run build             # build produkcyjny do dist/
npm run preview           # podgląd builda na http://localhost:4173
npm run test:e2e          # testy end-to-end
```

Klucze Supabase znajdziesz w panelu projektu, w **Settings → API**.
W repozytorium nie ma żadnych sekretów — konfiguracja idzie wyłącznie przez zmienne środowiskowe.

## Testy

**30 testów end-to-end w Playwrighcie**, w dwóch konfiguracjach: Chromium na desktopie
(cały zestaw) i Pixel 7 dla ścieżki krytycznej. Testy chodzą po **zbudowanej** aplikacji
uruchomionej przez `vite preview` — po tej samej paczce, która trafia na produkcję,
a nie po serwerze deweloperskim.

```bash
npm run test:e2e         # cały zestaw
npm run test:e2e:ui      # tryb interaktywny
npm run test:e2e:report  # ostatni raport HTML
```

| Plik | Co sprawdza |
|---|---|
| `e2e/reservation-flow.spec.ts` | pełne przejście czterech kroków aż do potwierdzenia i kontrola, że data, godzina, stolik i liczba gości docierają na ostatni ekran; naliczanie depozytu od osoby; blokada przycisku „dalej" bez kompletu danych; dobór stolika do liczby gości; nieklikalność stolika zajętego |
| `e2e/guest-details-validation.spec.ts` | komunikaty walidacji imienia, e-maila, telefonu, kodu BLIK i zgody RODO; filtrowanie znaków w polu BLIK; formatowanie numeru karty i daty ważności; pełna płatność kartą zakończona potwierdzeniem |
| `e2e/staff-access.spec.ts` | logowanie każdej z trzech ról, odrzucenie błędnego PIN-u, ochrona tras przed niezalogowanym gościem, odbicie kelnera od panelu kierownika i administratora, dostęp administratora do wszystkich paneli, strona 404 |

Dwie reguły biznesowe, które testy pilnują wprost:

- **Dobór stolika do liczby gości** — stolik jest dostępny, gdy jego pojemność mieści się
  w przedziale `[liczba gości, liczba gości + 2]`. Czteroosobowy stolik nie zostanie
  zaproponowany szóstce, ośmioosobowy nie pójdzie pod parę.
- **Kontrola dostępu wg roli** — wejście pod adres powyżej swojej roli odsyła na `/login`,
  a ekran logowania rozpoznaje aktywną sesję i zawraca pracownika do jego własnego panelu.

Selektory opierają się na atrybutach `data-testid`, nie na klasach Tailwinda, więc zmiana
stylowania nie wywraca testów.

## Ciągła integracja

`.github/workflows/ci.yml` — przy każdym pushu i pull requeście na `main`: `npm ci`,
build produkcyjny, instalacja przeglądarki i pełny zestaw Playwrighta. Raport HTML
zostaje jako artefakt builda na 14 dni.

## Struktura

```
src/app/pages/        widoki: landing, menu, rezerwacja, panele personelu
src/app/components/   komponenty własne + biblioteka UI
src/app/routes.tsx    routing
supabase/functions/   funkcje serwerowe
utils/supabase/       klient i konfiguracja
e2e/                  testy end-to-end (fixtures.ts = wspólne kroki)
```

## Pochodzenie i zależności

Szkielet projektu powstał w Figma Make, a warstwa komponentów bazowych to
[shadcn/ui](https://ui.shadcn.com/) na licencji MIT. Widoki, proces rezerwacji, panele
personelu, routing, integracja z Supabase i wdrożenie są napisane samodzielnie.
Zdjęcia pochodzą z [Unsplash](https://unsplash.com/license). Pełna lista w
[ATTRIBUTIONS.md](ATTRIBUTIONS.md).
