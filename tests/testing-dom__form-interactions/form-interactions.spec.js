// @ts-check
const { test, expect } = require('@playwright/test');

const validCredentials = {
    username: "tomsmith",
    password: "SuperSecretPassword!"
};

// function to login
const loginThroughUI = async ( { page, username, password }) => {
    const usernameInput = await page.locator("#username")
    const passwordInput = await page.locator("#password")

    await usernameInput.type(username);
    await passwordInput.type(password);

    const submitButton = await page.locator("button[type='submit']");
    await submitButton.click();
};

// function to verify message after login
const verifyLoginMessage = async ( { page, messageElementLocator, message }) => {
    const messageElement = await page.locator(messageElementLocator);
    await expect(messageElement).toHaveText(message);
};

test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
});

test.describe("Login", () => {
    test("should login with valid credentials", async ({ page }) => {
        const { username, password } = validCredentials;

        await loginThroughUI({ page, username, password });
        await verifyLoginMessage({ page, messageElementLocator: "#flash", message: "You logged into a secure area! ×" });
    });
});
