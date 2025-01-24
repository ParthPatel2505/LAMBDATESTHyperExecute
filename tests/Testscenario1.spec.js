import {test, expect} from '@playwright/test'
import { LoginwithlambdatestUrl } from '../Pages/LoginwithlambdatestUrl'

test('testscenarios1', async ({page})=>{

const test1 = new LoginwithlambdatestUrl(page);
await test1.openLambdatest()
await test1.Simple_form_demo()
await test1.Single_input_field()

})