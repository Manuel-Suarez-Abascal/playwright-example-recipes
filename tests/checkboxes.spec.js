const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/checkboxes");
});

test("user can check & uncheck checkboxes", async ({ page }) => {
    const checkbox1 = await page.getByRole('checkbox').first();
    const checkbox2 = await page.getByRole('checkbox').last();

    // asserting the checkboxes initial expected state
    expect(await checkbox1.isChecked()).toBe(false);
    expect(await checkbox2.isChecked()).toBe(true);

    // checking & unchecking the checkboxes
    await checkbox1.check();
    await checkbox2.uncheck();

    // asserting the checkboxes final expected state
    expect(await checkbox1.isChecked()).toBe(true);
    expect(await checkbox2.isChecked()).toBe(false);
});
