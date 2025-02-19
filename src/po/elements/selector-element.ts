import test, { Locator } from "@playwright/test";
import BaseElement from "./base-element";
import OptionElement from "./option-element";

export default class SelectorElement extends BaseElement {
    constructor(locator: Locator, name?: string) {
        super(locator, name)
    }

    async option(element: OptionElement) {
        return test.step(`Find child element of ${this.name} selector`, async () => {
            return this.locator.locator(element.locator);
        })
    }

    async selectOption(element: OptionElement) {
        return test.step(`Click on child element of ${this.name} selector`, async () => {
            return this.locator.locator(element.locator).click();
        })
    }
}