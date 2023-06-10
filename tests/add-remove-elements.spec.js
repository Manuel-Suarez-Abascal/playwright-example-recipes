const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/add_remove_elements/");
});

test("user can add & remove elements", async ({ page }) => {
    // gets the "Add Element" & clicks it
    const addButton = await page.getByRole('button', { name: 'Add Element' })
    await addButton.click();

    // checks if the added button element is visible & has the text "Delete"
    const addedElement = await page.getByRole('button', { name: 'Delete' })
    await expect(addedElement).toBeVisible();
    await expect(addedElement).toHaveText("Delete");

    // clicks the added button element & checks if it is not visible
    addedElement.click();
    await expect(addedElement).not.toBeVisible();
});