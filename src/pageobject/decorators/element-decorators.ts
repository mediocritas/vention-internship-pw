import test from "@playwright/test";

export function step(logMessage?: string) {
  return function (target: any, context: ClassMethodDecoratorContext) {
    return async function replacementMethod(this: any, ...args: any) {
      const name = `${logMessage}: Element ${this.name} of type ${this.constructor.name} - action ${String(context.name)}`;
      return test.step(name, async () => {
        return await target.apply(this, args);
      });
    };
  };
}