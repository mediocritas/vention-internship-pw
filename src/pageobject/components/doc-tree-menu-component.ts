import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";
import { getPage } from "../../core/page-utils";
import { step } from "../decorators/playwright-decorators";


export default class DocTreeMenuComponent extends BaseComponent{
    
    readonly trashDirButton = () => 
        new ButtonElement(getPage().locator('#doc_tree_trash'), 'TrashDirButton');
    readonly myDocDirButton = () => 
        new ButtonElement(getPage().locator('//*[text()="My documents"]'), 'DocDirButton');

    @step('Go to Trash directory')
    async goToTrashDirectory() {
        await this.trashDirButton().click();
    }

    @step('Go to My Documents directory')
    async goToMyDocDirectory() {
        await this.myDocDirButton().click();
    }

}