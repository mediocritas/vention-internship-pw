import { defineParameterType } from "playwright-bdd";
import MailPage from "../../src/pageobject/pages/mail-page";
import DocumentsPage from "../../src/pageobject/pages/documents-page";

export type PageAction = () => Promise<void>;

defineParameterType({
  name: 'page',
  regexp: /My Documents page|Trash directory page|Mail page/,
  transformer: (pageName: string): PageAction => {
    switch (pageName) {
      case 'My Documents page':
        return async () => await MailPage.goToDocPage();
      case 'Trash directory page':
        return async () => await DocumentsPage.treeMenu().goToTrashDirectory();
      case 'Mail page':
        return async () => await MailPage.navigate();
      default:
        throw new Error(`Unknown page: ${pageName}`);
    }
  }
})