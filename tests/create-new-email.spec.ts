import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
import { getEnvVar } from './helpers';
import path from 'path';

dotenv.config();
const login: string = getEnvVar('LOGIN');
const password: string = getEnvVar('PASSWORD');
const textForTest: string = getEnvVar('TEXTBOX_TEXT');
const emailSubject: string = getEnvVar('SUBJECT');
const fileName: string = getEnvVar('FILE_NAME');

const filePath = path.resolve(fileName);


test.describe('mailfence tests (eng loc)', async () => {

test.beforeEach('login', async ({ page }) => {
  await page.goto('https://mailfence.com/en/');
  await page.locator('//button[@id="signin"]').click();
  await page.locator('//input[@id="UserID"]').fill(login);
  await page.locator('//input[@id="Password"]').fill(password);
  await page.locator('//input[@value="Enter"]').click();
});

test.describe('mailfence tests', () => {

  test('create new email', async ({ page }) => {
    await page.locator('//*[@id="nav-mail"]').click();
    await page.locator('//*[@id="mailNewBtn"]').click();
    await page.locator('//*[@id="mailTo"]/input').fill(login + '@mailfence.com');
    await page.locator('//*[@id="mailSubject"]').fill(emailSubject);
    const frame = page.frameLocator('iframe.editable');
    await frame.locator('//*[@role="textbox"]').fill(textForTest);
    await page.locator('//*[text()="Attachment"]').click();
    await page.locator('input[type="file"]').setInputFiles(filePath);
    await page.locator(`//*[contains(text(), "${fileName}")]`)
      .waitFor({ state: 'visible' });
    await page.locator('//*[@id="mailSend"]').click();


    await page.locator('//*[@id="treeInbox"]').click();
    await page.waitForTimeout(5000);
    await page.locator('//*[@title="Refresh"]').click();
    await expect(page.locator(
      `//*[contains(@class, "listSubject") and @title="${emailSubject}"]`
    ).first()).toBeVisible();

    await page.locator(
      `//*[contains(@class, "listSubject") and @title="${emailSubject}"]`
    ).first().click();

    await page.locator(`//*[text()="${fileName}"]`).hover();
    await page.locator(
      `//*[text()="${fileName}"]/*[contains(@class, "icon-Arrow-down")]`
    ).click();

    await page.locator('//*[text()="Save in Documents"]').click();
    await page.locator('//*[text()="My documents"]')
      .waitFor({ state: 'attached' });
    await page.locator('//*[text()="My documents"]').click();
    await page.locator('#dialBtn_OK').waitFor({ state: 'attached' });
    await page.locator('#dialBtn_OK').click();

    await page.locator('//*[@id="nav-docs"]').click();
    await expect(page.locator(
      `//*[text()="${fileName}"]`
    )).toBeVisible();

    await page.locator(`//*[text()="${fileName}"]`)
      .waitFor({ state: 'attached' });
    await page.locator(`//*[text()="${fileName}"]`)
      .dragTo(page.locator('//*[@id="doc_tree_trash"]'));

    await page.waitForTimeout(2000);
    await page.locator('//*[@id="doc_tree_trash"]').click();
    await expect(page.locator(
      `//*[text()="${fileName}"]`
    )).toBeVisible();
  });

});

test.afterEach(async ({ page }) => {
  await page.close();
});