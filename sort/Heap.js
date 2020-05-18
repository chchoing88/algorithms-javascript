"use strict";
class Heap {
    constructor() {
        this.dataStore = [];
    }
    swap(arr, index1, index2) {
        const temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }
    insert(value) {
        // 1. 가장 후미에 넣는다.
        let lastIndex = this.dataStore.length;
        this.dataStore[lastIndex] = value;
        // 2. 부모와 값을 비교한다.
        // 2-1. 초기 부모 인덱스를 찾는다.
        let parentIndex = parseInt(`${(lastIndex - 1) / 2}`);
        // 3. 부모 노드가 있고, 후미에 있는 값이 부모 보다 작다면 swap
        while (parentIndex >= 0 &&
            this.dataStore[lastIndex] < this.dataStore[parentIndex]) {
            this.swap(this.dataStore, parentIndex, lastIndex);
            lastIndex = parentIndex;
            parentIndex = parseInt(`${(lastIndex - 1) / 2}`);
        }
    }
    delete(dataList = this.dataStore) {
        let rootIndex = 0;
        // 초기 자식의 인덱스를 구한다.
        let leftIndex = rootIndex * 2 + 1;
        let rightIndex = rootIndex * 2 + 2;
        // 1. root에 있는걸 꺼낸다.
        if (dataList.length === 0) {
            return false;
        }
        const del = dataList[rootIndex];
        // 2. 후미에 있는 값을 root에 할당해준다.
        const lastData = dataList.pop();
        if (dataList.length > 0) {
            dataList[rootIndex] = lastData;
        }
        // 3. 자식이 있고(왼쪽 자식만 있어도 수행), 자식의 가장 작은 값이 root의 값보다 작다면 swap()
        while (dataList[leftIndex]) {
            const rightValue = dataList[rightIndex];
            const leftValue = dataList[leftIndex];
            let minValueIndex = leftIndex;
            if (rightValue) {
                // 두 자식간의 최소값을 가진 인덱스를 구해야 한다.
                // 나중에 swap 해야하기 때문에
                minValueIndex = rightValue < leftValue ? rightIndex : leftIndex;
            }
            // root 값이 자식들의 최소값보다 크다면 swap, 작다면 break;
            if (dataList[rootIndex] <= dataList[minValueIndex]) {
                break;
            }
            else {
                this.swap(dataList, rootIndex, minValueIndex);
                rootIndex = minValueIndex;
                leftIndex = rootIndex * 2 + 1;
                rightIndex = rootIndex * 2 + 2;
            }
        }
        return del;
    }
    sort() {
        const result = [];
        const length = this.dataStore.length;
        const tempDataList = Array.prototype.slice.apply(this.dataStore);
        for (let i = 0; i < length; i++) {
            const del = this.delete(tempDataList);
            if (del) {
                result.push(del);
            }
        }
        return result;
    }
}
