const { test, expect } = require('@playwright/test');
const { ValidUserAccount, InvalidUserAccount } = require('../utils/jsonReader');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { MyPage } = require('../pages/MyPage');

test.describe('User Log-in Tests', () => {
    let homePage;
    let loginPage;
    let myPage;

    test.beforeEach(async ({ page }) => {
        // Create Page objects
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        myPage = new MyPage(page);

        //Navigate to the hotel site and go to the login page
        await homePage.goToHotelSite_EN();
        await homePage.goToLoginPage();
    });

    for (const user of ValidUserAccount) {
        test(`Verify Log-in with Valid User Account ${user.email}`, async ({ page }) => {
            // User Log-in with provided email and password
            await loginPage.userLogin(user.email, user.password);

            // Verify that the email and membership information is correct on MyPage after successful login
            expect(await myPage.email.textContent()).toContain(user.email);
            expect(await myPage.membership.textContent()).toContain(user.membership);
        });
    };

    for (const user of InvalidUserAccount) {
        test(`Verify Log-in with Invalid User Account ${user.errorType}`, async ({ page }) => {
            // User Log-in with invalid credentials
            await loginPage.userLogin(user.email, user.password);

            //Verify error message based on the type of error
            if (user.errorType === "InvalidEmail" || user.errorType === "BlankEmail") {
                await expect(await loginPage.emailMsg).not.toBeEmpty();
                expect(await loginPage.emailMsg.textContent()).toContain(user.errorMsg);
            } else if (user.errorType === "InvalidPassword" || user.errorType === "BlankPassword") {
                await expect(await loginPage.passwordMsg).not.toBeEmpty();
                expect(await loginPage.passwordMsg.textContent()).toContain(user.errorMsg);
            };

            // Verify log-in is not successful by checking MyPage element is not visible
            await expect(await myPage.myPageTitle).not.toBeVisible();
        });
    };
});
