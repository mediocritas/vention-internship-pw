import { test as base, createBdd } from 'playwright-bdd';
import { closePage, setPage } from '../page-utils';
import { TestOptions } from './page-fixture';
import { faker } from '@faker-js/faker';
import path from 'path';

export type Context = {
  emailSubject: string;
  testFilePath: string;
};

export const test = base.extend<TestOptions, Context>({
  testHooks: [async ({ page }, use) => {
    setPage(page);
    await use('');
    await closePage();
  }, { auto: true }],

  emailSubject: [async ({ }, use) => {
    const baseSubject = process.env.SUBJECT!;
    const emailSubject = baseSubject + faker.string.alpha(5);
    await use(emailSubject);
  }, { scope: 'worker' }],

  testFilePath: [async ({ }, use) => {
    const testFilePath = path.resolve('../../.artefacts/');
    await use(testFilePath);
  }, { scope: 'worker' }],
});

export const { Given, When, Then } = createBdd(test);