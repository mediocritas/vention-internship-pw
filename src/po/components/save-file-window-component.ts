import { Locator, Page } from "@playwright/test";
import BaseComponent from "./base-component";

export default class SaveFileWindowComponent extends BaseComponent {

    readonly myDocOption: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.myDocOption = page.locator('//*[text()="My documents"]');
        this.saveButton = page.locator('#dialBtn_OK');
    }

    async clickOnSaveButton(maxRetries: number) {
        await this.saveButton.waitFor({ state: 'visible' });
        for (let i = 0; i < maxRetries; i++) {
            await this.saveButton.click({ force: true, timeout: 10000 });
            if (await this.myDocOption
                .isHidden({ timeout: 300 })) {
                break;
            }
        }
    }
}