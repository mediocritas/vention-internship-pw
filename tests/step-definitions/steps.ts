import { expect } from 'playwright/test';
import MailPage from '../../src/pageobject/pages/mail-page';
import NewMailPage from '../../src/pageobject/pages/new-mail-page';
import { faker } from '@faker-js/faker';
import DocumentsPage from '../../src/pageobject/pages/documents-page';
import {Given, When, Then} from '../../src/core/fixtures/bdd-fixture';

Given('I authenticate as valid user', async ({ }) => {
});

When('I open Mail page', async ({ }) => {
  await MailPage.navigate();
});

When('Click on the New button', async ({ }) => {
  await MailPage.goToNewEmailPage();
});

When('Send new email to myself', async ({ emailSubject, testFile},) => {

  await NewMailPage.sendNewEmail(
    {
      addressee: process.env.LOGIN + process.env.DOMAIN!,
      emailSubject: emailSubject,
      textMessage: faker.string.alpha(10),
      filePath: testFile!.filePath,
      fileName: testFile!.fileName
    }
  )
});

Then('I wait until new email appears in emails list', async ({ emailSubject }) => {
  await MailPage.waitUntilNewEmailAppears(emailSubject);
});

When('I open new email', async ({ emailSubject }) => {
  await MailPage.openEmail(emailSubject);
});

When('Save emails attachment file in My Documents', async ({ testFile }) => {
  await MailPage.saveAttachmentInMyDocDir(testFile.fileName);
});

When('I go to the My Documents page', async ({ }) => {
  await MailPage.goToDocPage();
});

When('Drag attachment file to Trash directory', async ({ testFile }) => {
  await DocumentsPage.dragDocumentToTrashDirectory(testFile.fileName);
});

Then('I go to Trash directory', async ({ }) => {
  await DocumentsPage.treeMenu().goToTrashDirectory();
});

Then('I expect to see attachment file', async ({ testFile }) => {
  await DocumentsPage.waitForDocumentInDirectory(testFile.fileName);
  await expect(DocumentsPage.documentsList().documentButton(testFile!.fileName).locator,
    `error: file ${testFile!.fileName} not found in trash directory`).toBeVisible();
})
