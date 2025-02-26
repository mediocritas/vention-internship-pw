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

let testFile;

test.beforeEach('login', async ({ }) => {
  testFile = await createTextFile(testFilePath);
});

test('create new email', async ({ }) => {
  await MailPage.navigate();
  await MailPage.goToNewEmailPage();
  await NewMailPage.sendNewEmail(
    {
      addressee: process.env.LOGIN + process.env.DOMAIN!,
      emailSubject: emailSubject,
      textMessage: faker.string.alpha(10),
      filePath: testFile!.filePath,
      fileName: testFile!.fileName
    }
  )

  await MailPage.waitUntilNewEmailAppears(emailSubject);
  await MailPage.openEmail(emailSubject);

  await MailPage.saveAttachmentInMyDocDir(testFile!.fileName);

  await MailPage.goToDocPage();
  await DocumentsPage.dragDocumentToTrashDirectory(testFile!.fileName);
  await DocumentsPage.treeMenu().goToTrashDirectory();
  await DocumentsPage.waitForDocumentInDirectory(testFile!.fileName);
  await expect(DocumentsPage.documentsList().documentButton(testFile!.fileName).locator,
    `error: file ${testFile!.fileName} not found in trash directory`).toBeVisible();
});

test('create new email copy', async ({ }) => {
  await MailPage.navigate();
  await MailPage.goToNewEmailPage();
  await NewMailPage.sendNewEmail(
    {
      addressee: process.env.LOGIN + process.env.DOMAIN!,
      emailSubject: emailSubject,
      textMessage: faker.string.alpha(10),
      filePath: testFile!.filePath,
      fileName: testFile!.fileName
    }
  )

  await MailPage.waitUntilNewEmailAppears(emailSubject);
  await MailPage.openEmail(emailSubject);

  await MailPage.saveAttachmentInMyDocDir(testFile!.fileName);

  await MailPage.goToDocPage();
  await DocumentsPage.dragDocumentToTrashDirectory(testFile!.fileName);
  await DocumentsPage.treeMenu().goToTrashDirectory();
  await DocumentsPage.waitForDocumentInDirectory(testFile!.fileName);
  await expect(DocumentsPage.documentsList().documentButton(testFile!.fileName).locator,
    `error: file ${testFile!.fileName} not found in trash directory`).toBeVisible();
});


test.afterEach(async ({ }) => {
  if (test.info().errors.length === 0) {
    await deleteFile(testFile!.filePath);
  }
});
