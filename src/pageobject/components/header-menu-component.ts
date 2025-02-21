import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class HeaderMenuComponent extends BaseComponent {

    readonly messagesButton = () => 
        new ButtonElement(getPage().locator('#nav-mail'), 'MessagesButton');
    readonly documentsButton = () => 
        new ButtonElement(getPage().locator('#nav-docs'), 'DocumentsButton');

    async openMessagesPage() {
        await this.messagesButton().click();
    }

    async openDocumentsPage() {
        await this.documentsButton().click();
    }
}