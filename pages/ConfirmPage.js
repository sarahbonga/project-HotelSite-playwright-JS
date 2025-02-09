class ConfirmPage {

    constructor(page)
    {
        this.page = page;
        this.totalBill = page.locator('#total-bill');
        this.planname = page.locator('#plan-name');
        this.date = page.locator('#term');
        this.guest = page.locator('#head-count');
        this.plans = page.locator('#plans');
        this.name = page.locator('#username');
        this.confirmation = page.locator('#contact');
        this.specialrequest = page.locator('#comment');
        this.submitreservation = page.locator('.btn.btn-primary.btn-block.my-3');

        // Locators for Success Message
        this.closeButton = page.locator('.btn.btn-success');
        this.thankyouMsg = page.locator('.modal-header');
        this.weLookForwardMsg = page.locator('div[class="modal-body"] p');
    };

    // Method to click on the submit reservation button
    async clickSubmitReservation(){
        await this.submitreservation.click();
        await this.page.waitForLoadState();
    };
    
    // Method to click on the close button of Success Message
    async clickCloseButton(){
        await this.closeButton.click();
        await this.page.waitForLoadState();
    };
};

module.exports = {ConfirmPage}