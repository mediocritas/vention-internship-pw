import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class DocFuncPanelComponent extends BaseComponent {

    readonly refreshButton = () => 
        new ButtonElement(this.page.locator('[title="Refresh"]'), 'refresh');
    
    constructor(page : Page) {
        super(page);
    }
} 