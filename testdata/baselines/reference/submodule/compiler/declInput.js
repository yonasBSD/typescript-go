//// [tests/cases/compiler/declInput.ts] ////

//// [declInput.ts]
interface bar {

}

class bar {
  public f() { return ''; }
  public g() { return {a: <bar>null, b: undefined, c: void 4 }; }
  public h(x = 4, y = null, z = '') { x++; }
}


//// [declInput.js]
class bar {
    f() { return ''; }
    g() { return { a: null, b: undefined, c: void 4 }; }
    h(x = 4, y = null, z = '') { x++; }
}


//// [declInput.d.ts]
interface bar {
}
declare class bar {
    f(): string;
    g(): {
        a: bar;
        b: any;
        c: any;
    };
    h(x?: number, y?: any, z?: string): void;
}
