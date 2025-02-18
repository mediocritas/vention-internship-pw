import test, { FrameLocator, Locator } from "@playwright/test";
import BaseElement from "./base-element";
import InputElement from "./input-element";
import TextareaElement from "./text-area-element";

export default class IFrameElement extends BaseElement{

    frameLocator: FrameLocator;
    
    constructor(locator: Locator, name?: string) {
        super(locator, name)
        this.frameLocator = locator.contentFrame();
    }

    async childElement<E extends BaseElement>(childElement: E){
        return test.step(`Get child element of ${this.name!} iframe`, async () => {
            return new (childElement.constructor as new (locator: Locator, name: string) => E)
            (this.frameLocator.locator(childElement.locator), childElement.name!);
        })
    }
}