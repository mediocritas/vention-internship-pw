import { FrameLocator, Locator } from "@playwright/test";
import BaseElement from "./base-element";
import { step } from "../decorators/element-decorators";

export default class IFrameElement extends BaseElement {

    frameLocator: FrameLocator;

    constructor(locator: Locator, name?: string) {
        super(locator, name)
        this.frameLocator = locator.contentFrame();
    }

    @step('Get child element of iframe')
    async childElement<E extends BaseElement>(childElement: E) {
        return new (childElement.constructor as new (locator: Locator, name: string) => E)
            (this.frameLocator.locator(childElement.locator), childElement.name!);
    }
}