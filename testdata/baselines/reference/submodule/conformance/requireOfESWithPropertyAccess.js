//// [tests/cases/conformance/salsa/requireOfESWithPropertyAccess.ts] ////

//// [main.js]
const x = require('./ch').x
x
x.grey
x.x.grey
//// [ch.js]
const x = {
  grey: {}
}
export { x }


//// [ch.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const x = {
    grey: {}
};
exports.x = x;
//// [main.js]
"use strict";
const x = require('./ch').x;
x;
x.grey;
x.x.grey;


//// [ch.d.ts]
declare const x: {
    grey: {};
};
export { x };
//// [main.d.ts]
export {};
