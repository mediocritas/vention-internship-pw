import { Page } from "@playwright/test";
import BaseComponent from "./base-component";
import ButtonElement from "../elements/button-element";

export default class DocTreeMenuComponent extends BaseComponent{
    
    readonly trashDirButton = () => 
        new ButtonElement(this.page.locator('#doc_tree_trash'), 'TrashDirButton');
    readonly myDocDirButton = () => 
        new ButtonElement(this.page.locator('//*[text()="My documents"]'), 'DocDirButton');

    constructor(page: Page) {
        super(page);
    }

    async goToTrashDirectory() {
        await this.trashDirButton().click();
    }

    async goToMyDocDirectory() {
        await this.myDocDirButton().click();
    }

}