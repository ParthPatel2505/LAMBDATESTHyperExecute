exports.Formfilling = 
class Formfilling {

    constructor(page){
        this.page = page;
        this.input_form = "//a[normalize-space()='Input Form Submit']";
        this.submit_button = "//button[normalize-space()='Submit']";
        this.error_message = "//p[contains(text(),'Please fill in the fields')]";
        this.name_field = "//input[@id='name']";
        this.email_field = "//input[@id='inputEmail4']";
        this.password_field = "//input[@id='inputPassword4']";
        this.company_field = "//input[@id='company']";
        this.website_field = "//input[@id='websitename']";
        this.country_dropdown = "//select[@name='country']";
        this.city_field = "//input[@id='inputCity']";
        this.address1_field = "//input[@id='inputAddress1']";
        this.address2_field = "//input[@id='inputAddress2']";
        this.state_field = "//input[@id='inputState']";
        this.zip_field = "//input[@id='inputZip']";
        this.success_message = "//p[@class='success-msg hidden']";
    }
    

    async inputform(){
        await this.page.locator(this.input_form).click()
    }

    async submitWithoutFilling() {
        await this.page.locator(this.submit_button).click();
        

        const errorVisible = await this.page.locator(this.error_message).isVisible();
        if (errorVisible) {
            console.log("message is displayed");
        } else {
            console.log("message not displayed");
        }
    }

    async fillFormAndSubmit() {
        
        await this.page.locator(this.name_field).fill("Parth");
        await this.page.locator(this.email_field).fill("parth.patel@tntra.io");
        await this.page.locator(this.password_field).fill("parth123");
        await this.page.locator(this.company_field).fill("LambdaTest");
        await this.page.locator(this.website_field).fill("www.lambdatest.com");

        await this.page.locator(this.country_dropdown).selectOption({ label: "United States" });

        await this.page.locator(this.city_field).fill("Vadodara");
        await this.page.locator(this.address1_field).fill("Waghodiaroad");
        await this.page.locator(this.address2_field).fill("A1");
        await this.page.locator(this.state_field).fill("Gujarat");
        await this.page.locator(this.zip_field).fill("390025");

        await this.page.locator(this.submit_button).click();
        //await this.page.locator(this.success_message).waitFor({ state: 'visible' });

        const successVisible = await this.page.locator(this.success_message).isVisible();
        if (successVisible) {
            console.log("Success message displayed");
        } else {
            console.log("Success message not displayed.");
        }
    }


}
