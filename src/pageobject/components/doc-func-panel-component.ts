import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class DocFuncPanelComponent extends BaseComponent {

    readonly refreshButton = () =>
        new ButtonElement(getPage().locator('[title="Refresh"]'), 'RefreshButton');
} 