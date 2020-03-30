"use strict";
class LinkedList {
    constructor() {
        this.head = new LinkedNode("head");
        this.tail = this.head;
        this.tail.next = this.head;
        this.head.previous = this.tail;
    }
    find(item) {
        let currNode = this.head;
        //
        while (currNode.next && currNode.element !== item) {
            currNode = currNode.next;
        }
        if (currNode.element === item) {
            return currNode;
        }
        throw new Error("해당 노드를 찾을 수 없습니다.");
    }
    findPrevious(item) {
        var _a;
        let currNode = this.head;
        // 현재 노드 다음 element가 item과 일치할 때까지 링크를 타고 이동시킨다.
        while (currNode.next && currNode.next.element !== item) {
            currNode = currNode.next;
        }
        if (((_a = currNode.next) === null || _a === void 0 ? void 0 : _a.element) === item) {
            return currNode;
        }
        throw new Error("해당 이전 노드를 찾을 수 없습니다.");
    }
    // 어떤 노드를 추가할 것이고, 어느 노드 앞에 추가할지를 지정해야 한다.
    insert(newElement, item) {
        const newNode = new LinkedNode(newElement);
        const currentNode = this.find(item);
        newNode.next = currentNode.next;
        newNode.previous = currentNode; // 추가
        currentNode.next = newNode;
        this.head.previous = newNode;
        this.tail = newNode;
    }
    remove(item) {
        const removeNode = this.find(item);
        const previousRemoveNode = removeNode.previous;
        const nextRemoveNode = removeNode.next;
        // const previousRemoveNode = this.findPrevious(item);
        // previousRemoveNode.next = removeNode.next;
        if (previousRemoveNode) {
            previousRemoveNode.next = removeNode.next;
        }
        if (nextRemoveNode) {
            nextRemoveNode.previous = previousRemoveNode;
        }
        if (!nextRemoveNode && previousRemoveNode) {
            this.head.previous = previousRemoveNode;
            this.tail = previousRemoveNode;
        }
        removeNode.next = null;
        removeNode.previous = null;
    }
    // 전체 연결 리스트 보여주기
    display() {
        let currNode = this.head;
        console.log(currNode.element);
        while (currNode.next && !(currNode.next.element === "head")) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
    displayReverse() {
        let currNode = this.tail;
        console.log(currNode.element);
        while (currNode.previous && !(currNode.previous === this.tail)) {
            console.log(currNode.previous.element);
            currNode = currNode.previous;
        }
    }
}
