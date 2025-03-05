import { expect } from 'playwright/test';
import MailPage from '../../src/pageobject/pages/mail-page';
import NewMailPage from '../../src/pageobject/pages/new-mail-page';
import { faker } from '@faker-js/faker';
import DocumentsPage from '../../src/pageobject/pages/documents-page';
import { Given, When, Then } from '../../src/core/fixtures/bdd-fixture';
import { createTextFileWithName } from '../../src/utils/temp-files-helper';
import { PageAction } from './param-types';

let testFile: { fullFileName: string, filePath: string };

Given('I authenticate as valid user', async ({ }) => {
});

When('Click on the New button', async ({ }) => {
  await MailPage.goToNewEmailPage();
});

When(/^Send new email to myself with attachment prefix (TC-3452|TC-432)$/,
  async ({ emailSubject, testFilePath }, fileName: string) => {

    if (!fileName) throw new Error('No file name provided from feature');
    testFile = await createTextFileWithName(testFilePath, fileName);

    await NewMailPage.sendNewEmail(
      {
        addressee: process.env.LOGIN + process.env.DOMAIN!,
        emailSubject: emailSubject,
        textMessage: faker.string.alpha(10),
        filePath: testFile.filePath,
        fileName: testFile.fullFileName
      }
    )
  });

Then('I wait until new email appears in emails list',
  async ({ emailSubject }) => {
    await MailPage.waitUntilNewEmailAppears(emailSubject);
  });

When('I open new email', async ({ emailSubject }) => {
  await MailPage.openEmail(emailSubject);
});

When('Save emails attachment file in My Documents', async ({ }) => {
  await MailPage.saveAttachmentInMyDocDir(testFile.fullFileName);
});

When('Drag attachment file to Trash directory', async ({ }) => {
  await DocumentsPage.dragDocumentToTrashDirectory(testFile.fullFileName);
});

Then('I expect to see attachment file', async ({ }) => {
  await expect(DocumentsPage.documentsList().documentButton(testFile!.fullFileName).locator,
    `error: file ${testFile!.fullFileName} not found in trash directory`).toBeVisible();
})

When('I go to {page}', async ({ }, navigate: PageAction) => {
  await navigate();
});
