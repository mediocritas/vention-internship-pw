import { Page, Locator } from '@playwright/test';

export const customDragTo = async (source: Locator, target: Locator, page: Page) => {

    const sourceElementBox = (await source.boundingBox());
    const targetElementBox = (await target.boundingBox());
    if (sourceElementBox && targetElementBox) {
        await source.hover();
        await page.mouse.down();
        const steps = 10;
        for (let i = 0; i <= steps; i++) {
            await page.mouse.move(
                sourceElementBox.x + (targetElementBox.x - sourceElementBox.x) * (i / steps),
                sourceElementBox.y + (targetElementBox.y - sourceElementBox.y) * (i / steps)
            );
            await target.waitFor({ state: 'visible' });

        }
        await target.waitFor({ state: 'visible' });
        await page.mouse.up();
    }


}