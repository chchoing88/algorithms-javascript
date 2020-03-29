"use strict";
const PEZ_CANDY_DISPENSER = [
    "red",
    "white",
    "yellow",
    "red",
    "yellow",
    "white",
    "red",
    "red"
];
const pezDispenserStack = new Stack(PEZ_CANDY_DISPENSER);
function removeCandy(dispenser, candy) {
    const resultStack = new Stack();
    while (dispenser.length() !== 0) {
        const dispenserItem = dispenser.pop();
        if (dispenserItem !== "yellow") {
            resultStack.push(dispenserItem);
        }
    }
    return resultStack;
}
console.log(removeCandy(pezDispenserStack, "yellow"));
