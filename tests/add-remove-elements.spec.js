const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/add_remove_elements/");
});

test("user can add & remove elements", async ({ page }) => {
    const addButton = await page.getByRole('button', { name: 'Add Element' })
    await addButton.click();

    const addedElement = await page.getByRole('button', { name: 'Delete' })
    await expect(addedElement).toBeVisible();
    await expect(addedElement).toHaveText("Delete");

    addedElement.click();
    await expect(addedElement).not.toBeVisible();
});