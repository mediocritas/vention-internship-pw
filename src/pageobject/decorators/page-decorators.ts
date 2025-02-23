import test from "@playwright/test";

export function step(logMessage?: string) {
  return function (target: any, context: ClassMethodDecoratorContext) {
    return async function replacementMethod(this: any, ...args: any) {
      const name = `${logMessage}: Page ${this.name} - action ${String(context.name)}`;
      return test.step(name, async () => {
        return await target.apply(this, args);
      });
    };
  };
}