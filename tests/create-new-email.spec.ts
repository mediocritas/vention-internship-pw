import { test, expect } from '@playwright/test';
import { testSettings } from '../playwright.config';
import { customDragTo } from './helpers';


test.describe('mailfence tests (eng loc)', async () => {

  test.beforeEach('login', async ({ page }) => {
    await page.goto(testSettings.baseURL);
    await page.locator('//button[@id="signin"]').click();
    await page.locator('//input[@id="UserID"]').fill(testSettings.envVars.login);
    await page.locator('//input[@id="Password"]').fill(testSettings.envVars.password);
    await page.locator('//input[@value="Enter"]').click();
  });

  test('create new email', async ({ page }) => {
    await page.locator('//*[@id="nav-mail"]').click();
    await page.locator('//*[@id="mailNewBtn"]').click();
    await page.locator('//*[@id="mailTo"]/input').fill(testSettings.envVars.login + '@mailfence.com');
    await page.locator('//*[@id="mailSubject"]').fill(testSettings.envVars.emailSubject);
    const frame = page.frameLocator('iframe.editable');
    await frame.locator('//*[@role="textbox"]').fill(testSettings.envVars.textForTest);
    await page.locator('//*[text()="Attachment"]').click();
    await page.locator('input[type="file"]').setInputFiles(testSettings.filePath);
    await page.locator(`//*[contains(text(), "${testSettings.envVars.fileName}")]`)
      .waitFor({ state: 'visible' });
    await page.locator('//*[@id="mailSend"]').click();

    await page.locator('//*[@id="treeInbox"]').click();

    for (let i = 0; i < testSettings.maxRetries; i++) {
      await page.locator('//*[@title="Refresh"]').click();

      if (await page.locator(
        `//*[contains(@class, "listSubject") and @title="${testSettings.envVars.emailSubject}"]`
      ).waitFor({ state: 'attached', timeout: 1000 }).then(() => true).catch(() => false)) {
        break;
      }
    }

    await page.locator(
      `//*[contains(@class, "listSubject") and @title="${testSettings.envVars.emailSubject}"]`
    ).first().click();

    await page.locator(`//*[text()="${testSettings.envVars.fileName}"]`).hover();
    await page.locator(
      `//*[text()="${testSettings.envVars.fileName}"]/*[contains(@class, "icon-Arrow-down")]`
    ).click();

    await page.locator('//*[text()="Save in Documents"]').click();
    await page.locator('//*[text()="My documents"]')
      .waitFor({ state: 'attached' });
    await page.locator('//*[text()="My documents"]').click();
    await page.waitForLoadState('load');
    await page.locator('#dialBtn_OK').waitFor({ state: 'visible' });

    for (let i = 0; i < testSettings.maxRetries; i++) {
      await page.waitForLoadState('load');
      await page.locator('#dialBtn_OK').click({ force: true });
      if (await page.locator('//*[text()="My documents"]')
        .isHidden({ timeout: 500 })) {
        break;
      }
    }

    await page.locator('//*[@id="nav-docs"]').click();

    const fileToDrag = page.locator(`//*[text()="${testSettings.envVars.fileName}"]`);
    const trashDirectory = page.locator(`//*[@id="doc_tree_trash"]`);
    await page.waitForLoadState('load');

    await fileToDrag.waitFor({ state: 'visible' });
    await trashDirectory.waitFor({ state: 'visible' });

    await customDragTo(fileToDrag, trashDirectory, page);

    await page.locator('//*[@id="doc_tree_trash"]').click();
    await expect(page.locator(
      `//*[text()="${fileName}"]`
    )).toBeVisible();
  });

});

test.afterEach(async ({ page }) => {
  await page.close();
});