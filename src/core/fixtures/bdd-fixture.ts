import { test as base, createBdd } from 'playwright-bdd';
import { closePage, setPage } from '../page-utils';
import { TestOptions } from './page-fixture';
import { faker } from '@faker-js/faker';
import path from 'path';
import { createTextFile } from '../../utils/temp-files-helper';
import { PlaywrightTestArgs } from 'playwright/test';

export type Ctx = {
  emailSubject: string;
  testFilePath: string;
  testFile: {fileName: string, filePath: string};
};

export const test = base.extend<TestOptions & PlaywrightTestArgs, Ctx>({
  testHooks: [async ({ page }, use) => {
    setPage(page);
    await use('');
    await closePage();
  }, { auto: true }],

  emailSubject: [async ({}, use) => {
    const baseSubject = process.env.SUBJECT || 'Test Email';
    const emailSubject = baseSubject + faker.string.alpha(5);
    await use(emailSubject);
  }, { scope: 'worker' }],
  
  testFilePath: [async ({}, use) => {
    const testFilePath = path.resolve('../../.artefacts/');
    await use(testFilePath);
  }, { scope: 'worker' }],
  
  testFile: [async ({ testFilePath }, use) => {
    const testFile = await createTextFile(testFilePath);
    await use(testFile);
  }, { scope: 'worker' }]

});

export const { Given, When, Then } = createBdd(test);

