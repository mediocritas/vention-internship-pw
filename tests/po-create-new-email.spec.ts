import { expect } from '@playwright/test';
import { test } from './fixtures/page-fixture'
import path from 'path';
import { faker } from '@faker-js/faker';
import { createFileCopy, createFilePath, deleteFile } from '../src/utils/temp-files-helper';
import PageFactory from '../src/pageobject/pages/page-factory';

const emailSubject = process.env.SUBJECT! + faker.string.alpha(5);

const seedFilePath = path.resolve('.artefacts/' + process.env.FILE_NAME!);
const sourceFilePath = path.resolve(process.env.FILE_NAME!);
let tempFilePath: string;
let testFileName: string;

test.describe('mailfence tests (eng loc)', async () => {

  test.beforeEach('login', async ({ }) => {
    tempFilePath = await createFilePath(seedFilePath);
    testFileName = await createFileCopy(sourceFilePath, tempFilePath);
    const mainPage = PageFactory.getMainPage();
    await mainPage.navigate();
    await mainPage.toLogin(process.env.LOGIN!, process.env.PASSWORD!);
  });

  test('create new email', async ({ }) => {
    const mailPage = PageFactory.getMailPage();
    const newMailPage = await mailPage.goToNewEmailPage();
    await newMailPage.sendNewEmail(
      {
        addressee: process.env.LOGIN + process.env.DOMAIN!,
        emailSubject: emailSubject,
        textMessage: faker.string.alpha(10),
        filePath: tempFilePath,
        fileName: testFileName
      }
    )

    await mailPage.waitUntilNewEmailAppears(emailSubject);
    await mailPage.openEmail(emailSubject);

    await mailPage.saveAttachmentInMyDocDir(testFileName);

    const docPage = await mailPage.goToDocPage();
    await docPage.dragDocumentInTrashDirectory(testFileName);
    await docPage.treeMenu().goToTrashDirectory();
    await docPage.waitForDocumentInTrashDirectory(testFileName);
    await expect(docPage.documentsList().documentButton(testFileName).locator,
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
