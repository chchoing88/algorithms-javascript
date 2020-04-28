"use strict";
// 배열을 생성하는 테스트 베드 클래스
class CArray {
    constructor(numElements) {
        this.pos = 0; // 빈공간
        this.dataStore = [];
        this.numElements = numElements;
        for (let i = 0; i < numElements; i++) {
            this.dataStore[i] = i;
        }
        this.pos = numElements;
    }
    setData() {
        for (let i = 0; i < this.numElements; i++) {
            // Math.random() : 0 ~ 1
            // 0 ~ 1 * 101 => 1 ~ 100 임의수 생성
            this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
        }
    }
    clear() {
        this.dataStore.forEach((i) => (i = 0));
        this.pos = 0;
    }
    insert(element) {
        this.dataStore[this.pos++] = element;
    }
    toString() {
        let retstr = "";
        this.dataStore.forEach((i, index) => {
            retstr += `${i} `;
            if (index > 0 && index % 10 === 0) {
                retstr += `\n`;
            }
        });
        return retstr;
    }
    swap(arr, index1, index2) {
        const temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }
    // 버블 정렬
    // 한번 버블 정렬 될때마다 맨 끝의 숫자가 정렬이 된것이다.
    // 맨 마지막 element를 빼고 다시 버블 정렬을 시작한다.
    // 남은 element가 1개 이상일때까지 반복한다.
    bubbleSort() {
        for (let outer = this.dataStore.length - 1; outer > 1; outer--) {
            for (let i = 0; i < outer; i++) {
                if (this.dataStore[i] > this.dataStore[i + 1]) {
                    this.swap(this.dataStore, i, i + 1);
                }
            }
        }
    }
    // 선택 정렬
    // 첫번째 자리에 제일 작은 숫자가 오게 한 다음
    // 두번째 자리에 제일 작은 숫자가 오도록 계속 정렬한다.
    selectionSort() {
        for (let pos = 0; pos < this.dataStore.length - 1; pos++) {
            // minPos 작은 수가 저장되어있는 index
            let minPos = pos;
            for (let i = pos + 1; i < this.dataStore.length; i++) {
                if (this.dataStore[i] < this.dataStore[minPos]) {
                    minPos = i;
                }
            }
            this.swap(this.dataStore, pos, minPos);
        }
    }
    // 삽입 정렬
    // 두번째 요소부터 시작해서 ( 첫번째 요소는 자동 삽입 되었다고 생각하고 )
    // 선택된 요소 왼쪽에 있는 요소들을 전부 비교해서 자신이 있어야 할 자리를 선정합니다.
    // 이때 무조건 전부 비교하지 않고 하나씩 정렬해서 넣기 때문에 이전 요소가 큰지 안큰지만 보면 된다.
    insertionSort() {
        for (let pos = 1; pos < this.dataStore.length; pos++) {
            // pos 이전 요소들 확인
            const targetElement = this.dataStore[pos];
            let tempPos = pos;
            while (tempPos > 0 && this.dataStore[tempPos - 1] > targetElement) {
                // 이전 요소가 더 크다면 하나씩 땡긴다.
                this.dataStore[tempPos] = this.dataStore[tempPos - 1];
                tempPos = tempPos - 1;
            }
            this.dataStore[tempPos] = targetElement;
        }
    }
    // 동적 시퀀스 쉘 정렬
    shellSort() {
        const N = this.dataStore.length;
        let h = 1;
        // 초기 시퀀스 설정
        while (h < N / 3) {
            h = 3 * h + 1;
        }
        // 시퀀스 별로 정렬
        while (h >= 1) {
            // 시퀀스 부터 시작해서 하나씩 오른쪽으로 이동해서 확인한다.
            for (let i = h; i < N; i++) {
                // 왼쪽 시퀀스 사이즈 만큼 떨어진 값과 비교한다.
                // 왼쪽에 시퀀스 만큼 떨어진 값이 크다면 바꾸고 다시 왼쪽 시퀀스 만큼 떨어진 값과 비교한다.
                for (let j = i; j >= h && this.dataStore[j] < this.dataStore[j - h]; j = j - h) {
                    this.swap(this.dataStore, j, j - h);
                }
            }
            // 다음 시퀀스 구하는 공식
            h = (h - 1) / 3;
        }
    }
}
