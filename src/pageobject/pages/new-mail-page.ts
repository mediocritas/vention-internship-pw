import MailTreeMenuComponent from "../components/mail-tree-menu-component";
import NewMailFuncPanelComponent from "../components/new-mail-func-panel-component";
import BasePage from "./base-page";
import InputElement from "../elements/input-element";
import ButtonElement from "../elements/button-element";
import IFrameElement from "../elements/iframe-element";
import InputFileElement from "../elements/input-file-element";
import HeaderMenuComponent from "../components/header-menu-component";
import { getPage } from "../../core/page-utils";

export default class NewMailPage extends BasePage {

    static readonly header = () => new HeaderMenuComponent();
    static readonly treeMenu = () => new MailTreeMenuComponent();
    static readonly funcPanel = () => new NewMailFuncPanelComponent();
    static readonly mailToInput = () =>
        new InputElement(getPage().locator('#mailTo input'), 'AddresseeInput');
    static readonly mailSubjectInput = () =>
        new InputElement(getPage().locator('#mailSubject'), 'MailSubjectInput');
    static readonly textBoxFrame = () =>
        new IFrameElement(getPage().locator('iframe.editable'), 'TextIframe');
    static readonly textBoxInput = () =>
        new InputElement(this.textBoxFrame().frameLocator.locator('[role="textbox"]'), 'TextboxInput');
    static readonly addAttachmentButton = () =>
        new ButtonElement(getPage().locator('//*[text()="Attachment"]'), 'AttachmentButton');
    static readonly fileInput = () =>
        new InputFileElement(getPage().locator('input[type="file"]'), 'FileInput');
    static readonly namedAttachementButton = (fileName: string) =>
        new ButtonElement(getPage().locator(`//*[contains(text(), "${fileName}")]`), `${fileName} fileButton`)

    static async sendNewEmail(options: {
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