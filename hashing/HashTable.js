"use strict";
class HashTable {
    constructor() {
        this.table = new Array(137);
    }
    simpleHash(data) {
        // 각 문자의 아스키 값의 합을 얻어 해시 값을 계산한다.
        const total = data.split("").reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0);
        console.log(`Hash value: ${data} -> ${total}`);
        // 계산 결과가 항상 해당 테이블 범위 안에 있게 하기 위해 모듈러 연산을 사용한다.
        return total % this.table.length;
    }
    // 호너의 메서드 알고리즘을 사용해서 충돌이 안나게끔 해싱 함수를 만들자.
    betterHash(data) {
        const H = 37;
        const total = data.split("").reduce((acc, char) => {
            return H * acc + char.charCodeAt(0);
        }, 0);
        console.log(`Hash value: ${data} -> ${total}`);
        const hashKey = total % this.table.length;
        return hashKey;
    }
    // 배열에 실제로 저장된 이름을 출력한다.
    showDistro() {
        this.table
            .filter(data => {
            return !!data;
        })
            .forEach((data, index) => console.log(`${index}: ${data}`));
    }
    put(data) {
        // const pos = this.simpleHash(data);
        const pos = this.betterHash(data);
        this.table[pos] = data;
    }
    get() { }
}
