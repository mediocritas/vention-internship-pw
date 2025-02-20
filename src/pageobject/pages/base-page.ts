import { Page } from '@playwright/test';
import { getPage } from '../../core/page-utils';

export default class BasePage {

    readonly page: Page;

    constructor(page?: Page) {
        this.page = page || getPage();
    }

    async goto(url: string) {
        await this.page.goto(url);
    }
}
