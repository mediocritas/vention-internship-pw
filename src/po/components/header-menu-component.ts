import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class HeaderMenuComponent extends BaseComponent {

    readonly messagesButton = () => 
        new ButtonElement(this.page.locator('#nav-mail'), 'MessagesButton');
    readonly documentsButton = () => 
        new ButtonElement(this.page.locator('#nav-docs'), 'DocumentsButton');

    constructor(page: Page) {
        super(page);
    }

    async openMessagesPage() {
        await this.messagesButton().click();
    }

    async openDocumentsPage() {
        await this.documentsButton().click();
    }
}