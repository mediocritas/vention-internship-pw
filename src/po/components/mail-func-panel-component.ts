import { Locator, Page } from "@playwright/test";
import BaseComponent from "./base-component";

export default class MailFuncPanelComponent extends BaseComponent {

    readonly newMessageButton : Locator;
    readonly refreshButton : Locator;
    
    constructor(page : Page) {
        super(page);
        this.newMessageButton = page.locator('#mailNewBtn');
        this.refreshButton = page.locator('[title="Refresh"]');
    }
} 