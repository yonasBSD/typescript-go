//// [tests/cases/compiler/assignmentCompatability8.ts] ////

//// [assignmentCompatability8.ts]
module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export            class classWithPublic<T> { constructor(public one: T) {} }                        var x1 = new classWithPublic(1);;
    export var __val__x1 = x1;
}
__test2__.__val__x1 = __test1__.__val__obj4

//// [assignmentCompatability8.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    class classWithPublic {
        one;
        constructor(one) {
            this.one = one;
        }
    }
    __test2__.classWithPublic = classWithPublic;
    var x1 = new classWithPublic(1);
    ;
    __test2__.__val__x1 = x1;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x1 = __test1__.__val__obj4;
