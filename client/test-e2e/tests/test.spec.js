// @ts-check
const { test, expect } = require("@playwright/test");

test("participation jeu concours", async ({ page }) => {
  await page.goto("https://tiptop-snowy.vercel.app/");
  // await page.goto("https://www.dsp5-archi-o22b-4-5-g1.com/");
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'J\'accepte' }).click();
  await page.getByRole("button", { name: "Participer" }).click();
  await page.getByRole("link", { name: "Connexion" }).click();

  await page.waitForTimeout(1000);

  await page.getByPlaceholder("Votre email").click();
  await page.getByPlaceholder("Votre email").fill("user@mail.com");
  await page.getByPlaceholder("Votre mot de passe").click();
  await page.getByPlaceholder("Votre mot de passe").fill("Password@2024");
  await page.getByRole("button", { name: "Connexion" }).click();

  await page.waitForTimeout(1000);

  await page.getByRole("link", { name: "Jouer" }).click();
  await page.getByPlaceholder("Code ticket").click();
  await page.getByPlaceholder("Code ticket").fill("ticket_3");
  await page.getByPlaceholder('Code ticket').press('Enter');
  await page.getByRole("button", { name: "Jouer" }).click();
  await page.getByPlaceholder('Code ticket').press('Enter');

  await page.waitForTimeout(1000);
});
