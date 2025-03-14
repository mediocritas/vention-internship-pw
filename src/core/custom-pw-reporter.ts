import type {
    FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult
} from '@playwright/test/reporter';

export default class CustomReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite) {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
    }

    onTestBegin(test: TestCase, result: TestResult) {
        console.log(`Starting test ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);
    }

    onEnd(result: FullResult) {
        console.log(`Finished the run: ${result.status}`);
    }

    onError(error: TestError) {
        console.log(`Finished the error: ${error.message}`);
    }

}