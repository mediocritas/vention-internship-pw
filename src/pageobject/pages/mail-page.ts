import BasePage from "./base-page";
import MailTreeMenuComponent from "../components/mail-tree-menu-component";
import MailFuncPanelComponent from "../components/mail-func-panel-component";
import SaveFileWindowComponent from "../components/save-file-window-component";
import HeaderMenuComponent from "../components/header-menu-component";
import ButtonElement from "../elements/button-element";
import EmailsListComponent from "../components/emails-list-component";
import { getPage } from "../../core/page-utils";
import { step } from "../decorators/playwright-decorators";

export default class MailPage extends BasePage {
    static readonly url: string = process.env.BASE_URL! + 'flatx';
    static readonly header = () => new HeaderMenuComponent();
    static readonly treeMenu = () => new MailTreeMenuComponent();
    static readonly funcPanel = () => new MailFuncPanelComponent();
    static readonly emailsList = () => new EmailsListComponent();
    static readonly saveFileWindow = () => new SaveFileWindowComponent();
    static readonly saveInDocumentsSelector = () =>
        new ButtonElement(getPage().locator('//*[text()="Save in Documents"]'),
            'SaveInDocumentsButton');
    static readonly myDocButton = () =>
        new ButtonElement(getPage().locator('//*[text()="My documents"]'),
            'MyDocumentsDirButton');
    static readonly attachmentButton = (attchName: string) =>
        new ButtonElement(getPage().locator(`//*[text()="${attchName}"]`),
            `${attchName} attachmentButton`);
    static readonly attchActionsButton = (attchName: string) =>
        new ButtonElement(getPage().locator(`//*[text()="${attchName}"]/*[contains(@class, "icon-Arrow-down")]`),
            `AttachmentActionsButton`
        );

    @step('Go to the MailPage')
    static async navigate() {
        await super.goto(this.url);
    }

    @step('Go to NewEmailPage')
    static async goToNewEmailPage() {
        await this.funcPanel().newMessageButton().click();
    }

    @step('Go to DocPage')
    static async goToDocPage() {
        await this.header().documentsButton().click();
    }

    @step('Wait until new email appear')
    static async waitUntilNewEmailAppears(emailSubject: string) {
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

    @step('Open new email')
    static async openEmail(emailSubject: string) {
        await this.emailsList().emailButton(emailSubject).click();
    }

    @step('Save attachment file')
    static async saveAttachmentInMyDocDir(attchName: string) {
        await this.attachmentButton(attchName).hover();
        await this.attchActionsButton(attchName).click();
        await this.saveInDocumentsSelector().click();
        await this.myDocButton().click();
        await this.saveFileWindow().myDocOption().waitForAttached();
        await this.saveFileWindow().myDocOption().click();
        await this.saveFileWindow().clickOnSaveButton(parseInt(process.env.MAX_RETRIES!, 10));
    }
}