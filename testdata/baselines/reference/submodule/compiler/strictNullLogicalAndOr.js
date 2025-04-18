//// [tests/cases/compiler/strictNullLogicalAndOr.ts] ////

//// [strictNullLogicalAndOr.ts]
// Repro from #9113

let sinOrCos = Math.random() < .5;
let choice = sinOrCos && Math.sin || Math.cos;

choice(Math.PI);

function sq(n?: number): number {
  const r = n !== undefined && n*n || 0;
  return r;
}

sq(3);

//// [strictNullLogicalAndOr.js]
// Repro from #9113
let sinOrCos = Math.random() < .5;
let choice = sinOrCos && Math.sin || Math.cos;
choice(Math.PI);
function sq(n) {
    const r = n !== undefined && n * n || 0;
    return r;
}
sq(3);
