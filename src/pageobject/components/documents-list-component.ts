import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class DocumentsListComponent extends BaseComponent {

    readonly documentButton = (docName: string) =>
        new ButtonElement(getPage().locator(`//*[text()="${docName}"]/../..`),
            `${docName} documentButton`);
}