import { Locator, Page } from "@playwright/test";
import BaseComponent from "./base-component";

export default class MailTreeMenuComponent extends BaseComponent{
    
    readonly inboxMessages : Locator;

    constructor(page: Page) {
        super(page);
        this.inboxMessages = page.locator('#treeInbox');
    }

}