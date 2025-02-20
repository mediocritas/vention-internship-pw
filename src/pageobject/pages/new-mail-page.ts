import { Page } from "@playwright/test";
import MailTreeMenuComponent from "../components/mail-tree-menu-component";
import NewMailFuncPanelComponent from "../components/new-mail-func-panel-component";
import BasePage from "./base-page";
import InputElement from "../elements/input-element";
import ButtonElement from "../elements/button-element";
import IFrameElement from "../elements/iframe-element";
import InputFileElement from "../elements/input-file-element";
import HeaderMenuComponent from "../components/header-menu-component";

export default class NewMailPage extends BasePage {

    readonly header = () => new HeaderMenuComponent(this.page);
    readonly treeMenu = () => new MailTreeMenuComponent(this.page);
    readonly funcPanel = () => new NewMailFuncPanelComponent(this.page);
    readonly mailToInput = () =>
        new InputElement(this.page.locator('#mailTo input'), 'AddresseeInput');
    readonly mailSubjectInput = () =>
        new InputElement(this.page.locator('#mailSubject'), 'MailSubjectInput');
    readonly textBoxFrame = () =>
        new IFrameElement(this.page.locator('iframe.editable'), 'TextIframe');
    readonly textBoxInput = () =>
        new InputElement(this.textBoxFrame().frameLocator.locator('[role="textbox"]'), 'TextboxInput');
    readonly addAttachmentButton = () =>
        new ButtonElement(this.page.locator('//*[text()="Attachment"]'), 'AttachmentButton');
    readonly fileInput = () =>
        new InputFileElement(this.page.locator('input[type="file"]'), 'FileInput');
    readonly namedAttachementButton = (fileName: string) =>
        new ButtonElement(this.page.locator(`//*[contains(text(), "${fileName}")]`), `${fileName} fileButton`)

    constructor(page: Page) {
        super(page);
    }

    async sendNewEmail(options: {
        addressee: string,
        emailSubject: string,
        textMessage: string,
        filePath: string,
        fileName: string
    }
    ) {
        await this.mailToInput().fill(options.addressee);
        await this.mailSubjectInput().fill(options.emailSubject);
        await this.textBoxInput().fill(options.textMessage);
        await this.addAttachmentButton().click();
        await this.fileInput().setInputFiles(options.filePath);
        await this.namedAttachementButton(options.fileName).waitForVisible();
        await this.funcPanel().sendButton().click();
    }
}