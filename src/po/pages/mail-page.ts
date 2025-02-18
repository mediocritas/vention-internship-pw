import { Page } from "@playwright/test";
import BasePage from "./base-page";
import MailTreeMenuComponent from "../components/mail-tree-menu-component";
import MailFuncPanelComponent from "../components/mail-func-panel-component";
import SaveFileWindowComponent from "../components/save-file-window-component";
import HeaderMenuComponent from "../components/header-menu-component";
import NewMailPage from "./new-mail-page";
import DocumentsPage from "./documents-page";
import ButtonElement from "../elements/button-element";
import SelectorElement from "../elements/selector-element";
import EmailsListComponent from "../components/emails-list-component";

export default class MailPage extends BasePage {

    readonly header = () => new HeaderMenuComponent(this.page);
    readonly treeMenu = () => new MailTreeMenuComponent(this.page);
    readonly funcPanel = () => new MailFuncPanelComponent(this.page);
    readonly emailsList = () => new EmailsListComponent(this.page);
    readonly saveFileWindow = () => new SaveFileWindowComponent(this.page);
    readonly saveInDocumentsSelector = () =>
        new SelectorElement(this.page.locator('//*[text()="Save in Documents"]'),
            'save_in_documents');
    readonly myDocButton = () =>
        new ButtonElement(this.page.locator('//*[text()="My documents"]'),
            'my_documents_dir');
    readonly attachmentButton = (attchName: string) =>
        new ButtonElement(this.page.locator(`//*[text()="${attchName}"]`),
            `${attchName} attachment`);
    readonly attchActionsButton = (attchName: string) =>
        new ButtonElement(this.page.locator(`//*[text()="${attchName}"]/*[contains(@class, "icon-Arrow-down")]`),
            `attachment_actions`
        );

    constructor(page: Page) {
        super(page);
    }

    async goToNewEmailPage(): Promise<NewMailPage> {
        await this.funcPanel().newMessageButton().click();
        return new NewMailPage(this.page);
    }

    async goToDocPage(): Promise<DocumentsPage> {
        await this.header().documentsButton().click();
        return new DocumentsPage(this.page);
    }

    async waitUntilNewEmailAppears(emailSubject: string) {
        for (let i = 0; i < parseInt(process.env.MAX_RETRIES!, 10); i++) {
            try {
                await this.emailsList().emailButton(emailSubject)
                .waitForVisible({ timeout: 1000 });
                return;
            } catch {
                await this.funcPanel().refreshButton().click();
            }
        }
    }

    async openEmail(emailSubject: string) {
        await this.emailsList().emailButton(emailSubject).click();
    }

    async saveAttachmentInMyDocDir(attchName: string) {
        await this.attachmentButton(attchName).hover();
        await this.attchActionsButton(attchName).click();
        await this.saveInDocumentsSelector().click();
        await this.myDocButton().click();
        await this.saveFileWindow().myDocOption().waitForAttached();
        await this.saveFileWindow().myDocOption().click();
        await this.saveFileWindow().clickOnSaveButton(parseInt(process.env.MAX_RETRIES!, 10));
    }
}