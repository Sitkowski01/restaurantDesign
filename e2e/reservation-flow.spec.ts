import { test, expect, pickDateAndTime, pickTable, fillGuestDetails, payWithBlik, acceptGdpr } from "./fixtures";

test.describe("Ścieżka rezerwacji", () => {
  test("@mobile gość przechodzi cztery kroki i dostaje potwierdzenie", async ({ page }) => {
    await pickDateAndTime(page, { partySize: 2, time: "19:00" });
    await pickTable(page, "O1");

    await fillGuestDetails(page, { firstName: "Anna", lastName: "Kowalczyk" });
    await payWithBlik(page, "123456");
    await acceptGdpr(page);
    await page.getByTestId("submit-reservation").click();

    await expect(page).toHaveURL(/\/confirmation$/);
    await expect(page.getByRole("heading", { name: "Rezerwacja potwierdzona" })).toBeVisible();

    // Dane wybrane w krokach 1–3 muszą dojechać do ostatniego ekranu.
    await expect(page.getByText("Z niecierpliwością czekamy na Ciebie, Anna.")).toBeVisible();
    await expect(page.getByText("2 Gości · Stolik O1")).toBeVisible();
    await expect(page.getByTestId("confirmation-time")).toHaveText("19:00");
    await expect(page.getByText("Depozyt pobrany: 60 zł")).toBeVisible();
  });

  test("depozyt liczy się od osoby, nie ryczałtem", async ({ page }) => {
    // 30 zł od osoby × 6 gości = 180 zł.
    await pickDateAndTime(page, { partySize: 6, time: "20:00" });
    await pickTable(page, "B1");

    await expect(page.getByText("Depozyt: 180 zł (30 zł × 6 osób)")).toBeVisible();

    await fillGuestDetails(page);
    await payWithBlik(page);
    await acceptGdpr(page);
    await page.getByTestId("submit-reservation").click();

    await expect(page.getByText("Depozyt pobrany: 180 zł")).toBeVisible();
    await expect(page.getByText("BLIK · 30 zł × 6 osób")).toBeVisible();
  });

  test("przycisk dalej jest nieaktywny, dopóki nie ma daty i godziny", async ({ page }) => {
    await page.goto("/reserve");

    const next = page.getByTestId("continue-to-tables");
    await expect(next).toBeDisabled();

    await page.getByTestId("date-option-0").click();
    await expect(next).toBeDisabled();

    await page.getByTestId("time-slot-19:00").click();
    await expect(next).toBeEnabled();
  });

  test("panel stolika pokazuje to, co gość kliknął na planie", async ({ page }) => {
    await pickDateAndTime(page, { partySize: 6, time: "21:00" });

    await page.getByTestId("table-B2").click();
    await expect(page.getByRole("heading", { name: "Stolik B2" })).toBeVisible();
    await expect(page.getByText("6 Gości")).toBeVisible();
    await expect(page.getByText("Popularne").first()).toBeVisible();
  });
});

test.describe("Plan sali", () => {
  test("stolik oznaczony jako zajęty nie daje się wybrać", async ({ page }) => {
    await pickDateAndTime(page, { partySize: 2 });

    const reserved = page.getByTestId("table-O3");
    await expect(reserved).toHaveAttribute("data-disabled", "true");

    await reserved.click({ force: true });
    // Brak zaznaczenia = panel po prawej nie pokazuje przycisku „KONTYNUUJ".
    await expect(page.getByTestId("continue-to-guest-details")).toHaveCount(0);
  });

  test("stoliki spoza pojemności dla liczby gości są wyłączone", async ({ page }) => {
    // Reguła z table-selection-page: pojemność >= liczba gości i <= liczba gości + 2.
    await pickDateAndTime(page, { partySize: 6 });

    // Boks 6-osobowy pasuje, czteroosobowy stolik przy oknie już nie.
    await expect(page.getByTestId("table-B1")).toHaveAttribute("data-disabled", "false");
    await expect(page.getByTestId("table-O1")).toHaveAttribute("data-disabled", "true");
    // Ośmioosobowy mieści się w górnym progu (6 + 2).
    await expect(page.getByTestId("table-S5")).toHaveAttribute("data-disabled", "false");
  });
});
