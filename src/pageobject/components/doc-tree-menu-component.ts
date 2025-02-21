import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";

export default class DocTreeMenuComponent extends BaseComponent{
    
    readonly trashDirButton = () => 
        new ButtonElement(getPage().locator('#doc_tree_trash'), 'TrashDirButton');
    readonly myDocDirButton = () => 
        new ButtonElement(getPage().locator('//*[text()="My documents"]'), 'DocDirButton');

    async goToTrashDirectory() {
        await this.trashDirButton().click();
    }

    async goToMyDocDirectory() {
        await this.myDocDirButton().click();
    }

}