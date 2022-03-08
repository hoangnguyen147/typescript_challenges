/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in
  
  ### Question
  
  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? For example if we have `Promise<ExampleType>` how to get ExampleType?
  
  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)
  
  > View on GitHub: https://tsch.js.org/189
*/


/* _____________ Your Code Here _____________ */

// sử dụng đệ quy

type MyAwaited<P extends Promise<unknown>> = P extends Promise<infer T>
  ? T extends Promise<unknown>
    ? MyAwaited<T>
    : T
  : never

// cách 2
// type MyAwaited<T> = T extends Promise<infer P> ? (P extends Promise<infer U> ? MyAwaited<U> : P) : T 
// cách 2 không thỏa mãn trường hợp expect error
// bài này căng phết

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type K = Promise<Promise<Promise<string>>> // test case tự thêm

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<K>, string>>,
]

// @ts-expect-error
type error = MyAwaited<number>



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/

