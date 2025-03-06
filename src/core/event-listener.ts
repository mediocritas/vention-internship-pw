import { getPage } from "./page-utils";
import { Frame } from "playwright/test";
import { TestFile } from "./fixtures/page-fixture";

export const setupEventListeners = (testFile: TestFile) => {
    let page = getPage();
    page.on('close', async () => {
        console.log('Page was closed');
    });
    page.on('pageerror', error => {
        console.error(`Error ${error.name}, ${error.message}`)
    })
    page.on('dialog', dialog => {
        console.log(`Dialog opened: ${dialog.message()}`);
        dialog.accept()
    });
    page.on('filechooser', async (fileChooser) => {
        await fileChooser.setFiles(testFile!.filePath);
    });
    page.on('framedetached', (frame: Frame) => {
        console.log(`Frame detached: ${frame.url()}`);
    });
    page.on('framenavigated', (frame: Frame) => {
        console.log(`Frame navigated to: ${frame.url()}`);
    });
    page.on('popup', () => {
        console.log(`Popup opened: ${page.url()}`);
    });

}
