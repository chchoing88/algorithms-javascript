"use strict";
var List = /** @class */ (function () {
    function List() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = []; // 리스트 요소를 저장할 빈 배열 초기화
    }
    Object.defineProperty(List.prototype, "Length", {
        get: function () {
            return this.listSize;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.clear = function () {
        this.dataStore = [];
        this.listSize = 0;
        this.pos = 0;
    };
    List.prototype.findIndex = function (element) {
        return this.dataStore.findIndex(function (elem) { return elem === element; });
    };
    List.prototype.insert = function (newElement, afterElement) {
        var startAt = this.findIndex(afterElement);
        if (startAt > -1) {
            this.dataStore.splice(startAt + 1, 0, newElement);
            this.listSize = this.listSize + 1;
            return true;
        }
        return false;
    };
    List.prototype.append = function (element) {
        this.dataStore[this.listSize++] = element;
    };
    List.prototype.remove = function (element) {
        var foundAt = this.findIndex(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            this.listSize = this.listSize - 1;
            return true;
        }
        return false;
    };
    List.prototype.front = function () {
        this.pos = 0;
    };
    List.prototype.end = function () {
        this.pos = this.listSize - 1;
    };
    List.prototype.prev = function () {
        if (this.pos > 0) {
            this.pos = this.pos - 1;
        }
    };
    List.prototype.next = function () {
        if (this.pos < this.listSize - 1) {
            this.pos = this.pos + 1;
        }
    };
    List.prototype.currPos = function () {
        return this.pos;
    };
    List.prototype.moveTo = function (position) {
        this.pos = position;
    };
    List.prototype.getElement = function () {
        return this.dataStore[this.pos];
    };
    // 리스트에 특정 element가 있는지 판단.
    List.prototype.contains = function (element) {
        return !!this.dataStore.find(function (elem) { return elem === element; });
    };
    // 현재 리스트의 모든 요소보다 클 때만 삽입하는 함수 (숫자는 큰값, 문자는 알파벳순으로 나중을 의미)
    List.prototype.isBigElementThanEveryListElement = function (element) {
        return this.dataStore.every(function (elem) {
            if (typeof elem === "string" && typeof element === "string") {
                return element.toLowerCase() > elem.toLowerCase();
            }
            return element > elem;
        });
    };
    return List;
}());
