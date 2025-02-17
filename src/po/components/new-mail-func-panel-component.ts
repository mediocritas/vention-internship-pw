import { Locator, Page } from "@playwright/test";
import BaseComponent from "./base-component";

export default class NewMailFuncPanelComponent extends BaseComponent {

    readonly sendButton : Locator;
    
    constructor(page : Page) {
        super(page);
        this.sendButton = page.locator('#mailSend');
    }
} 