import { Locator } from "@playwright/test";
import BaseElement from "./base-element";
import { step } from "../decorators/playwright-decorators";

export default class InputElement extends BaseElement {

    constructor(locator: Locator, name?: string) {
        super(locator, name);
    }

    @step('Input into the element')
    async fill(text: string) {
        return this.locator.fill(text);
    }
}