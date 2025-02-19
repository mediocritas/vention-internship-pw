import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class NewMailFuncPanelComponent extends BaseComponent {

    readonly sendButton = () =>
        new ButtonElement(this.page.locator('#mailSend'), 'SendButton');

    constructor(page: Page) {
        super(page);
    }
} 