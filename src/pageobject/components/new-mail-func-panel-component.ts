import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class NewMailFuncPanelComponent extends BaseComponent {

    readonly sendButton = () =>
        new ButtonElement(getPage().locator('#mailSend'), 'SendButton');
} 