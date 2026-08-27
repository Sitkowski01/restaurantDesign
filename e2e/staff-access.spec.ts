import { test, expect, loginAsStaff, STAFF } from "./fixtures";

test.describe("Logowanie pracownika", () => {
  test("kelner trafia do panelu sali", async ({ page }) => {
    await loginAsStaff(page, STAFF.waiter.name, STAFF.waiter.pin);

    await expect(page).toHaveURL(/\/staff-dashboard$/);
    await expect(page.getByText("Serwis wieczorny", { exact: true })).toBeVisible();
  });

  test("kierownik trafia do panelu kierownika", async ({ page }) => {
    await loginAsStaff(page, STAFF.manager.name, STAFF.manager.pin);
    await expect(page).toHaveURL(/\/manager$/);
  });

  test("administrator trafia do panelu administratora", async ({ page }) => {
    await loginAsStaff(page, STAFF.admin.name, STAFF.admin.pin);
    await expect(page).toHaveURL(/\/admin$/);
  });

  test("PIN przypisany do innej osoby nie loguje", async ({ page }) => {
    await loginAsStaff(page, STAFF.waiter.name, STAFF.admin.pin);

    await expect(page.getByTestId("login-error")).toContainText("Nieprawidłowe dane logowania.");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("puste imię i nazwisko zatrzymuje logowanie", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("staff-login-submit").click();

    await expect(page.getByTestId("login-error")).toContainText("Wpisz swoje imię i nazwisko.");
  });

  test("niepełny PIN zatrzymuje logowanie", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("staff-name").fill(STAFF.waiter.name);
    await page.getByTestId("pin-0").fill("1");
    await page.getByTestId("pin-1").fill("1");
    await page.getByTestId("staff-login-submit").click();

    await expect(page.getByTestId("login-error")).toContainText("Wpisz pełny 6-cyfrowy PIN.");
  });
});

test.describe("Dostęp do paneli według roli", () => {
  const guarded = ["/staff-dashboard", "/manager", "/admin"];

  for (const path of guarded) {
    test(`niezalogowany gość nie wejdzie na ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login$/);
    });
  }

  test("kelner odbija się od panelu kierownika i administratora", async ({ page }) => {
    await loginAsStaff(page, STAFF.waiter.name, STAFF.waiter.pin);
    await expect(page).toHaveURL(/\/staff-dashboard$/);

    // Strażnik trasy odsyła na /login, a ekran logowania rozpoznaje aktywną sesję
    // i zawraca pracownika do panelu przypisanego jego roli.
    await page.goto("/manager");
    await expect(page).toHaveURL(/\/staff-dashboard$/);

    await page.goto("/admin");
    await expect(page).toHaveURL(/\/staff-dashboard$/);
  });

  test("kierownik wchodzi do panelu sali, ale nie do administratora", async ({ page }) => {
    await loginAsStaff(page, STAFF.manager.name, STAFF.manager.pin);
    await expect(page).toHaveURL(/\/manager$/);

    await page.goto("/staff-dashboard");
    await expect(page).toHaveURL(/\/staff-dashboard$/);

    await page.goto("/admin");
    await expect(page).toHaveURL(/\/manager$/);
  });

  test("administrator ma dostęp do wszystkich trzech paneli", async ({ page }) => {
    await loginAsStaff(page, STAFF.admin.name, STAFF.admin.pin);
    await expect(page).toHaveURL(/\/admin$/);

    for (const path of guarded) {
      await page.goto(path);
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
  });

  test("zalogowany pracownik wchodzący na /login wraca do swojego panelu", async ({ page }) => {
    await loginAsStaff(page, STAFF.manager.name, STAFF.manager.pin);
    await expect(page).toHaveURL(/\/manager$/);

    await page.goto("/login");
    await expect(page).toHaveURL(/\/manager$/);
  });

  test("nieistniejący adres pokazuje stronę 404", async ({ page }) => {
    await page.goto("/nie-ma-takiej-strony");
    await expect(page.getByText("404")).toBeVisible();
  });
});
