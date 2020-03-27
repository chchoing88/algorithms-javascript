"use strict";
var PEZ_CANDY_DISPENSER = [
    "red",
    "white",
    "yellow",
    "red",
    "yellow",
    "white",
    "red",
    "red"
];
var pezDispenserStack = new Stack(PEZ_CANDY_DISPENSER);
function removeCandy(dispenser, candy) {
    var resultStack = new Stack();
    while (dispenser.length() !== 0) {
        var dispenserItem = dispenser.pop();
        if (dispenserItem !== "yellow") {
            resultStack.push(dispenserItem);
        }
    }
    return resultStack;
}
console.log(removeCandy(pezDispenserStack, "yellow"));
