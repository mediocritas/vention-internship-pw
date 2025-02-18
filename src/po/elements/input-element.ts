import test, { Locator } from "@playwright/test";
import BaseElement from "./base-element";

export default class InputElement extends BaseElement {

    constructor(locator: Locator, name?: string) {
        super(locator, name);
    }

    async fill(text: string) {
        return await test.step(`Fill the ${this.name} input element`, async () => {
            return this.locator.fill(text);
        });
    }
}