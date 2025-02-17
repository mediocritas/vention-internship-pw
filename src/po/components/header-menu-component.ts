import { Page, Locator } from "@playwright/test";
import BaseComponent from "./base-component";

export default class HeaderMenuComponent extends BaseComponent {

    readonly messagesButton: Locator;
    readonly documentsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.messagesButton = page.locator('#nav-mail');
        this.documentsButton = page.locator('#nav-docs');
    }

    async openMessagesPage() {
        await this.messagesButton.click();
    }

    async openDocumentsPage() {
        await this.documentsButton.click();
    }
}