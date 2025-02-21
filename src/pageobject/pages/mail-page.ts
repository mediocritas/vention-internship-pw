import BasePage from "./base-page";
import MailTreeMenuComponent from "../components/mail-tree-menu-component";
import MailFuncPanelComponent from "../components/mail-func-panel-component";
import SaveFileWindowComponent from "../components/save-file-window-component";
import HeaderMenuComponent from "../components/header-menu-component";
import NewMailPage from "./new-mail-page";
import DocumentsPage from "./documents-page";
import ButtonElement from "../elements/button-element";
import EmailsListComponent from "../components/emails-list-component";
import { getPage } from "../../core/page-utils";

export default class MailPage extends BasePage {

    readonly header = () => new HeaderMenuComponent();
    readonly treeMenu = () => new MailTreeMenuComponent();
    readonly funcPanel = () => new MailFuncPanelComponent();
    readonly emailsList = () => new EmailsListComponent();
    readonly saveFileWindow = () => new SaveFileWindowComponent();
    readonly saveInDocumentsSelector = () =>
        new ButtonElement(getPage().locator('//*[text()="Save in Documents"]'),
            'SaveInDocumentsButton');
    readonly myDocButton = () =>
        new ButtonElement(getPage().locator('//*[text()="My documents"]'),
            'MyDocumentsDirButton');
    readonly attachmentButton = (attchName: string) =>
        new ButtonElement(getPage().locator(`//*[text()="${attchName}"]`),
            `${attchName} attachmentButton`);
    readonly attchActionsButton = (attchName: string) =>
        new ButtonElement(getPage().locator(`//*[text()="${attchName}"]/*[contains(@class, "icon-Arrow-down")]`),
            `AttachmentActionsButton`
        );

    async goToNewEmailPage(): Promise<NewMailPage> {
        await this.funcPanel().newMessageButton().click();
        return new NewMailPage();
    }

    async goToDocPage(): Promise<DocumentsPage> {
        await this.header().documentsButton().click();
        return new DocumentsPage();
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