//// [tests/cases/compiler/es6ExportClauseWithoutModuleSpecifierInEs5.ts] ////

//// [server.ts]
export class c {
}
export interface i {
}
export module m {
    export var x = 10;
}
export var x = 10;
export module uninstantiated {
}

//// [client.ts]
export { c } from "./server";
export { c as c2 } from "./server";
export { i, m as instantiatedModule } from "./server";
export { uninstantiated } from "./server";
export { x } from "./server";

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.m = exports.c = void 0;
class c {
}
exports.c = c;
var m;
(function (m) {
    m.x = 10;
})(m || (exports.m = m = {}));
exports.x = 10;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.instantiatedModule = exports.c2 = exports.c = void 0;
const server_1 = require("./server");
Object.defineProperty(exports, "c", { enumerable: true, get: function () { return server_1.c; } });
const server_2 = require("./server");
Object.defineProperty(exports, "c2", { enumerable: true, get: function () { return server_2.c; } });
const server_3 = require("./server");
Object.defineProperty(exports, "instantiatedModule", { enumerable: true, get: function () { return server_3.m; } });
const server_4 = require("./server");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return server_4.x; } });


//// [server.d.ts]
export declare class c {
}
export interface i {
}
export declare namespace m {
    var x: number;
}
export declare var x: number;
export declare namespace uninstantiated {
}
//// [client.d.ts]
export { c } from "./server";
export { c as c2 } from "./server";
export { i, m as instantiatedModule } from "./server";
export { uninstantiated } from "./server";
export { x } from "./server";
