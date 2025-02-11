class MyPage {

    constructor(page)
    {
        this.page = page;
        this.email = page.locator('#email');
        this.membership = page.locator('#rank');
        this.myPageTitle = page.getByText('MyPage');
        this.planPage = page.locator('a[href="./plans.html"]');
    };

    // Method to navigate to the Plan page
    async goToPlanPage(){
        await this.planPage.click();
        await this.page.waitForLoadState();
    };
};

module.exports = {MyPage}
