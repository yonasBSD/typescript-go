//// [tests/cases/compiler/arrowFunctionWithObjectLiteralBody5.ts] ////

//// [arrowFunctionWithObjectLiteralBody5.ts]
var a = () => <Error>{ name: "foo", message: "bar" };      

var b = () => (<Error>{ name: "foo", message: "bar" });    

var c = () => ({ name: "foo", message: "bar" });           

var d = () => ((<Error>({ name: "foo", message: "bar" })));

//// [arrowFunctionWithObjectLiteralBody5.js]
var a = () => (({ name: "foo", message: "bar" }));
var b = () => (({ name: "foo", message: "bar" }));
var c = () => ({ name: "foo", message: "bar" });
var d = () => ({ name: "foo", message: "bar" });
