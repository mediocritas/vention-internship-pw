import { test, expect } from '@playwright/test';
import { customDragTo } from './helpers';
import path from 'path';

const filePath = path.resolve(process.env.FILE_NAME!);

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
    await page.locator('#mailSubject').fill(process.env.SUBJECT!);
    const frame = page.frameLocator('iframe.editable');
    await frame.locator('[role="textbox"]').fill(process.env.TEXTBOX_TEXT!);
    await page.locator('//*[text()="Attachment"]').click();
    await page.locator('input[type="file"]').setInputFiles(filePath!);
    await page.locator(`//*[contains(text(), "${process.env.FILE_NAME}")]`)
      .waitFor({ state: 'visible' });
    await page.locator('#mailSend').click();

    await page.locator('#treeInbox').click();

    for (let i = 0; i < parseInt(process.env.MAX_RETRIES!, 10); i++) {
      await page.locator('[title="Refresh"]').click();

      if (await page.locator(
        `.listSubject[title="${process.env.SUBJECT}"]`
      ).waitFor({ state: 'attached', timeout: 1000 }).then(() => true).catch(() => false)) {
        break;
      }
    }

    await page.locator(
      `.listSubject[title="${process.env.SUBJECT}"]`
    ).first().click();

    await page.locator(`//*[text()="${process.env.FILE_NAME}"]`).hover();
    await page.locator(
      `//*[text()="${process.env.FILE_NAME}"]/*[contains(@class, "icon-Arrow-down")]`
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

    const fileToDrag = page.locator(`//*[text()="${process.env.FILE_NAME}"]/../..`);
    const trashDirectory = page.locator('#doc_tree_trash');

    await fileToDrag.waitFor({ state: 'visible' });
    await trashDirectory.waitFor({ state: 'visible' });

    await customDragTo(fileToDrag, trashDirectory, page);

    await page.locator('#doc_tree_trash').click();
    await page.locator('[title="Refresh"]').click(); 
    await expect(
      fileToDrag
    ).toBeVisible();
  });

});

test.afterEach(async ({ page }) => {
  await page.close();
});
