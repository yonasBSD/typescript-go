//// [tests/cases/compiler/recursiveTupleTypes1.ts] ////

//// [recursiveTupleTypes1.ts]
interface Tree1 {
    children: [Tree1, Tree2];
}

interface Tree2 {
    children: [Tree2, Tree1];
}

let tree1: Tree1;
let tree2: Tree2;
tree1 = tree2;
tree2 = tree1;


//// [recursiveTupleTypes1.js]
let tree1;
let tree2;
tree1 = tree2;
tree2 = tree1;
