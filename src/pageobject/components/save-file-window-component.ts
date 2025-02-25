import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";
import { step } from "../decorators/playwright-decorators";

export default class SaveFileWindowComponent extends BaseComponent {

    readonly myDocOption = () =>
        new ButtonElement(getPage().locator('//*[text()="My documents"]'), 'MyDocumentsDirButton');
    readonly saveButton = () =>
        new ButtonElement(getPage().locator('#dialBtn_OK'), 'SaveButton');

    @step('Click on Save button')
    async clickOnSaveButton(maxRetries: number) {
        await this.saveButton().waitForVisible();
        for (let i = 0; i < maxRetries; i++) {
            await this.saveButton().click({ force: true, timeout: 10000 });
            if (await this.myDocOption()
                .isHidden({ timeout: 600 })) {
                return;
            }
        }
    }
}