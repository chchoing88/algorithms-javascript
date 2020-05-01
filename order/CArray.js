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
                for (let j = i; // 초기 시퀀스 설정
                 j >= h && this.dataStore[j] < this.dataStore[j - h]; // j 값이 시퀀스 만큼 있고 왼쪽 값이 작다면ㄴ
                 j = j - h // 시퀀스 만큼 떨어진 왼쪽 값 확인
                ) {
                    this.swap(this.dataStore, j, j - h);
                }
            }
            // 다음 시퀀스 구하는 공식
            h = (h - 1) / 3;
        }
    }
    // 가장 먼저 배열을 하나씩 쪼개서 (상향식)
    // 쪼갠 배열들을 머지 시켜야 합니다.
    mergeSort() {
        let step = 1; // 쪼갤 단위
        // 쪼갤 단위가 dataStore 보다 짧을때 계속 수행
        while (step < this.dataStore.length) {
            // 처음 시작 left, right 그룹의 배열의 시작 인덱스
            let leftStart = 0;
            let rightStart = step;
            // left, right 를 step 으로 쌍을 만들 수 있을 때
            while (rightStart + step <= this.dataStore.length) {
                this.mergeArray(this.dataStore, leftStart, leftStart + step - 1, rightStart, rightStart + step - 1);
                // 그다음 leftStart, rightStart
                leftStart = rightStart + step;
                rightStart = leftStart + step;
            }
            // 나머지 left, right 쌍을 만들 수 없을 때
            if (rightStart < this.dataStore.length) {
                this.mergeArray(this.dataStore, leftStart, leftStart + step - 1, rightStart, this.dataStore.length - 1);
            }
            step = step * 2;
        }
    }
    // 두 정렬된 그룹의 배열의 각 첫번째 요소를 가지고
    // 작은수 부터 배치하여 머지합니다.
    mergeArray(arr, leftStart, leftStop, rightStart, rightStop) {
        // 임시 배열 복사 생성
        const tempArray = arr.map((item) => item);
        let part1 = leftStart;
        let part2 = rightStart;
        // 다시 arr에 정렬된것을 할당
        for (let i = leftStart; i <= rightStop; i++) {
            if (part2 > rightStop) {
                // part2 가 rightStop 보다 커진다면 우측 배열은 정렬이 끝난 것이다
                arr[i] = tempArray[part1];
                part1++;
            }
            else if (part1 > leftStop) {
                // part1 이 rightStart가 같아지거나 커진다면 왼쪽 배열은 정렬이 끝난 것이다
                arr[i] = tempArray[part2];
                part2++;
            }
            else {
                if (tempArray[part1] <= tempArray[part2]) {
                    arr[i] = tempArray[part1];
                    part1++;
                }
                else {
                    arr[i] = tempArray[part2];
                    part2++;
                }
            }
        }
    }
    // 퀵 정렬
    // 피벗을 기준으로 왼쪽과 오른쪽을 나눠서 정렬을 시작합니다
    quickSort() {
        this.dataStore = this.qSort(this.dataStore);
    }
    qSort(list) {
        // 정렬할 데이터가 없으면 빈 배열을 리턴합니다
        if (list.length === 0) {
            return [];
        }
        if (list.length === 1) {
            return list;
        }
        const [lesser, greater, pivot] = this.partition(list);
        console.log("lesser", lesser);
        console.log("greater", greater);
        const sortLesser = this.qSort(lesser);
        const sortGreater = this.qSort(greater);
        return sortLesser.concat(pivot, sortGreater);
        // return [];
    }
    partition(list) {
        // 물리적으로 가운데 값을 피벗으로 잡는다
        const pivot = Math.floor((list.length - 1) / 2);
        const lesser = [];
        const greater = [];
        for (let i = 0; i < list.length; i++) {
            if (i !== pivot) {
                if (list[i] < list[pivot]) {
                    lesser.push(list[i]);
                }
                else {
                    greater.push(list[i]);
                }
            }
        }
        return [lesser, greater, [list[pivot]]];
    }
}
