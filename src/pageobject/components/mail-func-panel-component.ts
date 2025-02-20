import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class MailFuncPanelComponent extends BaseComponent {

    readonly newMessageButton = () =>
        new ButtonElement(this.page.locator('#mailNewBtn'), 'NewEmailButton');
    readonly refreshButton = () => 
        new ButtonElement(this.page.locator('[title="Refresh"]'), 'RefreshButton');
    
    constructor(page : Page) {
        super(page);
    }
} 