//// [tests/cases/conformance/functions/functionWithUseStrictAndSimpleParameterList_es2016.ts] ////

//// [functionWithUseStrictAndSimpleParameterList_es2016.ts]
function a(a = 10) {
    "use strict";
}

export var foo = 10;
function b(a = 10) {
}

function container() {
    "use strict";
    function f(a = 10) {
    }
}

function rest(...args: any[]) {
    'use strict';
}

function rest1(a = 1, ...args) {
    'use strict';
}

function paramDefault(param = 1) {
    'use strict';
}

function objectBindingPattern({foo}: any) {
    'use strict';
}

function arrayBindingPattern([foo]: any[]) {
    'use strict';
}

function manyParameter(a = 10, b = 20) {
    "use strict";
}

function manyPrologue(a = 10, b = 20) {
    "foo";
    "use strict";
}

function invalidPrologue(a = 10, b = 20) {
    "foo";
    const c = 1;
    "use strict";
}


//// [functionWithUseStrictAndSimpleParameterList_es2016.js]
function a(a = 10) {
    "use strict";
    "use strict";
}
export var foo = 10;
function b(a = 10) {
}
function container() {
    "use strict";
    "use strict";
    function f(a = 10) {
    }
}
function rest(...args) {
    'use strict';
    'use strict';
}
function rest1(a = 1, ...args) {
    'use strict';
    'use strict';
}
function paramDefault(param = 1) {
    'use strict';
    'use strict';
}
function objectBindingPattern({ foo }) {
    'use strict';
    'use strict';
}
function arrayBindingPattern([foo]) {
    'use strict';
    'use strict';
}
function manyParameter(a = 10, b = 20) {
    "use strict";
    "use strict";
}
function manyPrologue(a = 10, b = 20) {
    "foo";
    "use strict";
    "foo";
    "use strict";
}
function invalidPrologue(a = 10, b = 20) {
    "foo";
    "foo";
    const c = 1;
    "use strict";
}
