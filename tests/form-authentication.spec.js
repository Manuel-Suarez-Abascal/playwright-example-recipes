// @ts-check
const { test, expect } = require('@playwright/test');

// these credentials are used for login tests & are not secret
const credentials = {
    username: "tomsmith",
    password: "SuperSecretPassword!",
    invalidUsername: "johndoe",
    invalidPassword: "NotSuperSecretPassword!"
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
    await page.goto("/login");
});

test.describe("Login", () => {
    const { username, password, invalidUsername, invalidPassword } = credentials;
    test("user should login with valid credentials", async ({ page }) => {
        await loginThroughUI({ page, username, password });
        await verifyLoginMessage({ page, messageElementLocator: "#flash", message: "You logged into a secure area! ×" });
    });

    test("user can't login with invalid username", async ({ page }) => {
        await loginThroughUI({ page, username: invalidUsername, password });
        await verifyLoginMessage({ page, messageElementLocator: "#flash", message: "Your username is invalid! ×" });
    });

    test("user can't login with invalid password", async ({ page }) => {
        await loginThroughUI({ page, username, password: invalidPassword });
        await verifyLoginMessage({ page, messageElementLocator: "#flash", message: "Your password is invalid! ×" });
    });
});
