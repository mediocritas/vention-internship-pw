import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class SaveFileWindowComponent extends BaseComponent {

    readonly myDocOption = () =>
        new ButtonElement(this.page.locator('//*[text()="My documents"]'), 'MyDocumentsDirButton');
    readonly saveButton = () =>
        new ButtonElement(this.page.locator('#dialBtn_OK'), 'SaveButton');

    constructor(page: Page) {
        super(page);
    }

    async clickOnSaveButton(maxRetries: number) {
        await this.saveButton().waitForVisible();
        for (let i = 0; i < maxRetries; i++) {
            await this.saveButton().click({ force: true, timeout: 10000 });
            if (await this.myDocOption()
                .isHidden({ timeout: 500 })) {
                return;
            }
        }
    }
}