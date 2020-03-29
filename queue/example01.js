"use strict";
// 큐로 데이터 정렬하기
// 기수 정렬
// 기수 정렬은 두 번의 과정을 걸쳐 데이터를 정렬한다. 우리는 0 부터 99 사이의 정수 데이터를 사용한다.
// 첫 번째 과정에서는 1의 자리 숫자를 기준으로 숫자를 정렬하고 , 두 번째 과정에서는 10의 자리 숫자를 기주능로 데이터를 정렬한다.
const sampleList = [10, 29, 40, 50, 32, 54, 34, 56, 23, 97, 78];
// digit 정렬 기준 자릿수
function distribute(targetList, digit) {
    const result = new Array(10).fill(1).map(_ => new Queue());
    targetList.forEach(num => {
        if (digit === 1) {
            const rest = num % 10;
            result[rest].enqueue(num);
        }
        else {
            const rest = Math.floor(num / 10);
            result[rest].enqueue(num);
        }
    });
    return result;
}
function collect(queueList) {
    return queueList.flatMap(queue => {
        // return queue.dataStore
        const queueDataList = [];
        for (const value of queue) {
            queueDataList.push(value);
        }
        return queueDataList;
    });
}
const firstQueue = distribute(sampleList, 1);
const firstCollectList = collect(firstQueue);
const secondQueue = distribute(firstCollectList, 10);
const result = collect(secondQueue);
console.log("sampleList", sampleList);
console.log("result", result);
