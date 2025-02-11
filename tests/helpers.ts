import { Page, Locator } from '@playwright/test';

export const customDragTo = async (source: Locator, target: Locator, page: Page) => {

    const sourceElementBox = (await source.boundingBox());
    const targetElementBox = (await target.boundingBox());
    if (sourceElementBox && targetElementBox) {
        await source.hover();
        await page.mouse.down();
        await page.mouse.move(
            sourceElementBox.x + sourceElementBox.width / 2, 
            sourceElementBox.y + sourceElementBox.height / 2
        );
        await page.mouse.move(
            targetElementBox.x + targetElementBox.width / 2, 
            targetElementBox.y + targetElementBox.height / 2
        );

        await target.waitFor({ state: 'visible' });
        await page.mouse.up();
    }
}