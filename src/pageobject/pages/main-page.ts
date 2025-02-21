import BasePage from './base-page';
import ButtonElement from '../elements/button-element';
import InputElement from '../elements/input-element';
import { getPage } from '../../core/page-utils';

export default class MainPage extends BasePage {
    readonly url: string = process.env.BASE_URL!;
    readonly loginButton = () =>
        new ButtonElement(getPage().locator('//button[@id="signin"]'), 'SigninButton');
    readonly usernameInput = () =>
        new InputElement(getPage().locator('//input[@id="UserID"]'), 'UsernameInput')
    readonly passwordInput = () =>
        new InputElement(getPage().locator('//input[@id="Password"]'), 'PasswordInput')
    readonly enterButton = () =>
        new ButtonElement(getPage().locator('//input[@value="Enter"]'), 'GetLoginButton')

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