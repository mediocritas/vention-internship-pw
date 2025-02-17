import { FrameLocator, Locator, Page } from "@playwright/test";
import MailTreeMenuComponent from "../components/mail-tree-menu-component";
import NewMailFuncPanelComponent from "../components/new-mail-func-panel-component";
import BasePage from "./base-page";

export default class NewMailPage extends BasePage {

    readonly treeMenu: MailTreeMenuComponent;
    readonly funcPanel: NewMailFuncPanelComponent;
    readonly mailToField : Locator;
    readonly mailSubjectField : Locator;
    readonly textBoxFrame : FrameLocator;
    readonly textBoxField : Locator;
    readonly attachmentButton : Locator;
    readonly inputFileField : Locator;

    constructor(page: Page) {
        super(page);
        this.treeMenu = new MailTreeMenuComponent(page);
        this.funcPanel = new NewMailFuncPanelComponent(page);
        this.mailToField = page.locator('#mailTo input');
        this.mailSubjectField = page.locator('#mailSubject');
        this.textBoxFrame = page.frameLocator('iframe.editable');
        this.textBoxField = this.textBoxFrame.locator('[role="textbox"]');
        this.attachmentButton = page.locator('//*[text()="Attachment"]');
        this.inputFileField = page.locator('input[type="file"]');
    }

    async sendNewEmail(
        addressee: string,
        mailSubject: string,
        textMessage: string,
        filePath: string,
        fileName: string
    ) {
        await this.mailToField.fill(addressee);
        await this.mailSubjectField.fill(mailSubject);
        await this.textBoxField.fill(textMessage);
        await this.attachmentButton.click();
        await this.inputFileField.setInputFiles(filePath);
        await this.getAttachment(fileName).waitFor({ state: 'visible' });
        await this.funcPanel.sendButton.click();
    }

    getAttachment(fileName : string) : Locator {
        return this.page.locator(`//*[contains(text(), "${fileName}")]`);
    }
}