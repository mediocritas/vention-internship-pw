import { test as base } from "@playwright/test"
import { closePage, setPage } from "../page-utils"


export type TestOptions = {
    testHooks: string
}

export const test = base.extend<TestOptions>({

    testHooks: [async ({ page }, use) => {
        setPage(page);
        await use('');
        await closePage();
    }, { auto: true }]
})