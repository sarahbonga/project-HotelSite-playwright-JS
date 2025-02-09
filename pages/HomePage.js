class HomePage {

    constructor(page)
    {
        this.page = page;
        this.englishTopPage = page.locator('a[href="./en-US/"]');
        this.loginPage = page.locator('a[role="button"]');
    };

    // Method to navigate to the hotel site in English
    async goToHotelSite_EN(){
        await this.page.goto("https://hotel-example-site.takeyaqa.dev/");
        await this.englishTopPage.click();
        await this.page.waitForLoadState();
    };

    // Method to navigate to the login page
    async goToLoginPage(){
        await this.loginPage.click();
        await this.page.waitForLoadState();
    };
};

module.exports = {HomePage}