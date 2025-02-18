import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class DocumentsListComponent extends BaseComponent {

    readonly documentButton = (docName: string) =>
        new ButtonElement(this.page.locator(`//*[text()="${docName}"]/../..`),
            `${docName} document`);

    constructor(page: Page) {
        super(page);
    }
}