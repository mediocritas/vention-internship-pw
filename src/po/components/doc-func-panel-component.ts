import { Locator, Page } from "@playwright/test";
import BaseComponent from "./base-component";

export default class DocFuncPanelComponent extends BaseComponent {

    readonly refreshButton : Locator;
    
    constructor(page : Page) {
        super(page);
        this.refreshButton = page.locator('[title="Refresh"]');
    }
} 