//// [tests/cases/compiler/circularContextualReturnType.ts] ////

//// [circularContextualReturnType.ts]
// Repro from #17711

Object.freeze({
    foo() {
        return Object.freeze('a');
    },
});


//// [circularContextualReturnType.js]
// Repro from #17711
Object.freeze({
    foo() {
        return Object.freeze('a');
    },
});
