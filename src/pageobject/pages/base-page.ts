import { getPage } from '../../core/page-utils';

export default class BasePage {

    constructor() {
    }

    async goto(url: string) {
        await getPage().goto(url);
    }
}
