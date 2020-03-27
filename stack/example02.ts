// 우리 주변의 페즈 디스펜서(사탕을 한 알씩 배출해주는 장치)는 스택과 같은 방식으로 동작한다.
// 페즈 디스펜서에 빨간색, 노란색, 흰색 사탕이 섞여 있는데 노란색 사탕은 우리가 싫어하는 맛이다.
// 스택(한개 이상의 스택을 사용할 수 있다) 을 이용해 디스펜서의 다른 사탕 순서는 바꾸지 말고 노란색 사탕만 제거하는 프로그램을 구현하시오.
type CandyType = "red" | "white" | "yellow";
const PEZ_CANDY_DISPENSER: CandyType[] = [
  "red",
  "white",
  "yellow",
  "red",
  "yellow",
  "white",
  "red",
  "red"
];
const pezDispenserStack = new Stack<CandyType>(PEZ_CANDY_DISPENSER);

function removeCandy(dispenser: Stack<CandyType>, candy: CandyType) {
  const resultStack = new Stack<CandyType>();
  while (dispenser.length() !== 0) {
    const dispenserItem = dispenser.pop();
    if (dispenserItem !== "yellow") {
      resultStack.push(dispenserItem);
    }
  }

  return resultStack;
}

console.log(removeCandy(pezDispenserStack, "yellow"));
