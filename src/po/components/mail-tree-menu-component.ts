import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class MailTreeMenuComponent extends BaseComponent {

    readonly inboxMessages = () =>
        new ButtonElement(this.page.locator('#treeInbox'), 'incomings');

    constructor(page: Page) {
        super(page);
    }

}