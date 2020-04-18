"use strict";
class BSTNode {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
    show() {
        return this.data;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    insert(data) {
        // 루트 노드를 current 노드로 설정
        // 삽입할 노드의 값이 current 노드의 값보다 작으면 왼쪽 자식으로 크다면 오른쪽 자식으로 삽입
        // current 노드의 값 보다 작으면서 왼쪽 자식이 null이면 왼쪽 자식에 삽입 그렇지 않다면 왼쪽 자식을 current로 바꾼후 다시 루프
        // 반대로 current 노드의 값 보다 크면서 오른쪽 자식이 null이면 오른쪽 자식에 삽입 그렇지 않다면 오른쪽 자식을 current로 바꾼후 다시 루프
        const bstNode = new BSTNode(data, null, null);
        if (this.root === null) {
            this.root = bstNode;
        }
        else {
            let current = this.root;
            while (true) {
                if (data < current.data) {
                    // 삽입할 데이터가 작으면 왼쪽
                    if (current.left === null) {
                        current.left = bstNode;
                        break;
                    }
                    else {
                        current = current.left;
                    }
                }
                else {
                    // 삽입할 데이터가 크면 오른쪽
                    if (current.right === null) {
                        current.right = bstNode;
                        break;
                    }
                    else {
                        current = current.right;
                    }
                }
            }
        }
    }
    inOrder(node) {
        // 중위 탐색 (왼쪽 -> 부모 -> 오른쪽) 오름 차순 탐색
        // 부모 기준으로 왼쪽 시도후 부모 시도 그리고 나서 부모의 오른쪽 시도
        if (node !== null) {
            this.inOrder(node.left); // 부모 노드의 왼쪽부터 출력 시도
            console.log(node.data + " "); // 부모 자신 출력
            this.inOrder(node.right); // 부모 노드의 오른쪽 출력 시도
        }
    }
    preOrder(node) {
        // 전위 탐색 (부모 -> 왼쪽 -> 오른쪽) 부모를 기준으로 부모 먼저 시도 후 왼쪽 시도 그리고 다 끝났으면 오른쪽 시도
        if (node !== null) {
            console.log(node.data + " ");
            this.inOrder(node.left); // 부모 노드의 왼쪽부터 출력 시도
            this.inOrder(node.right); // 부모 노드의 오른쪽 출력 시도
        }
    }
    postOrder(node) {
        // 후위 탐색 (왼쪽 -> 오른쪽 -> 부모) 부모를 기준으로 왼쪽 시도 그리고 다 끝났으면 오른쪽 시도 후 마지막으로 부모 시도
        if (node !== null) {
            this.inOrder(node.left); // 부모 노드의 왼쪽부터 출력 시도
            this.inOrder(node.right); // 부모 노드의 오른쪽 출력 시도
            console.log(node.data + " ");
        }
    }
    // 최솟값
    getMin() {
        let current = this.root;
        if (current === null) {
            return null;
        }
        while (!(current.left === null)) {
            current = current.left;
        }
        return current.data;
    }
    // 최댓값
    getMax() {
        let current = this.root;
        if (current === null) {
            return null;
        }
        while (!(current.right === null)) {
            current = current.right;
        }
        return current.data;
    }
    // 특정값 검색
    find(data) {
        let current = this.root;
        while (current && current.data !== data) {
            if (data < current.data) {
                current = current.left;
            }
            else if (data > current.data) {
                current = current.right;
            }
        }
        if (current === null) {
            return null;
        }
        return current;
    }
    getSmallest(node) {
        let current = node;
        while (!(current.left === null)) {
            current = current.left;
        }
        return current;
    }
    remove(data) {
        this.root = this.removeNode(this.root, data);
    }
    removeNode(node, data) {
        if (node === null) {
            return null;
        }
        // 재귀
        if (data === node.data) {
            // 자식이 없는 노드
            if (node.left === null && node.right === null) {
                return null;
            }
            // 왼쪽 자식이 없는 노드
            if (node.left === null) {
                return node.right;
            }
            // 오른쪽 자식이 없는 노드
            if (node.right === null) {
                return node.left;
            }
            // 두 자식이 있는 노드
            // 가장 오른쪽에서 작은 노드를 찾는다.
            const tempNode = this.getSmallest(node.right);
            // 찾은 노드의 데이터를 삭제하고자 하는 노드와 교체한다.
            node.data = tempNode.data;
            // 찾은 노드를 null 처리 한다.
            // node.right 가 그대로 리턴된다.
            node.right = this.removeNode(node.right, tempNode.data);
            return node;
        }
        else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        }
        else {
            node.right = this.removeNode(node.right, data);
            return node;
        }
    }
}
