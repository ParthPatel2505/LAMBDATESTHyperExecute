import {test, expect} from '@playwright/test'
import { Drag_dropSliders } from '../Pages/Drag_dropSliders'
import { LoginwithlambdatestUrl } from '../Pages/LoginwithlambdatestUrl'

test('testscenarios2', async ({page})=>{

const test1 = new LoginwithlambdatestUrl(page);
await test1.openLambdatest()

const test2 = new Drag_dropSliders(page);

await test2.draganddrop()
await test2.setvalue(95)


})