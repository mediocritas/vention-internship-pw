import test, { Locator } from "@playwright/test";
import BaseElement from "./base-element";

export default class TextareaElement extends BaseElement {

    constructor(locator: Locator, name?: string) {
        super(locator, name);
    }

    async fill(text: string) {
        return await test.step(`Fill the ${this.name} textarea element`, async () => {
            return this.locator.fill(text);
        });
    }
}