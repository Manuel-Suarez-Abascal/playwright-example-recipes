// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
});

const validCredentials = {
    username: "tomsmith",
    password: "SuperSecretPassword!"
};


test.describe("Login", () => {
    test("should login with valid credentials", async ({ page }) => {
        const { username, password } = validCredentials;

        const usernameInput = await page.locator("#username");
        const passwordInput = await page.locator("#password");
        

        await usernameInput.type(username);
        await passwordInput.type(password);

        const submitButton = await page.locator("button[type='submit']");
        await submitButton.click();

        const successMessage = await page.locator("#flash");
        await expect(successMessage).toHaveText("You logged into a secure area! ×");
    });
});

//   test('should allow me to add todo items', async ({ page }) => {
//     // create a new todo locator
//     const newTodo = page.getByPlaceholder('What needs to be done?');

//     // Create 1st todo.
//     await newTodo.fill(TODO_ITEMS[0]);
//     await newTodo.press('Enter');

//     // Make sure the list only has one todo item.
//     await expect(page.getByTestId('todo-title')).toHaveText([
//       TODO_ITEMS[0]
//     ]);

//     // Create 2nd todo.
//     await newTodo.fill(TODO_ITEMS[1]);
//     await newTodo.press('Enter');

//     // Make sure the list now has two todo items.
//     await expect(page.getByTestId('todo-title')).toHaveText([
//       TODO_ITEMS[0],
//       TODO_ITEMS[1]
//     ]);

//     await checkNumberOfTodosInLocalStorage(page, 2);
//   });

//   test('should clear text input field when an item is added', async ({ page }) => {
//     // // create a new todo locator
//     // const newTodo = page.getByPlaceholder('What needs to be done?');

//     // // Create one todo item.
//     // await newTodo.fill(TODO_ITEMS[0]);
//     // await newTodo.press('Enter');

//     // // Check that input is empty.
//     // await expect(newTodo).toBeEmpty();
//     // await checkNumberOfTodosInLocalStorage(page, 1);
//   });

//   test('should append new items to the bottom of the list', async ({ page }) => {
//     // // Create 3 items.
//     // await createDefaultTodos(page);

//     // // create a todo count locator
//     // const todoCount = page.getByTestId('todo-count')
  
//     // // Check test using different methods.
//     // await expect(page.getByText('3 items left')).toBeVisible();
//     // await expect(todoCount).toHaveText('3 items left');
//     // await expect(todoCount).toContainText('3');
//     // await expect(todoCount).toHaveText(/3/);

//     // // Check all items in one call.
//     // await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
//     // await checkNumberOfTodosInLocalStorage(page, 3);
//   });
// });