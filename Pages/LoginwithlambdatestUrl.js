exports.LoginwithlambdatestUrl = 
class LoginwithlambdatestUrl {

    constructor(page){
        this.page = page;
        this.simple_form = "//a[normalize-space()='Simple Form Demo']";
        this.input1 = "//input[@id='user-message']";
        this.get_checked_value = "//button[@id='showInput']";
        this.text_message = "//p[@id='message']";

    }

    async openLambdatest(){
        await this.page.goto("https://www.lambdatest.com/selenium-playground/");
    }

    async Simple_form_demo(){

        await this.page.locator(this.simple_form).click();
        const currentURL = this.page.url();
             if (currentURL.includes('simple-form-demo')) 
                {
                  console.log('Matched URL');
                } else 
                    {
                        console.log('URL is not matched');
                    }
    }

    async Single_input_field(){
        const message = 'Welcome to LambdaTest';
        await this.page.locator(this.input1).fill(message)
        await this.page.locator(this.get_checked_value).click()
        await this.page.locator(this.text_message).waitFor({ state: 'visible' });

        const displayedMessage = await this.page.locator(this.text_message).textContent();
            if (displayedMessage === message) 
                {
                    console.log('Message is matched');
                } else 
                    {
                        console.log('Message is not matched');
                    }
    }
}