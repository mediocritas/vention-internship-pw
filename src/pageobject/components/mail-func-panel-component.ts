import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class MailFuncPanelComponent extends BaseComponent {

    readonly newMessageButton = () =>
        new ButtonElement(getPage().locator('#mailNewBtn'), 'NewEmailButton');
    readonly refreshButton = () => 
        new ButtonElement(getPage().locator('[title="Refresh"]'), 'RefreshButton');
} 