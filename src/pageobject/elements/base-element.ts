import { Locator } from "@playwright/test";
import { step } from "../decorators/playwright-decorators";
import { getPage } from "../../core/page-utils";

export default class BaseElement {

    locator: Locator;
    name: string | undefined;

    constructor(locator: Locator, name?: string) {
        this.locator = locator;
        this.name = name || (this.constructor.name + locator);
    }

    @step('Click on the element')
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

    @step('Drag element to the target element')
    async customDragTo(target: BaseElement) {
        await target.waitForVisible();
        const targetElementBox = (await target.box())!;

        try {
            await this.hover();
            await getPage().mouse.down();
            await getPage().mouse.move(
                targetElementBox.x,
                targetElementBox.y,
                { steps: 30 }
            );
            await target.waitForVisible();
            await getPage().mouse.up();
        } catch (error) {
            console.error(`Elements or elements' boxes don't exist`)
            throw error;
        }
    }
}