import test from "@playwright/test";

export function step(logMessage?: string) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    return async function replacementMethod(this: any, ...args: any) {
      const classOrInstance = this;
      const className = classOrInstance.constructor.name || this.name;
      const isStatic = typeof classOrInstance === 'function';
      const parentClassName = isStatic
        ? Object.getPrototypeOf(classOrInstance).name
        : Object.getPrototypeOf(classOrInstance.constructor).name;

      let name: string;
      let boxValue: boolean;
      if (parentClassName === 'BasePage' || parentClassName === 'BaseComponent') {
        name = `${logMessage}`;
        boxValue = false;
      } else if (parentClassName === 'BaseElement') {
        name = `${logMessage}: Element ${this.name} performing action ${String(context.name)}`;
        boxValue = true;
      } else {
        name = `${logMessage}: Unknown class ${className} - action ${String(context.name)}`;
        boxValue = false;
      }
      return test.step(name, async () => {
        return await target.apply(this, args);
      }, { box: boxValue });
    };
  };
}