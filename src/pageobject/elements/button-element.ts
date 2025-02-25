import { Locator } from "@playwright/test";
import BaseElement from "./base-element";
import { step } from "../decorators/playwright-decorators";

export default class ButtonElement extends BaseElement {
    constructor(locator: Locator, name?: string) {
        super(locator, name)
    }

    @step('Check if the element is enabled')
    async isEnabled() {
        return this.locator.isEnabled();
    }
}