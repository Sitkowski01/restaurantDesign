import { defineConfig, devices } from "@playwright/test";

/**
 * Testy chodzą po zbudowanej aplikacji (`vite preview`), nie po serwerze deweloperskim —
 * to ta sama paczka, która ląduje na produkcji, więc test łapie też błędy powstałe
 * dopiero przy budowaniu.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
  timeout: 30_000,
  expect: { timeout: 7_000 },

  use: {
    baseURL: "http://localhost:4173",
    locale: "pl-PL",
    timezoneId: "Europe/Warsaw",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      // Na telefonie sprawdzamy tylko ścieżkę krytyczną — testy oznaczone @mobile.
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
      grep: /@mobile/,
    },
  ],

  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
