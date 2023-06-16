const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/broken_images");
});

test("user can verify the image loading properly", async ({ page }) => {
    // get all images on the page
    const images = await page.getByRole('img').all();

    // asserts first & second images are broken cause "natureWidth" is 0
    expect(await images[1].evaluate((node) => node.naturalWidth)).toBe(0);
    expect(await images[2].evaluate((node) => node.naturalWidth)).toBe(0);

    // asserts fourth image loads properly cause "natureWidth" is higher than 0
    expect(await images[3].evaluate((node) => node.naturalWidth)).toBeGreaterThan(0);
});
