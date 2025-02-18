import { Page } from '@playwright/test';
import BaseElement from '../../src/po/elements/base-element';

export const customDragTo = async (source: BaseElement, target: BaseElement, page: Page) => {

    const sourceElementBox = await source.box();
    const targetElementBox = await target.box();
    if (sourceElementBox && targetElementBox) {
        await source.hover();
        await page.mouse.down();
        await page.mouse.move(
            targetElementBox.x,
            targetElementBox.y,
            { steps: 20 }
        );
        await target.waitForVisible();
        await page.mouse.up();
    }
}

