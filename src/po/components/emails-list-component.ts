import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class EmailsListComponent extends BaseComponent {

    readonly emailButton = (emailSubject: string) =>
        new ButtonElement(this.page.locator(`.listSubject[title="${emailSubject}"]`),
            `Email ${emailSubject} button`);

    constructor(page: Page) {
        super(page);
    }
}