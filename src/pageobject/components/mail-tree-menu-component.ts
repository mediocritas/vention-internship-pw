import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class MailTreeMenuComponent extends BaseComponent {

    readonly inboxMessages = () =>
        new ButtonElement(getPage().locator('#treeInbox'), 'IncomingMessagesDirButton');
}