class HashTable {
  table: string[][];

  constructor() {
    this.table = new Array(137);
    // 충돌처리 - 분리된 체인
    for (let i = 0; i < this.table.length; i++) {
      this.table[i] = new Array();
    }
  }

  simpleHash(data: string) {
    // 각 문자의 아스키 값의 합을 얻어 해시 값을 계산한다.
    const total = data.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    console.log(`Hash value: ${data} -> ${total}`);
    // 계산 결과가 항상 해당 테이블 범위 안에 있게 하기 위해 모듈러 연산을 사용한다.
    return total % this.table.length;
  }

  // 호너의 메서드 알고리즘을 사용해서 충돌이 안나게끔 해싱 함수를 만들자.
  betterHash(data: string) {
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
      .filter((dataList) => {
        return !!dataList[0];
      })
      .forEach((data, index) => console.log(`${index}: ${data}`));
  }

  put(key: string, data: string) {
    // const pos = this.simpleHash(data);
    const pos = this.betterHash(key);
    // this.table[pos] = data;
    const tableKeyPoint = this.table[pos];
    const tableKeyPointLength = tableKeyPoint.length;

    if (tableKeyPointLength === 0) {
      tableKeyPoint[0] = data;
    } else {
      tableKeyPoint[tableKeyPointLength - 1] = data;
    }
  }

  get(key: string) {
    return this.table[this.betterHash(key)];
  }
}
