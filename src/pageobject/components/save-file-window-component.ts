import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";
import { step } from "../decorators/playwright-decorators";

export default class SaveFileWindowComponent extends BaseComponent {

    readonly myDocOption = () =>
        new ButtonElement(getPage().locator('//*[text()="My documents"]'), 'MyDocumentsDirButton');
    readonly saveButton = () =>
        new ButtonElement(getPage().locator('#dialBtn_OK'), 'SaveButton');
}