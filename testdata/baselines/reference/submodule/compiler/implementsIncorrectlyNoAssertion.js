//// [tests/cases/compiler/implementsIncorrectlyNoAssertion.ts] ////

//// [implementsIncorrectlyNoAssertion.ts]
declare class Foo {
    x: string;
}
declare class Bar {
    y: string;
}
type Wrapper = Foo & Bar;
class Baz implements Wrapper {
    x: number;
    y: string;
}


//// [implementsIncorrectlyNoAssertion.js]
class Baz {
    x;
    y;
}
