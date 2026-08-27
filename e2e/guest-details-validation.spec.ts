import { test, expect, goToGuestDetails, fillGuestDetails, payWithBlik, acceptGdpr } from "./fixtures";

test.describe("Walidacja danych gościa", () => {
  test.beforeEach(async ({ page }) => {
    await goToGuestDetails(page, { partySize: 2, time: "19:00", table: "O1" });
  });

  test("pusty formularz nie przepuszcza dalej", async ({ page }) => {
    await page.getByTestId("submit-reservation").click();

    await expect(page.getByTestId("form-error")).toHaveText("Proszę podać swoje pełne imię i nazwisko.");
    await expect(page).toHaveURL(/\/guest-details$/);
  });

  test("adres e-mail bez małpy jest odrzucany", async ({ page }) => {
    await fillGuestDetails(page, { email: "anna.kowalczyk.example.com" });
    await page.getByTestId("submit-reservation").click();

    await expect(page.getByTestId("form-error")).toHaveText("Proszę podać prawidłowy adres e-mail.");
  });

  test("numer telefonu krótszy niż 6 znaków jest odrzucany", async ({ page }) => {
    await fillGuestDetails(page, { phone: "12345" });
    await page.getByTestId("submit-reservation").click();

    await expect(page.getByTestId("form-error")).toHaveText("Proszę podać prawidłowy numer telefonu.");
  });

  test("kod BLIK musi mieć sześć cyfr", async ({ page }) => {
    await fillGuestDetails(page);
    await payWithBlik(page, "123");
    await acceptGdpr(page);
    await page.getByTestId("submit-reservation").click();

    await expect(page.getByTestId("form-error")).toHaveText("Proszę podać prawidłowy 6-cyfrowy kod BLIK.");
  });

  test("pole BLIK przyjmuje wyłącznie cyfry i najwyżej sześć", async ({ page }) => {
    await page.getByTestId("payment-method-blik").click();
    const blik = page.getByPlaceholder("000 000");

    // Litery wpisane z klawiatury nie zostają w polu.
    await blik.fill("12ab34");
    await expect(blik).toHaveValue("1234");

    // Dłuższy ciąg cyfr jest ucinany do sześciu.
    await blik.fill("1234567890");
    await expect(blik).toHaveValue("123456");
  });

  test("brak zgody na przetwarzanie danych blokuje rezerwację", async ({ page }) => {
    await fillGuestDetails(page);
    await payWithBlik(page);
    // Świadomie nie klikamy zgody.
    await page.getByTestId("submit-reservation").click();

    await expect(page.getByTestId("form-error")).toHaveText(
      "Proszę zaakceptować politykę prywatności, aby kontynuować."
    );
    await expect(page).toHaveURL(/\/guest-details$/);
  });
});

test.describe("Płatność kartą", () => {
  test.beforeEach(async ({ page }) => {
    await goToGuestDetails(page, { partySize: 2, time: "19:00", table: "O1" });
    await fillGuestDetails(page);
    await page.getByTestId("payment-method-card").click();
  });

  test("numer karty jest formatowany w grupy po cztery i ucinany do szesnastu cyfr", async ({ page }) => {
    const cardNumber = page.getByPlaceholder("4242 4242 4242 4242");
    await cardNumber.fill("42424242424242429999");
    await expect(cardNumber).toHaveValue("4242 4242 4242 4242");

    const expiry = page.getByPlaceholder("MM/RR");
    await expiry.fill("1229");
    await expect(expiry).toHaveValue("12/29");
  });

  test("niepełny numer karty zatrzymuje wysyłkę", async ({ page }) => {
    await page.getByPlaceholder("4242 4242 4242 4242").fill("4242 4242");
    await acceptGdpr(page);
    await page.getByTestId("submit-reservation").click();

    await expect(page.getByTestId("form-error")).toHaveText("Proszę podać prawidłowy numer karty (16 cyfr).");
  });

  test("karta z kompletem danych przechodzi do potwierdzenia", async ({ page }) => {
    await page.getByPlaceholder("4242 4242 4242 4242").fill("4242424242424242");
    await page.getByPlaceholder("MM/RR").fill("1229");
    await page.getByPlaceholder("123", { exact: true }).fill("123");
    await page.getByPlaceholder("Jan Kowalski").fill("Anna Kowalczyk");
    await acceptGdpr(page);
    await page.getByTestId("submit-reservation").click();

    await expect(page).toHaveURL(/\/confirmation$/);
    await expect(page.getByText("Karta •••• 4242")).toBeVisible();
  });
});
