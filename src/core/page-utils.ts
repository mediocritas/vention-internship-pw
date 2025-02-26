import { Page } from "@playwright/test";

let page: Page;

export function setPage(pageInstance: Page) {
    page = pageInstance;
}

export function getPage(): Page {
    return page;
}

export async function closePage() {
    await page.close();
}