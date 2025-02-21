import { expect } from '@playwright/test';
import { test } from './fixtures/page-fixture'
import path from 'path';
import { faker } from '@faker-js/faker';
import { createFileCopy, createFilePath, deleteFile } from '../src/utils/temp-files-helper';
import MainPage from '../src/pageobject/pages/main-page';
import MailPage from '../src/pageobject/pages/mail-page';
import DocumentsPage from '../src/pageobject/pages/documents-page';
import NewMailPage from '../src/pageobject/pages/new-mail-page';

const emailSubject = process.env.SUBJECT! + faker.string.alpha(5);

const seedFilePath = path.resolve('.artefacts/' + process.env.FILE_NAME!);
const sourceFilePath = path.resolve(process.env.FILE_NAME!);
let tempFilePath: string;
let testFileName: string;

test.describe('mailfence tests (eng loc)', async () => {

  test.beforeEach('login', async ({ }) => {
    tempFilePath = await createFilePath(seedFilePath);
    testFileName = await createFileCopy(sourceFilePath, tempFilePath);
    await MainPage.navigate();
    await MainPage.toLogin(process.env.LOGIN!, process.env.PASSWORD!);
  });

  test('create new email', async ({ }) => {
    await MailPage.goToNewEmailPage();
    await NewMailPage.sendNewEmail(
      {
        addressee: process.env.LOGIN + process.env.DOMAIN!,
        emailSubject: emailSubject,
        textMessage: faker.string.alpha(10),
        filePath: tempFilePath,
        fileName: testFileName
      }
    )

    await MailPage.waitUntilNewEmailAppears(emailSubject);
    await MailPage.openEmail(emailSubject);

    await MailPage.saveAttachmentInMyDocDir(testFileName);

    await MailPage.goToDocPage();
    await DocumentsPage.dragDocumentInTrashDirectory(testFileName);
    await DocumentsPage.treeMenu().goToTrashDirectory();
    await DocumentsPage.waitForDocumentInTrashDirectory(testFileName);
    await expect(DocumentsPage.documentsList().documentButton(testFileName).locator,
      `error: file ${testFileName} not found in trash directory`).toBeVisible();
  });

});

test.afterEach(async ({ context }) => {
  try {
    await context.tracing.stop({ path: 'test-results/traces/trace.zip' });
  } catch { }
  if (test.info().errors.length === 0) {
    await deleteFile(tempFilePath);
  }
});
