import BasePage from './base-page';
import ButtonElement from '../elements/button-element';
import InputElement from '../elements/input-element';
import { getPage } from '../../core/page-utils';
import { step } from '../decorators/page-decorators';

export default class MainPage extends BasePage {
    static readonly url: string = process.env.BASE_URL!;
    static readonly loginButton = () =>
        new ButtonElement(getPage().locator('//button[@id="signin"]'), 'SigninButton');
    static readonly usernameInput = () =>
        new InputElement(getPage().locator('//input[@id="UserID"]'), 'UsernameInput')
    static readonly passwordInput = () =>
        new InputElement(getPage().locator('//input[@id="Password"]'), 'PasswordInput')
    static readonly enterButton = () =>
        new ButtonElement(getPage().locator('//input[@value="Enter"]'), 'GetLoginButton')

    @step('Go to the MainPage')
    static async navigate() {
        await super.goto(this.url);
    }

    @step('Login on website')
    static async toLogin(login: string, password: string) {
        await this.loginButton().click();
        await this.usernameInput().fill(login);
        await this.passwordInput().fill(password);
        await this.enterButton().click();
    }
}