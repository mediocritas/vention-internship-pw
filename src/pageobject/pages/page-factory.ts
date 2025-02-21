import DocumentsPage from "./documents-page";
import MailPage from "./mail-page";
import MainPage from "./main-page";
import NewMailPage from "./new-mail-page";

export default class PageFactory {

    static getMainPage(): MainPage {
        return new MainPage();
    }

    static getMailPage(): MailPage {
        return new MailPage();
    }

    static getNewMailPage(): NewMailPage {
        return new NewMailPage();
    }

    static getDocumentsPage(): DocumentsPage {
        return new DocumentsPage();
    }
}