import { Page } from '@playwright/test';
import BasePage from './base-page';
import ButtonElement from '../elements/button-element';
import InputElement from '../elements/input-element';

export default class MainPage extends BasePage {
    readonly url: string;
    readonly loginButton = () =>
        new ButtonElement(this.page.locator('//button[@id="signin"]'), 'SigninButton');
    readonly usernameInput = () =>
        new InputElement(this.page.locator('//input[@id="UserID"]'), 'UsernameInput')
    readonly passwordInput = () =>
        new InputElement(this.page.locator('//input[@id="Password"]'), 'PasswordInput')
    readonly enterButton = () =>
        new ButtonElement(this.page.locator('//input[@value="Enter"]'), 'GetLoginButton')

    constructor(page?: Page, url?: string) {
        super(page);
        this.url = process.env.BASE_URL!;
    }

    async navigate() {
        await super.goto(this.url);
    }

    async toLogin(login: string, password: string) {
        await this.loginButton().click();
        await this.usernameInput().fill(login);
        await this.passwordInput().fill(password);
        await this.enterButton().click();
    }


}