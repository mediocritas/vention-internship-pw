import { test, expect } from '@playwright/test';
import { customDragTo } from './helpers';
import path from 'path';

const seedFilePath = path.resolve(process.env.FILE_NAME!);
let tempFilePath: string;

test.describe('mailfence tests (eng loc)', async () => {

  test.beforeEach('login', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await page.locator('#signin').click();
    await page.locator('#UserID').fill(process.env.LOGIN!);
    await page.locator('#Password').fill(process.env.PASSWORD!);
    await page.locator('input[value="Enter"]').click();
  });

  test('create new email', async ({ page }) => {
    await page.locator('#nav-mail').click();
    await page.locator('#mailNewBtn').click();
    await page.locator('#mailTo input').fill(process.env.LOGIN + process.env.DOMAIN!);
    await page.locator('#mailSubject').fill(emailSubject);
    const frame = page.frameLocator('iframe.editable');
    await frame.locator('[role="textbox"]').fill(process.env.TEXTBOX_TEXT!);
    await page.locator('//*[text()="Attachment"]').click();
    const testFile = await createFileCopy(seedFilePath, tempFilePath);
    await page.locator('input[type="file"]').setInputFiles(tempFilePath!);
    await page.locator(`//*[contains(text(), "${testFile}")]`)
      .waitFor({ state: 'visible' });
    await page.locator('#mailSend').click();

    await page.locator('#treeInbox').click();
    await page.locator('[title="Refresh"]').click();

    for (let i = 0; i < parseInt(process.env.MAX_RETRIES!, 10); i++) {
      await page.locator('[title="Refresh"]').click();
      if (await page.locator(
        `.listSubject[title="${process.env.SUBJECT}"]`
      ).first().waitFor({ state: 'visible', timeout: 1000 }).then(() => true).catch(() => false)) {
        break;
      }
    }

    await page.locator(
      `.listSubject[title="${emailSubject}"]`
    ).click();

    await page.locator(`//*[text()="${testFile}"]`).hover();
    await page.locator(
      `//*[text()="${testFile}"]/*[contains(@class, "icon-Arrow-down")]`
    ).click();

    await page.locator('//*[text()="Save in Documents"]').click();
    await page.locator('//*[text()="My documents"]')
      .waitFor({ state: 'attached' });
    await page.locator('//*[text()="My documents"]').click();
    await page.locator('#dialBtn_OK').waitFor({ state: 'visible' });

    for (let i = 0; i < parseInt(process.env.MAX_RETRIES!, 10); i++) {
      await page.waitForLoadState('load');
      await page.locator('#dialBtn_OK').click({ force: true });
      if (await page.locator('//*[text()="My documents"]')
        .isHidden({ timeout: 300 })) {
        break;
      }
    }

    await page.locator('#nav-docs').click();

    const fileToDrag = page.locator(`//*[text()="${testFile}"]/../..`);
    await fileToDrag.scrollIntoViewIfNeeded();
    const trashDirectory = page.locator('#doc_tree_trash');

    await fileToDrag.waitFor({ state: 'visible' });
    await trashDirectory.waitFor({ state: 'visible' });

    await customDragTo(fileToDrag, trashDirectory, page);

    await page.locator('#doc_tree_trash').click();
    await page.locator('[title="Refresh"]').click();
    await page.waitForLoadState('load');
    await page.screenshot({ path: 'test-results/screenshots/trashScreenshot.png' });
    await fileToDrag.scrollIntoViewIfNeeded();
    await expect(fileToDrag).toBeVisible();
  });

});

test.afterEach(async ({ page, context }) => {
  try {
    await context.tracing.stop({ path: 'test-results/traces/trace.zip' });
  } catch { }
  await page.close();
  await deleteFile(tempFilePath);
});
