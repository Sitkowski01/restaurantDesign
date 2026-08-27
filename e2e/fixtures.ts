import { test as base, expect, Page } from "@playwright/test";

/**
 * Baner cookie wjeżdża po 1,5 s i jest przyklejony do dołu ekranu (z-index 70),
 * przez co potrafi przykryć przyciski w stopce widoku. Zgodę wstrzykujemy
 * przed załadowaniem strony, żeby testy sprawdzały rezerwację, a nie banner.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("lmd-cookie-consent", "accepted");
    });
    await use(page);
  },
});

export { expect };

export type ReservationOptions = {
  partySize?: number;
  time?: string;
  table?: string;
};

/** Krok 1: „/" → „/reserve" → wybór liczby gości, daty i godziny. */
export async function pickDateAndTime(page: Page, opts: ReservationOptions = {}) {
  const { partySize = 2, time = "19:00" } = opts;

  await page.goto("/");
  await page.getByTestId("hero-reserve-cta").click();
  await expect(page).toHaveURL(/\/reserve$/);

  await page.getByTestId(`party-size-${partySize}`).click();
  await page.getByTestId("date-option-0").click();
  await page.getByTestId(`time-slot-${time}`).click();
  await page.getByTestId("continue-to-tables").click();
  await expect(page).toHaveURL(/\/select-table$/);
}

/** Krok 2: wybór stolika na planie sali. */
export async function pickTable(page: Page, table = "O1") {
  await page.getByTestId(`table-${table}`).click();
  await page.getByTestId("continue-to-guest-details").click();
  await expect(page).toHaveURL(/\/guest-details$/);
}

/** Kroki 1–2 razem — dojście do formularza danych gościa. */
export async function goToGuestDetails(page: Page, opts: ReservationOptions = {}) {
  await pickDateAndTime(page, opts);
  await pickTable(page, opts.table ?? "O1");
}

export type Guest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

/** Krok 3: wypełnienie danych gościa (bez wysyłki). */
export async function fillGuestDetails(page: Page, guest: Guest = {}) {
  const {
    firstName = "Anna",
    lastName = "Kowalczyk",
    email = "anna.kowalczyk@example.com",
    phone = "+48 500 123 456",
  } = guest;

  await page.getByPlaceholder("Jan", { exact: true }).fill(firstName);
  await page.getByPlaceholder("Kowalski", { exact: true }).fill(lastName);
  await page.getByPlaceholder("jan@example.com").fill(email);
  await page.getByPlaceholder("+48 500 123 456").fill(phone);
}

/** Depozyt przez BLIK — domyślna metoda płatności. */
export async function payWithBlik(page: Page, code = "123456") {
  await page.getByTestId("payment-method-blik").click();
  await page.getByPlaceholder("000 000").fill(code);
}

export async function acceptGdpr(page: Page) {
  await page.getByTestId("gdpr-consent").click();
}

/** Logowanie pracownika: imię i nazwisko + 6-cyfrowy PIN. */
export async function loginAsStaff(page: Page, name: string, pin: string) {
  await page.goto("/login");
  await page.getByTestId("staff-name").fill(name);
  for (let i = 0; i < pin.length; i++) {
    await page.getByTestId(`pin-${i}`).fill(pin[i]);
  }
  await page.getByTestId("staff-login-submit").click();
}

export const STAFF = {
  waiter: { name: "Jan Kowalski", pin: "111111" },
  manager: { name: "Magdalena Dąbrowska", pin: "666666" },
  admin: { name: "Mikołaj Sitek", pin: "000000" },
} as const;
