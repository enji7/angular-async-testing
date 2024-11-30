# Angular: Testing Asynchronous Code

This project contains systematic examples for the blog article 
[Angular: Asynchronous Testing Recipe](https://enji.systems/2024/12/09/angular-asynchronous-testing-recipe.html).

The code under test is contained in the following components:

 * [AsyncComponent](src/app/async/async.component.ts)
 * [ObservableComponent](src/app/observable/observable.component.ts)
 * [PromiseComponent](src/app/promise/promise.component.ts)
 * [SignalComponent](src/app/signal/signal.component.ts)

Each of these components has the following functions:

 * `immediate()`: Returns an asynchronous object (corresponding to the component's name) that is executed immediately. 
 * `delayed()`: Returns an asynchronous object (corresponding to the component's name) that is executed after a delay of 1 second (via setTimeout()).
 * `indirectImmediate()`: Invokes `immediate()`, and sets the components `value` variable to the resolved value.
 * `indirectDelayed()`: Invokes `immediate()`, and sets the components `value` variable to the resolved value.

The tests invoke these methods and assert the results using different mechanisms. Some of the tests fail
because not all mechanisms are suitable for testing each kind of asynchronous code. Also beware that some
tests seem to pass, but only because the contained assertions are not executed while the test is running.

The following tables provide an overview of the tests and their outcomes for each type of component. Abbreviations used:

 * n/a: not applicable
 * n/n: not necessary

## AsyncComponent / PromiseComponent

Since the `async` function declaration provides syntactic sugar for Promise handling, the tests and results for both components are identical.

| Test               | immediate() | delayed() | indirectImmediate() | indirectDelayed() |
|--------------------|-------------|-----------|---------------------|-------------------|
| basic              | &cross;     | &cross;   | &cross;             | &cross;           |
| async / await      | &check;     | &check;   | n/a                 | n/a               |
| callback           | &check;     | &check;   | &cross;             | &cross;           |
| waitForAsync       | &check;     | &check;   | &cross;             | &cross;           |
| + whenStable       | n/n         | n/n       | &check;             | &check;           |
| + await whenStable | n/n         | n/n       | &check;             | &check;           |
| fakeAsync          | &check;     | &check;   | &cross;             | &cross;           |
| + tick()           | n/n         | n/n       | &check;             | &cross;           |
| + tick(...)        | n/n         | n/n       | &check;             | &check;           |
| + flush            | n/n         | n/n       | &check;             | &check;           |
| + flushMicrotasks  | n/n         | n/n       | &check;             | &cross;           |

## ObservableComponent

| Test               | immediate() | delayed() | indirectImmediate() | indirectDelayed() |
|--------------------|-------------|-----------|---------------------|-------------------|
| basic              | &check;     | &cross;   | &check;             | &cross;           |
| callback           | &check;     | &check;   | &check;             | &cross;           |
| waitForAsync       | &check;     | &check;   | &check;             | &cross;           |
| + whenStable       | n/n         | n/n       | n/n                 | &check;           |
| + await whenStable | n/n         | n/n       | n/n                 | &check;           |
| fakeAsync          | &check;     | &check;   | &check;             | &cross;           |
| + tick()           | n/n         | n/n       | n/n                 | &cross;           |
| + tick(...)        | n/n         | n/n       | n/n                 | &check;           |
| + flush            | n/n         | n/n       | n/n                 | &cross;           |
| + flushMicrotasks  | n/n         | n/n       | n/n                 | &cross;           |

## SignalComponent

| Test               | immediate() | delayed() | indirectImmediate() | indirectDelayed() |
|--------------------|-------------|-----------|---------------------|-------------------|
| basic              | &check;     | &cross;   | &check;             | &cross;           |
| callback           | &check;     | &cross;   | &check;             | &cross;           |
| waitForAsync       | &check;     | &cross;   | &check;             | &cross;           |
| + whenStable       | n/n         | &check;   | n/n                 | &check;           |
| + await whenStable | n/n         | &check;   | n/n                 | &check;           |
| fakeAsync          | &check;     | &cross;   | &check;             | &cross;           |
| + tick()           | n/n         | &cross;   | n/n                 | &cross;           |
| + tick(...)        | n/n         | &check;   | n/n                 | &check;           |
| + flush            | n/n         | &check;   | n/n                 | &check;           |
| + flushMicrotasks  | n/n         | &cross;   | n/n                 | &cross;           |

