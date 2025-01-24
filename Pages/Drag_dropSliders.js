exports.Drag_dropSliders = 
class Drag_dropSliders {

    constructor(page){
        this.page = page;
        this.drag_drop = "//a[normalize-space()='Drag & Drop Sliders']"
        this.slidericon = "//input[@value='15']"
        this.displayedvalue = "//output[@id='range']";
    }

    async draganddrop(){
        await this.page.locator(this.drag_drop).click()
       // await this.page.waitForTimeout(10000);
    }

    async setvalue(targetValue){
        const slider = this.page.locator(this.slidericon);
        await slider.waitFor({ state: 'visible' });

       
        const sliderBox = await slider.boundingBox();
        if (!sliderBox) {
            throw new Error("Slider button is not found");
        }

        const { x, y, width } = sliderBox;
        const startValue = 15; 
        const steps = targetValue - startValue; 

       
        const moveX = (steps / 100) * width;

        await this.page.mouse.move(x + width / 2, y + sliderBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(x + width / 2 + moveX, y + sliderBox.height / 2);
        await this.page.mouse.up();
        //await this.page.waitForTimeout(10000);

        const displayedValue = await this.page.locator(this.displayedvalue).textContent();
             if (displayedValue === targetValue) 
                {
                  console.log("Slider is set");
                } else 
                    {
                     console.log("Slider is not set");
                    }
    }
    

}