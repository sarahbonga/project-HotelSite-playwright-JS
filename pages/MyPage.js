class MyPage {

    constructor(page)
    {
        this.page = page;
        this.email = page.locator('#email');
        this.membership = page.locator('#rank');
        this.myPageTitle = page.getByText('MyPage');
        this.reservePage = page.locator('a[href="./plans.html"]');
    };

    // Method to navigate to the Reserve page
    async goToReservePage(){
        await this.reservePage.click();
        await this.page.waitForLoadState();
    };
};

module.exports = {MyPage}