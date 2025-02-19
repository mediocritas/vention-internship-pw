import test, { Locator } from "@playwright/test";
import BaseElement from "./base-element";

export default class OptionElement extends BaseElement {
    constructor(locator: Locator, name?: string) {
        super(locator, name)
    }
}