//// [tests/cases/compiler/moduleCodeGenTest5.ts] ////

//// [moduleCodeGenTest5.ts]
export var x = 0;
var y = 0;

export function f1() {}
function f2() {}

export class C1 {
	public p1 = 0;
	public p2() {}
}
class C2{
	public p1 = 0;
	public p2() {}	
}

export enum E1 {A=0}
var u = E1.A;
enum E2 {B=0}
var v = E2.B;



//// [moduleCodeGenTest5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E1 = exports.C1 = exports.x = void 0;
exports.f1 = f1;
exports.x = 0;
var y = 0;
function f1() { }
function f2() { }
class C1 {
    p1 = 0;
    p2() { }
}
exports.C1 = C1;
class C2 {
    p1 = 0;
    p2() { }
}
var E1;
(function (E1) {
    E1[E1["A"] = 0] = "A";
})(E1 || (exports.E1 = E1 = {}));
var u = E1.A;
var E2;
(function (E2) {
    E2[E2["B"] = 0] = "B";
})(E2 || (E2 = {}));
var v = E2.B;
