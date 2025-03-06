import { test as base } from "@playwright/test"
import { closePage, setPage } from "../page-utils"
import { setupEventListeners } from '../event-listener';
import path from "path";
import { createTextFile, deleteFile } from "../../utils/temp-files-helper";


export type TestOptions = {
    testHooks: string
}

export type TestFile = {
    fileName: string,
    filePath: string
}

export const test = base.extend<TestOptions, { testFile: TestFile }>({

    testFile: [async ({ }, use) => {
        const testFilePath = path.resolve('.artefacts/');
        const testFile = await createTextFile(testFilePath);
        await use(testFile);
    }, { scope: 'worker' }],

    testHooks: [async ({ page, testFile }, use) => {
        setPage(page);
        setupEventListeners(testFile);
        await use('');
        if (test.info().errors.length === 0) {
            await deleteFile(testFile!.filePath);
        }
        await closePage();
    }, { auto: true }],

})