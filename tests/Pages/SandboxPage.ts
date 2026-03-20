import {type Locator, type Page} from '@playwright/test';

export class SandboxPage {
    readonly page: Page;
    readonly pastaCheckbox: Locator;

    constructor (page: Page) {
        this.page = page;
        this.pastaCheckbox = page.getByRole('checkbox', { name: 'Pasta 🍝' });
    }

    async checkPasta (){
        await this.pastaCheckbox.check();
    }
}
