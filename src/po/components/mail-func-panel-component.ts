import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class MailFuncPanelComponent extends BaseComponent {

    readonly newMessageButton = () =>
        new ButtonElement(this.page.locator('#mailNewBtn'), 'new_email');
    readonly refreshButton = () => 
        new ButtonElement(this.page.locator('[title="Refresh"]'), 'refresh');
    
    constructor(page : Page) {
        super(page);
    }
} 