import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class EmailsListComponent extends BaseComponent {

    readonly emailButton = (emailSubject: string) =>
        new ButtonElement(getPage().locator(`.listSubject[title="${emailSubject}"]`),
            `Email ${emailSubject} button`);

}