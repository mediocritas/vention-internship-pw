import { expect } from '@playwright/test';
import { test } from '../src/core/fixtures/page-fixture'
import { faker } from '@faker-js/faker';
import MailPage from '../src/pageobject/pages/mail-page';
import DocumentsPage from '../src/pageobject/pages/documents-page';
import NewMailPage from '../src/pageobject/pages/new-mail-page';
import * as allure from 'allure-js-commons';

const emailSubject = process.env.SUBJECT! + faker.string.alpha(5);

test('create new email', async ({ testFile }) => {
  await allure.description("This test attempts whole email attachement scenario");
  await allure.step('Navigate to Mail Page', async () => {
    await MailPage.navigate();
  });
  await allure.step('Click on the New button to create new email', async () => {
    await MailPage.goToNewEmailPage();
  });
  await allure.step('Create and send new email', async () => {
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

  await allure.step('Open new email', async () => {
    await MailPage.waitUntilNewEmailAppears(emailSubject);
    await MailPage.openEmail(emailSubject);
  });

  await allure.step('Save file attch in My Documents', async () => {
    await MailPage.saveAttachmentInMyDocDir(testFile!.fileName);
  });
  await allure.step('Navigate to Documents page directory', async () => {
    await MailPage.goToDocPage();
  });
  await allure.step('Drag attch to Trash directory', async () => {
    await DocumentsPage.dragDocumentToTrashDirectory(testFile!.fileName);
  });
  await allure.step('Navigate to Trash page directory', async () => {
    await DocumentsPage.treeMenu().goToTrashDirectory();
  });
  await allure.step('Ensure that attch file has been moved to Trash directory', async () => {
    await expect(DocumentsPage.documentsList().documentButton(testFile!.fileName).locator,
      `error: file ${testFile!.fileName} not found in trash directory`).toBeVisible();
  });
});

test('create new email copy', async ({ testFile }) => {
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

