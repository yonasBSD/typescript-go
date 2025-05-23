//// [tests/cases/compiler/abstractPropertyBasics.ts] ////

//// [abstractPropertyBasics.ts]
interface A {
    prop: string;
    raw: string;
    m(): void;
}
abstract class B implements A {
    abstract prop: string;
    abstract raw: string;
    abstract readonly ro: string;
    abstract get readonlyProp(): string;
    abstract set readonlyProp(val: string);
    abstract m(): void;
}
class C extends B {
    get prop() { return "foo"; }
    set prop(v) { }
    raw = "edge";
    readonly ro = "readonly please";
    readonlyProp: string; // don't have to give a value, in fact
    m() { }
}

//// [abstractPropertyBasics.js]
class B {
    prop;
    raw;
    ro;
}
class C extends B {
    get prop() { return "foo"; }
    set prop(v) { }
    raw = "edge";
    ro = "readonly please";
    readonlyProp; // don't have to give a value, in fact
    m() { }
}
