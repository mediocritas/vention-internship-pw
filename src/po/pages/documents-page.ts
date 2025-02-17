import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";
import DocTreeMenuComponent from "../components/doc-tree-menu-component";
import HeaderMenuComponent from "../components/header-menu-component";
import { customDragTo } from "../../../tests/custom-drag-n-drop";
import DocFuncPanelComponent from "../components/doc-func-panel-component";

export default class DocumentsPage extends BasePage {

    readonly funcPanel: DocFuncPanelComponent;
    readonly treeMenu: DocTreeMenuComponent;
    readonly header: HeaderMenuComponent;

    constructor(page: Page) {
        super(page);
        this.funcPanel = new DocFuncPanelComponent(page);
        this.header = new HeaderMenuComponent(page);
        this.treeMenu = new DocTreeMenuComponent(page);
    }

    getDocumentByName(docName: string): Locator {
        return this.page.locator(`//*[text()="${docName}"]/../..`);
    }

    async dragDocumentInTrashDirectory(docName: string) {
        const doc = this.getDocumentByName(docName);
        await doc.scrollIntoViewIfNeeded();
        await customDragTo(doc, this.treeMenu.trashDirButton, this.page);
    }

    async waitForDocumentInTrashDirectory(docName: string) {
        await this.funcPanel.refreshButton.click();
        await this.page.waitForLoadState('load');
        await this.getDocumentByName(docName).scrollIntoViewIfNeeded();

    }


}