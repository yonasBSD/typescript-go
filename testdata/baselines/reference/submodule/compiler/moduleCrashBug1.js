//// [tests/cases/compiler/moduleCrashBug1.ts] ////

//// [moduleCrashBug1.ts]
module _modes {
 export interface IMode {
  
 }
 
 class Mode {
  
 }
}

//_modes. // produces an internal error - please implement in derived class

module editor {
 import modes = _modes;

}

var m : _modes;




//// [moduleCrashBug1.js]
var _modes;
(function (_modes) {
    class Mode {
    }
})(_modes || (_modes = {}));
var m;
