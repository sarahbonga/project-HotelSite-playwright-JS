class ReservePage {

    constructor(page) {
        this.page = page;
        this.checkin = page.locator('#date');
        this.stay = page.locator('#term');
        this.calendar = page.locator('#ui-datepicker-div');
        this.calendarMonth = page.locator('.ui-datepicker-month');
        this.calendarYear = page.locator('.ui-datepicker-year');
        this.calendarArrow = page.locator('.ui-icon.ui-icon-circle-triangle-e');
        this.guest = page.locator('#head-count');
        this.breakfast = page.locator('#breakfast');
        this.earlycheckin = page.locator('#early-check-in');
        this.sightseeing = page.locator('#sightseeing');
        this.name = page.locator('#username');
        this.confirmation = page.locator('#contact');
        this.email = page.locator('#email');
        this.tel = page.locator('#tel');
        this.specialrequest = page.locator('#comment');
        this.totalBill = page.locator('#total-bill');
        this.confirmBtn = page.locator('#submit-button');
    };

    // Function to calculate the difference between the check-in date and the current date in months and days
    getDateDifference(checkinDate){
        const today = new Date(); // Current date

        // Split the check-in date using format : YYYY/MM/DD
        const [testData_year, testData_month, testData_date] = checkinDate.split("/");

        // Convert the check-in date into a Date object
        const checkinDate_Date = new Date(testData_year, testData_month - 1, testData_date);

        // Calculate the difference in time (in milliseconds)
        const timeDifference = checkinDate_Date - today;

        // Convert time difference to days (milliseconds to days)
        const dayDifference = timeDifference / (1000 * 3600 * 24);

        // Calculate the difference in months (based on year and month)
        const monthDifference = checkinDate_Date.getMonth() - today.getMonth();
        
        return {monthDifference, dayDifference};
    };

    // Method to select the check-in date from the calendar
    async selectDate(checkinDate) {
        const { monthDifference, dayDifference } = this.getDateDifference(checkinDate);

        // Check if the check-in date is more than 3 months away or in the past, if so, throws an error
        if (dayDifference > 90) {
            throw new Error(`The check-in date ${checkinDate} is more than 3 months away. Exit test`);
        } else if (dayDifference < 0) {
            throw new Error(`The check-in date ${checkinDate} has already passed. Exit test`);
        };

        await this.page.waitForLoadState();
        await this.checkin.click();

        // Navigate to the correct month
        if (monthDifference > 0 && monthDifference <= 3) {
            for (let i = 0; i < monthDifference; i++) {
                await this.calendarArrow.click();
            }
        };
        
        const [, , testDataDate] = checkinDate.split("/");
        await this.calendar.getByText(testDataDate).click();
        await this.page.waitForLoadState();

    };

    // Method to select whether breakfast is included
    async selectBreakfast(isBreakfast) {
        if (isBreakfast === 'Yes') {
            await this.breakfast.setChecked(true);
            await this.page.waitForLoadState();
        };
    };

    // Method to select whether early checkin is included
    async selectEarlyCheckIn(isEarlyCheckIn) {
        if (isEarlyCheckIn === 'Yes') {
            await this.earlycheckin.setChecked(true);
            await this.page.waitForLoadState();
        };
    };

    // Method to select whether sightseeing is included
    async selectSighseeing(isSightseeing) {
        if (isSightseeing === 'Yes') {
            await this.sightseeing.setChecked(true);
            await this.page.waitForLoadState();
        };
    };

    // Method to select the confirmation method
    async selectConfirmation(confirmation) {
        await this.confirmation.selectOption({ label: confirmation });
        await this.page.waitForLoadState();
    };

    // Method to get the total bill displayed on the page
    async getTotalBill() {
        return await this.totalBill.textContent();
    };

    // Method to confirm the reservation
    async confirmReservation() {
        await this.confirmBtn.click();
        await this.page.waitForLoadState();
    };
};

module.exports = { ReservePage }