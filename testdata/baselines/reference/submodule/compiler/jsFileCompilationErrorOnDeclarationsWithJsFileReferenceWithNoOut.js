//// [tests/cases/compiler/jsFileCompilationErrorOnDeclarationsWithJsFileReferenceWithNoOut.ts] ////

//// [a.ts]
class c {
}

//// [b.ts]
/// <reference path="c.js"/>
// b.d.ts should have c.d.ts as the reference path
function foo() {
}

//// [c.js]
function bar() {
}

//// [a.js]
class c {
}
//// [c.js]
function bar() {
}
//// [b.js]
/// <reference path="c.js"/>
// b.d.ts should have c.d.ts as the reference path
function foo() {
}


//// [a.d.ts]
declare class c {
}
//// [c.d.ts]
declare function bar(): void;
//// [b.d.ts]
// b.d.ts should have c.d.ts as the reference path
declare function foo(): void;
