import { getPage } from "../../core/page-utils";
import BasePage from "./base-page";
import DocTreeMenuComponent from "../components/doc-tree-menu-component";
import HeaderMenuComponent from "../components/header-menu-component";
import DocFuncPanelComponent from "../components/doc-func-panel-component";
import DocumentsListComponent from "../components/documents-list-component";

export default class DocumentsPage extends BasePage {

    static readonly funcPanel = () => new DocFuncPanelComponent();
    static readonly treeMenu = () => new DocTreeMenuComponent();
    static readonly header = () => new HeaderMenuComponent();
    static readonly documentsList = () => new DocumentsListComponent();

    static async dragDocumentInTrashDirectory(docName: string) {
        const doc = this.documentsList().documentButton(docName);
        await doc.scrollIntoView();
        await doc.customDragTo(this.treeMenu().trashDirButton());
    }

    static async waitForDocumentInTrashDirectory(docName: string) {
        await this.funcPanel().refreshButton().click();
        await getPage().waitForLoadState('load');
        await this.documentsList().documentButton(docName).scrollIntoView();

    }
}