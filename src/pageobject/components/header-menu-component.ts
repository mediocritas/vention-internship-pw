import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";
import { step } from "../decorators/playwright-decorators";

export default class HeaderMenuComponent extends BaseComponent {

    readonly messagesButton = () => 
        new ButtonElement(getPage().locator('#nav-mail'), 'MessagesButton');
    readonly documentsButton = () => 
        new ButtonElement(getPage().locator('#nav-docs'), 'DocumentsButton');

    @step('Open Messages page')
    async openMessagesPage() {
        await this.messagesButton().click();
    }

    @step('Open Documents page')
    async openDocumentsPage() {
        await this.documentsButton().click();
    }
}