import { getPage } from '../../core/page-utils';

export default abstract class BasePage {

    protected constructor() {
    }

    static async goto(url: string) {
        await getPage().goto(url);
    }
}
