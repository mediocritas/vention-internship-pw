import { Page, Locator } from '@playwright/test';

export const customDragTo = async (source: Locator, target: Locator, page: Page) => {

    const sourceElementBox = (await source.boundingBox());
    const targetElementBox = (await target.boundingBox());
    if (sourceElementBox && targetElementBox) {
        await source.hover();
        await page.mouse.down();
        await page.mouse.move(
            targetElementBox.x,
            targetElementBox.y,
            { steps: 15 }
        );
        await target.waitFor({ state: 'visible' });
        await page.mouse.up();
    }
}

