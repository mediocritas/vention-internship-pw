import { Locator } from "@playwright/test";
import BaseElement from "./base-element";
import { step } from "../decorators/playwright-decorators";

export default class InputFileElement extends BaseElement {

    constructor(locator: Locator, name?: string) {
        super(locator, name);
    }

    @step('Input file into the element')
    async setInputFiles(filePath: string) {
        return this.locator.setInputFiles(filePath);
    }
}