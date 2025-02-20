import { Page } from "@playwright/test";
import BasePage from "./base-page";
import DocTreeMenuComponent from "../components/doc-tree-menu-component";
import HeaderMenuComponent from "../components/header-menu-component";
import { customDragTo } from "../../utils/custom-drag-n-drop";
import DocFuncPanelComponent from "../components/doc-func-panel-component";
import DocumentsListComponent from "../components/documents-list-component";

export default class DocumentsPage extends BasePage {

    readonly funcPanel = () => new DocFuncPanelComponent(this.page);
    readonly treeMenu = () => new DocTreeMenuComponent(this.page);
    readonly header = () => new HeaderMenuComponent(this.page);
    readonly documentsList = () => new DocumentsListComponent(this.page);

    constructor(page: Page) {
        super(page);
    }

    async dragDocumentInTrashDirectory(docName: string) {
        const doc = this.documentsList().documentButton(docName);
        await doc.scrollIntoView();
        await customDragTo(doc, this.treeMenu().trashDirButton(), this.page);
    }

    async waitForDocumentInTrashDirectory(docName: string) {
        await this.funcPanel().refreshButton().click();
        await this.page.waitForLoadState('load');
        await this.documentsList().documentButton(docName).scrollIntoView();

    }
}