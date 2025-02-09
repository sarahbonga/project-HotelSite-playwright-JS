const { test, expect } = require('@playwright/test');
const { E2E_TestData } = require('../utils/csvReader');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { MyPage } = require('../pages/MyPage');
const { PlanPage } = require('../pages/PlanPage');
const { ReservePage } = require('../pages/ReservePage');
const { ConfirmPage } = require('../pages/ConfirmPage');

test.describe('E2E Booking Reservation Tests', () => {
    for (const testData of E2E_TestData) {
        test(`Verify Test Case# ${testData.testCaseNo} for ${testData.testObjective}`, async ({ browser }) => {
            // Create a new browser context and page
            const context = await browser.newContext();
            const page = await context.newPage();

            // Create page objects
            const homePage = new HomePage(page);
            const loginPage = new LoginPage(page);
            const myPage = new MyPage(page);
            const planPage = new PlanPage(page);

            //Navigate to Hotel Site and Log-in
            await homePage.goToHotelSite_EN();
            await homePage.goToLoginPage();
            await loginPage.userLogin(testData.email, testData.password);

            //Go to Reserve Page after Log-in
            await myPage.goToReservePage();

            // Verify the desired plan is available on the plan page
            await expect(await planPage.planList.locator('.card-title').filter({ hasText: testData.planName })).toHaveCount(1);

            // Select the desired plan, wait for the new page to load
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),  // Wait for the page to open
                planPage.selectPlan(testData.planName)  // Select the plan
            ]);

            // Create page objects for the new page that appears after plan selection
            const reservePage = new ReservePage(newPage);
            const confirmPage = new ConfirmPage(newPage);

            // Select Check-in Date
            await reservePage.selectDate(testData.checkinDate);

            // Select additional options (breakfast, early check-in, sightseeing)
            await reservePage.selectBreakfast(testData.breakfast);
            await reservePage.selectEarlyCheckIn(testData.earlyCheckin);
            await reservePage.selectSighseeing(testData.sightseeing);

            // Select Confirmation Method
            await reservePage.selectConfirmation(testData.confirmationMethod);

            // Verify the total cost of the reservation
            expect(await reservePage.getTotalBill()).toContain(testData.totalCost);

            // Confirm the reservation on the reserve page
            await reservePage.confirmReservation();

            // Verify the confirmation page details
            expect(await confirmPage.planname.textContent()).toContain(testData.planName);
            expect(await confirmPage.totalBill.textContent()).toContain(testData.totalCost);

            // Verify the confirmation page - additional plan details
            if (testData.breakfast === "Yes"){
                expect(await confirmPage.plans.locator('li').filter({ hasText: "Breakfast" })).toBeVisible();
            };
            if (testData.earlyCheckin === "Yes"){
                expect(await confirmPage.plans.locator('li').filter({ hasText: "Early check-in" })).toBeVisible();
            };
            if (testData.sightseeing === "Yes"){
                expect(await confirmPage.plans.locator('li').filter({ hasText: "Sightseeing" })).toBeVisible();
            };

            // Verify the confirmation method (email or none)
            if (testData.confirmationMethod === "By email") {
                expect(await confirmPage.confirmation.textContent()).toContain("Email");
            } else if (testData.confirmationMethod === "By telephone") {
                expect(await confirmPage.confirmation.textContent()).toContain("Tel");
            } else if (testData.confirmationMethod === "None") {
                expect(await confirmPage.confirmation.textContent()).toContain("not required");
            };

            // Submit the reservation and validate success message
            await confirmPage.clickSubmitReservation();
            expect(await confirmPage.thankyouMsg.textContent()).toContain("Thank you for reserving.");
            expect(await confirmPage.weLookForwardMsg.textContent()).toContain("We look forward to visiting you.");

            // Close the confirmation page after the reservation is complete
            await confirmPage.clickCloseButton();
        });

    };
});