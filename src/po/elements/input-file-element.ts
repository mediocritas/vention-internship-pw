import test, { Locator } from "@playwright/test";
import BaseElement from "./base-element";

export default class InputFileElement extends BaseElement {

    constructor(locator: Locator, name?: string) {
        super(locator, name);
    }

    async setInputFiles(filePath: string) {
        return await test.step(`Fill the ${this.name} file input element`, async () => {
            return this.locator.setInputFiles(filePath);
        });
    }
}