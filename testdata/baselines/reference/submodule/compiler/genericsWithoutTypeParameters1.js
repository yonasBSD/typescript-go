//// [tests/cases/compiler/genericsWithoutTypeParameters1.ts] ////

//// [genericsWithoutTypeParameters1.ts]
class C<T> {
    foo(): T { return null }
}

interface I<T> {
    bar(): T;
}

var c1: C;
var i1: I;
var c2: C<I>;
var i2: I<C>;

function foo(x: C, y: I) { }
function foo2(x: C<I>, y: I<C>) { }

var x: { a: C } = { a: new C<number>() };
var x2: { a: I } = { a: { bar() { return 1 } } };

class D<T> {
    x: C;
    y: D;
}

interface J<T> {
    x: I;
    y: J;
}

class A<T> { }
function f<T>(x: T): A {
    return null;
}

//// [genericsWithoutTypeParameters1.js]
class C {
    foo() { return null; }
}
var c1;
var i1;
var c2;
var i2;
function foo(x, y) { }
function foo2(x, y) { }
var x = { a: new C() };
var x2 = { a: { bar() { return 1; } } };
class D {
    x;
    y;
}
class A {
}
function f(x) {
    return null;
}
