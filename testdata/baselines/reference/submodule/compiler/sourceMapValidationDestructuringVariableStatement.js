//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatement.ts] ////

//// [sourceMapValidationDestructuringVariableStatement.ts]
interface Robot {
    name: string;
    skill: string;
}
declare var console: {
    log(msg: string): void;
}
var hello = "hello";
var robotA: Robot = { name: "mower", skill: "mowing" };
var robotB: Robot = { name: "trimmer", skill: "trimming" };
var { name: nameA } = robotA;
var { name: nameB, skill: skillB } = robotB;
var { name: nameC, skill: skillC } = { name: "Edger", skill: "cutting edges" };
if (nameA == nameB) {
    console.log(skillB);
}
else {
    console.log(nameC);
}

//// [sourceMapValidationDestructuringVariableStatement.js]
var hello = "hello";
var robotA = { name: "mower", skill: "mowing" };
var robotB = { name: "trimmer", skill: "trimming" };
var { name: nameA } = robotA;
var { name: nameB, skill: skillB } = robotB;
var { name: nameC, skill: skillC } = { name: "Edger", skill: "cutting edges" };
if (nameA == nameB) {
    console.log(skillB);
}
else {
    console.log(nameC);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatement.js.map