import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class SaveFileWindowComponent extends BaseComponent {

    readonly myDocOption = () =>
        new ButtonElement(getPage().locator('//*[text()="My documents"]'), 'MyDocumentsDirButton');
    readonly saveButton = () =>
        new ButtonElement(getPage().locator('#dialBtn_OK'), 'SaveButton');

    async clickOnSaveButton(maxRetries: number) {
        await this.saveButton().waitForVisible();
        for (let i = 0; i < maxRetries; i++) {
            await this.saveButton().click({ force: true, timeout: 10000 });
            if (await this.myDocOption()
                .isHidden({ timeout: 700 })) {
                return;
            }
        }
    }
}