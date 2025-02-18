import { Page } from '@playwright/test';
import BasePage from './base-page';
import ButtonElement from '../elements/button-element';
import InputElement from '../elements/input-element';

export default class MainPage extends BasePage {
    readonly url: string;
    readonly loginButton = () =>
        new ButtonElement(this.page.locator('//button[@id="signin"]'), 'signin');
    readonly usernameInput = () =>
        new InputElement(this.page.locator('//input[@id="UserID"]'), 'username')
    readonly passwordInput = () =>
        new InputElement(this.page.locator('//input[@id="Password"]'), 'password')
    readonly enterButton = () =>
        new InputElement(this.page.locator('//input[@value="Enter"]'), 'to_login')

    constructor(page: Page, url: string) {
        super(page);
        this.url = process.env.BASE_URL!;
    }

    async navigate() {
        await super.goto(this.url);
    }

    async getLogin(login: string, password: string) {
        await this.loginButton().click();
        await this.usernameInput().fill(login);
        await this.passwordInput().fill(password);
        await this.enterButton().click();
    }


}