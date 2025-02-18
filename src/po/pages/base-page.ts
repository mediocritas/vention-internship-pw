import { Page } from '@playwright/test';

export default class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }
}

/* function step(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...args: any) {
      const name = this.constructor.name + '.' + (context.name as string);
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  } */