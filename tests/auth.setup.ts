import { test as setup } from '../src/core/fixtures/page-fixture';
import { expect } from '@playwright/test';
import MainPage from '../src/pageobject/pages/main-page';
import { getPage } from '../src/core/page-utils';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import MailPage from '../src/pageobject/pages/mail-page';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const authFile = path.join(__dirname, '../.auth/user.json');


setup('authenticate', async ({ }) => {
    await MainPage.navigate();
    await MainPage.toLogin(process.env.LOGIN!, process.env.PASSWORD!);
    await expect(MailPage.funcPanel().newMessageButton().locator).toBeVisible();
    await getPage().context().storageState({ path: authFile });
});