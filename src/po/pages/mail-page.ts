import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";
import MailTreeMenuComponent from "../components/mail-tree-menu-component";
import MailFuncPanelComponent from "../components/mail-func-panel-component";
import SaveFileWindowComponent from "../components/save-file-window-component";
import HeaderMenuComponent from "../components/header-menu-component";
import NewMailPage from "./new-mail-page";
import DocumentsPage from "./documents-page";

export default class MailPage extends BasePage {

    readonly header: HeaderMenuComponent;
    readonly treeMenu: MailTreeMenuComponent;
    readonly funcPanel: MailFuncPanelComponent;
    readonly saveFileWindow: SaveFileWindowComponent;
    readonly saveInDocumentsButton: Locator;
    readonly myDocOption: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderMenuComponent(page);
        this.treeMenu = new MailTreeMenuComponent(page);
        this.funcPanel = new MailFuncPanelComponent(page);
        this.saveFileWindow = new SaveFileWindowComponent(page);
        this.saveInDocumentsButton = page.locator('//*[text()="Save in Documents"]');
        this.myDocOption = page.locator('//*[text()="My documents"]');
    }

    async goToNewEmailPage() : Promise<NewMailPage>{
        await this.funcPanel.newMessageButton.click();
        return new NewMailPage(this.page);
    }
    async goToDocPage() : Promise<DocumentsPage>{
        await this.header.documentsButton.click();
        return new DocumentsPage(this.page);
    }

    async waitUntilNewEmailAppears(maxRetries: number, emailSubject: string) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await this.page.locator(
                    `.listSubject[title="${emailSubject}"]`
                ).waitFor({ state: 'visible', timeout: 1000 });
                return;
            } catch {
                await this.funcPanel.refreshButton.click();
            }
        }
    }

    async openEmail(emailSubject: string) {
        await this.page.locator(
            `.listSubject[title="${emailSubject}"]`
        ).click();
    }

    async saveAttachmentInMyDocDir(attchName: string, maxRetries : number) {
        await this.page.locator(`//*[text()="${attchName}"]`).hover();
        await this.page.locator(
            `//*[text()="${attchName}"]/*[contains(@class, "icon-Arrow-down")]`
          ).click();
        await this.saveInDocumentsButton.click();
        await this.myDocOption.click();
        await this.saveFileWindow.myDocOption.waitFor({ state: 'attached' });
        await this.saveFileWindow.myDocOption.click();
        await this.saveFileWindow.clickOnSaveButton(maxRetries);
    }
}