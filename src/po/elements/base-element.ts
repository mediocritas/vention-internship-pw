import test, { Locator } from "@playwright/test";

function step(target: any, context: ClassMethodDecoratorContext) {
  return function replacementMethod(this: any, ...args: any) {
    const name = `${this.constructor.name} ${this.name} ${String(context.name)}`;
    return test.step(name, async () => {
      return await target.apply(this, args);
    });
  };
}

export default class BaseElement {

    locator: Locator;
    name: string | undefined;

    constructor(locator: Locator, name?: string) {
        this.locator = locator;
        this.name = name;
    }

    @step
    async click(options?: { force?: boolean, timeout?: number }) {
        const finalOptions = {
            ...options,  
            force: options?.force || false 
        };
            return this.locator.click(finalOptions);
    }

    async hover(options?: { timeout?: number }) {
        return await test.step(`Hover on the ${this.name} element`, async () => {
            return this.locator.hover(options);
        });
    }

    async scrollIntoView(options?: { timeout?: number }) {
        return await test.step(`Scroll to the ${this.name} element`, async () => {
            return this.locator.scrollIntoViewIfNeeded(options);
        });
    }

    async waitForVisible(options?: { timeout?: number }) {
        return await test.step(`Wait for the ${this.name} element to be visible`, async () => {
            return this.locator.waitFor({ state: 'visible', timeout: options?.timeout });
        });
    }

    async waitForAttached(options?: { timeout?: number }) {
        return await test.step(`Wait for the ${this.name} element to be attached`, async () => {
            return this.locator.waitFor({ state: 'attached', timeout: options?.timeout });
        });
    }

    async isVisible(options?: { timeout?: number }) {
        return await test.step(`Check if element ${this.name} is visible`, async () => {
            return this.locator.isVisible(options);
        });
    }

    async isHidden(options?: { timeout?: number }) {
        return await test.step(`Check if element ${this.name} is hidden`, async () => {
            return this.locator.isHidden(options);
        });
    }

    async box(options?: { timeout?: number }) {
        return await test.step(`Get box of the element ${this.name}`, async () => {
            return await this.locator.boundingBox(options);
        });
    }
}