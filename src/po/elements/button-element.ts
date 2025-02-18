import test, { Locator } from "@playwright/test";
import BaseElement from "./base-element";

export default class ButtonElement extends BaseElement {
    constructor(locator: Locator, name?: string) {
        super(locator, name)
    }

    async isEnabled() {
        return test.step(`Check if element ${this.name} is enabled`, async () => {
            return this.locator.isEnabled();
        });
    }
}