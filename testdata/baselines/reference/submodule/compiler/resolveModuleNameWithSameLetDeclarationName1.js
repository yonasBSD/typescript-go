//// [tests/cases/compiler/resolveModuleNameWithSameLetDeclarationName1.ts] ////

//// [resolveModuleNameWithSameLetDeclarationName1.ts]
declare module foo {

    interface Bar {

    }
}

let foo: foo.Bar; 

//// [resolveModuleNameWithSameLetDeclarationName1.js]
let foo;
