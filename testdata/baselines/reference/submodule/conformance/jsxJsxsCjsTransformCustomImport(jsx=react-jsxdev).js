//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformCustomImport.tsx] ////

//// [jsxJsxsCjsTransformCustomImport.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};

//// [jsxJsxsCjsTransformCustomImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_dev_runtime_1 = require("preact/jsx-dev-runtime");
const _jsxFileName = "jsxJsxsCjsTransformCustomImport.tsx";
/// <reference path="react16.d.ts" />
const a = jsx_dev_runtime_1.jsxDEV(jsx_dev_runtime_1.Fragment, { children: [jsx_dev_runtime_1.jsxDEV("p", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 3 }, this), "tex", jsx_dev_runtime_1.jsxDEV("div", { className: "foo" }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 3 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 2, columnNumber: 10 }, this);
