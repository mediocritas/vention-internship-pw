import { test, expect } from '@playwright/test';
import path from 'path';
import { faker } from '@faker-js/faker';
import { createFileCopy, createFilePath, deleteFile } from './utils/temp-files-helper';
import MainPage from '../src/po/pages/main-page';
import MailPage from '../src/po/pages/mail-page';
import DocumentsPage from '../src/po/pages/documents-page';
import NewMailPage from '../src/po/pages/new-mail-page';

const emailSubject = process.env.SUBJECT! + faker.string.alpha(5);

const seedFilePath = path.resolve(process.env.FILE_NAME!);
let tempFilePath: string;

let mainPage: MainPage;
let mailPage: MailPage;
let newMailPage: NewMailPage;
let docPage: DocumentsPage;

test.describe('mailfence tests (eng loc)', async () => {

  test.beforeEach('login', async ({ page }) => {
    tempFilePath = await createFilePath(seedFilePath);
    mainPage = new MainPage(page, process.env.BASE_URL!);
    await mainPage.navigate();
    await mainPage.toLogin(process.env.LOGIN!, process.env.PASSWORD!)
  });

  test('create new email', async ({ page }) => {
    mailPage = new MailPage(page);
    newMailPage = await mailPage.goToNewEmailPage();
    const testFile = await createFileCopy(seedFilePath, tempFilePath);
    await newMailPage.sendNewEmail(
      {
        addressee: process.env.LOGIN + process.env.DOMAIN!,
        emailSubject: emailSubject,
        textMessage: process.env.TEXTBOX_TEXT!,
        filePath: tempFilePath,
        fileName: testFile
      }
    )

    await mailPage.waitUntilNewEmailAppears(emailSubject);
    await mailPage.openEmail(emailSubject);

    await mailPage.saveAttachmentInMyDocDir(testFile);

    docPage = await mailPage.goToDocPage();
    await docPage.dragDocumentInTrashDirectory(testFile);
    await docPage.treeMenu().goToTrashDirectory();
    await docPage.waitForDocumentInTrashDirectory(testFile);
    await expect(docPage.documentsList().documentButton(testFile).locator).toBeVisible();
  });

});

test.afterEach(async ({ page, context }) => {
  try {
    await context.tracing.stop({ path: 'test-results/traces/trace.zip' });
  } catch { }
  await page.close();
  if (test.info().errors.length === 0) {
    await deleteFile(tempFilePath);
  }
});
