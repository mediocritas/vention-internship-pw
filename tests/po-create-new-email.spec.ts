import { expect } from '@playwright/test';
import { test } from '../src/core/fixtures/page-fixture'
import path from 'path';
import { faker } from '@faker-js/faker';
import { createTextFile, deleteFile } from '../src/utils/temp-files-helper';
import MailPage from '../src/pageobject/pages/mail-page';
import DocumentsPage from '../src/pageobject/pages/documents-page';
import NewMailPage from '../src/pageobject/pages/new-mail-page';

const emailSubject = process.env.SUBJECT! + faker.string.alpha(5);
const testFilePath = path.resolve('.artefacts/');

let tempFilePath: string;
let tempFileName: string;

test.describe.configure({ mode: 'parallel' });

  test.beforeEach('login', async ({ }) => {
    const result = await createTextFile(testFilePath);
    tempFileName = result!.fileName;
    tempFilePath = result!.filePath;
  });

  test('create new email', async ({ }) => {
    await MailPage.navigate();
    await MailPage.goToNewEmailPage();
    await NewMailPage.sendNewEmail(
      {
        addressee: process.env.LOGIN + process.env.DOMAIN!,
        emailSubject: emailSubject,
        textMessage: faker.string.alpha(10),
        filePath: tempFilePath,
        fileName: tempFileName
      }
    )

    await MailPage.waitUntilNewEmailAppears(emailSubject);
    await MailPage.openEmail(emailSubject);

    await MailPage.saveAttachmentInMyDocDir(tempFileName);

    await MailPage.goToDocPage();
    await DocumentsPage.dragDocumentInTrashDirectory(tempFileName);
    await DocumentsPage.treeMenu().goToTrashDirectory();
    await DocumentsPage.waitForDocumentInDirectory(tempFileName);
    await expect(DocumentsPage.documentsList().documentButton(tempFileName).locator,
      `error: file ${tempFileName} not found in trash directory`).toBeVisible();
  });

  test('create new email copy', async ({ }) => {
    await MailPage.navigate();
    await MailPage.goToNewEmailPage();
    await NewMailPage.sendNewEmail(
      {
        addressee: process.env.LOGIN + process.env.DOMAIN!,
        emailSubject: emailSubject,
        textMessage: faker.string.alpha(10),
        filePath: tempFilePath,
        fileName: tempFileName
      }
    )

    await MailPage.waitUntilNewEmailAppears(emailSubject);
    await MailPage.openEmail(emailSubject);

    await MailPage.saveAttachmentInMyDocDir(tempFileName);

    await MailPage.goToDocPage();
    await DocumentsPage.dragDocumentInTrashDirectory(tempFileName);
    await DocumentsPage.treeMenu().goToTrashDirectory();
    await DocumentsPage.waitForDocumentInDirectory(tempFileName);
    await expect(DocumentsPage.documentsList().documentButton(tempFileName).locator,
      `error: file ${tempFileName} not found in trash directory`).toBeVisible();
  });


test.afterEach(async ({ context }) => {
  try {
    await context.tracing.stop({ path: 'test-results/traces/trace.zip' });
  } catch { }
  if (test.info().errors.length === 0) {
    await deleteFile(tempFilePath);
  }
});
