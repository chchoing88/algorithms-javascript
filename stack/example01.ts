// 수식을 인자로 받아 수식에 열거나 닫는 괄호가 없을 때 false를 반환하는 함수를 구현하시오.
// 닫는 괄호가 다 정상적일땐 true 리턴하자.
// 예를 들어 '2.3 + 23 / 12 + (3.14159 * 0.24' 에는 닫는 괄호가 없다.

function mathematicalLint(express: string) {
  // 문자열로 된 수식을 배열로 쪼갠다. (기준을 띄어쓰기로? 아니면 문자 하나하나로?)
  // 검증을 stack으로
  // 괄호가 있는지 없는지는 regexp로?
  // '(' 를 만나면 stack에 push ')' 를 만나면 스택확인, 쌍이 맞는지 확인, 그후 pop
  // 최종적으로 stack이 비어야 닫는 괄호가 정상이다.
  // 어떻게 괄호가 없는 위치를 알아 낼 수 있을 것인가?
  let result = true;
  const verificationStack = new Stack<string>();
  const splitExpress = express.split("");

  const length = splitExpress.length;

  // O(n)
  for (let i = 0; i < length; i++) {
    if (splitExpress[i] === "(") {
      verificationStack.push(splitExpress[i]); // 여는 괄호를 만나면 닫는 괄호를 만나야지 pop이 이뤄진다.
    }

    if (splitExpress[i] === ")") {
      // 스택이 비어 있다면
      if (verificationStack.length() === 0) {
        verificationStack.push(splitExpress[i]);
        break;
      }

      if (verificationStack.peek() === "(") {
        // 쌍이 맞는지 확인
        verificationStack.pop();
      }
    }
  }
  console.log("verificationStack", verificationStack);
  return verificationStack.length() === 0;
}
