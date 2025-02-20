import { Locator } from "@playwright/test";
import { step } from "../decorators/element-decorators";

export default class BaseElement {

    locator: Locator;
    name: string | undefined;

    constructor(locator: Locator, name?: string) {
        this.locator = locator;
        this.name = name || (this.constructor.name + locator);
    }

    @step('Clicking on the element')
    async click(options?: { force?: boolean, timeout?: number }) {
        const finalOptions = {
            ...options,
            force: options?.force || false
        };
        return this.locator.click(finalOptions);
    }

    @step('Hover on the element')
    async hover(options?: { timeout?: number }) {
        return this.locator.hover(options);
    }

    @step('Scroll to the element')
    async scrollIntoView(options?: { timeout?: number }) {
        return this.locator.scrollIntoViewIfNeeded(options);
    }

    @step('Wait for the element is visible')
    async waitForVisible(options?: { timeout?: number }) {
        return this.locator.waitFor({ state: 'visible', timeout: options?.timeout });
    }

    @step('Wait for the element is attached')
    async waitForAttached(options?: { timeout?: number }) {
        return this.locator.waitFor({ state: 'attached', timeout: options?.timeout });
    }

    @step('Check if the element is visible')
    async isVisible(options?: { timeout?: number }) {
        return this.locator.isVisible(options);
    }

    @step('Check if the element is hidden')
    async isHidden(options?: { timeout?: number }) {
        return this.locator.isHidden(options);
    }

    @step('Get the box of the element')
    async box(options?: { timeout?: number }) {
        return await this.locator.boundingBox(options);
    }
}