"use strict";
class Stack {
    constructor(dataStore) {
        this.dataStore = dataStore || [];
        this.top = 0;
    }
    push(element) {
        this.dataStore[this.top] = element;
        this.top = this.top + 1;
    }
    // top을 변화시킴, 영구적으로 내보낸다.
    pop() {
        const topElement = this.dataStore.splice(this.top - 1, 1)[0];
        this.top = this.top - 1;
        return topElement;
    }
    peek() {
        return this.dataStore[this.top - 1];
    }
    clear() {
        this.dataStore = [];
        this.top = 0;
    }
    length() {
        return this.dataStore.length;
    }
}
