class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.userEmail = page.locator('#email');
        this.userPassword = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.emailMsg = page.locator('#email-message');
        this.passwordMsg = page.locator('#password-message');
    };

    // Method to perform user login
    async userLogin(username, password)
    {
        await this.userEmail.type(username);
        await this.userPassword.type(password);
        await this.loginButton.click();
        await this.page.waitForLoadState();
    };
};

module.exports = {LoginPage}