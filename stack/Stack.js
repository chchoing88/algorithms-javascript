"use strict";
var Stack = /** @class */ (function () {
    function Stack() {
        this.dataStore = [];
        this.top = 0;
    }
    Stack.prototype.push = function (element) {
        this.dataStore[this.top] = element;
        this.top = this.top + 1;
    };
    // top을 변화시킴, 영구적으로 내보낸다.
    Stack.prototype.pop = function () {
        var topElement = this.dataStore.splice(this.top - 1, 1);
        this.top = this.top - 1;
        return topElement;
    };
    Stack.prototype.peek = function () {
        return this.dataStore[this.top - 1];
    };
    Stack.prototype.clear = function () {
        this.dataStore = [];
        this.top = 0;
    };
    Stack.prototype.length = function () {
        return this.dataStore.length;
    };
    return Stack;
}());
