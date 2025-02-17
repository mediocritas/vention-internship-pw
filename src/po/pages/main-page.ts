import { type Locator, type Page } from '@playwright/test';
import BasePage from './base-page';

export default class MainPage extends BasePage{
    readonly url: string;
    readonly loginButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly enterButton: Locator;
    constructor(page: Page, url: string) {
        super(page);
        this.url = url;
        this.loginButton = page.locator('//button[@id="signin"]');
        this.usernameInput = page.locator('//input[@id="UserID"]');
        this.passwordInput = page.locator('//input[@id="Password"]');
        this.enterButton = page.locator('//input[@value="Enter"]');
    }

    async navigate() {
        await super.goto(this.url);
    }

    async getLogin(login : string, password : string) {
        await this.page.locator('#signin').click();
        await this.page.locator('#UserID').fill(login);
        await this.page.locator('#Password').fill(password);
        await this.page.locator('input[value="Enter"]').click();
    }

    
}