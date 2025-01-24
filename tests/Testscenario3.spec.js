import {test, expect} from '@playwright/test'
import { Formfilling } from '../Pages/Formfilling'
import { LoginwithlambdatestUrl } from '../Pages/LoginwithlambdatestUrl'

test('testscenarios3', async ({page})=>{

const test1 = new LoginwithlambdatestUrl(page);
await test1.openLambdatest()

const test2 = new Formfilling(page);

await test2.inputform()
await test2.submitWithoutFilling()
await test2.fillFormAndSubmit()


})