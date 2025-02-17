import { Locator, Page } from "@playwright/test";
import BaseComponent from "./base-component";

export default class DocTreeMenuComponent extends BaseComponent{
    
    readonly trashDirButton : Locator;
    readonly myDocDirButton : Locator;

    constructor(page: Page) {
        super(page);
        this.trashDirButton = page.locator('#doc_tree_trash');
        this.myDocDirButton = page.locator('//*[text()="My documents"]');
    }

    async goToTrashDirectory() {
        await this.trashDirButton.click();
    }

    async goToMyDocDirectory() {
        await this.myDocDirButton.click();
    }

}