class PlanPage {

    constructor(page)
    {
        this.page = page;
        this.planList = page.locator('#plan-list');
    };
    
    // Method to select a specific plan by its plan name 
    async selectPlan(planName)
    {
        const plan = await this.planList.locator('.card-title').filter({hasText: planName});
        const planReserveButton = await plan.locator('..').locator('.btn');
        await planReserveButton.click();
        await this.page.waitForLoadState();
    };
};

module.exports = {PlanPage}