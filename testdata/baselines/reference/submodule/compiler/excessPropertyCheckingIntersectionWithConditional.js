//// [tests/cases/compiler/excessPropertyCheckingIntersectionWithConditional.ts] ////

//// [excessPropertyCheckingIntersectionWithConditional.ts]
type Foo<K> = K extends unknown ? { a: number } : unknown
const createDefaultExample = <K,>(x: K): Foo<K> & { x: K; } => {
  return { a: 1, x: x }; // okay in TS 4.7.4, error in TS 4.8.2
}

//// [excessPropertyCheckingIntersectionWithConditional.js]
const createDefaultExample = (x) => {
    return { a: 1, x: x }; // okay in TS 4.7.4, error in TS 4.8.2
};
