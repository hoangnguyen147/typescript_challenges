/*
  116 - Replace
  -------
  by Anthony Fu (@antfu) #medium #template-literal
  
  ### Question
  
  Implement `Replace<S, From, To>` which replace the string `From` with `To` once in the given string `S`
  
  For example
  
  ```ts
  type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
  ```
  
  > View on GitHub: https://tsch.js.org/116
*/

/* _____________ Your Code Here _____________ */

type ReplaceReal<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer P}${From}${infer Rest}`
  ? `${P}${To}${Rest}`
  : S extends `${infer First}${infer Rest}`
  ? `${First}${ReplaceReal<Rest, From, To>}`
  : "";

type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends "" ? S : ReplaceReal<S, From, To>;

// Version 2 better:
type Replace2<S extends string, From extends string, To extends string> =
  From extends ''
    ? S
    : S extends `${infer Left}${From}${infer Right}` ? `${Left}${To}${Right}` : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"foobarbar", "bar", "">, "foobar">>,
  Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"", "", "">, "">>
];

type cases2 = [
    Expect<Equal<Replace2<"foobar", "bar", "foo">, "foofoo">>,
    Expect<Equal<Replace2<"foobarbar", "bar", "foo">, "foofoobar">>,
    Expect<Equal<Replace2<"foobarbar", "", "foo">, "foobarbar">>,
    Expect<Equal<Replace2<"foobarbar", "bar", "">, "foobar">>,
    Expect<Equal<Replace2<"foobarbar", "bra", "foo">, "foobarbar">>,
    Expect<Equal<Replace2<"", "", "">, "">>
  ];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/116/answer
  > View solutions: https://tsch.js.org/116/solutions
  > More Challenges: https://tsch.js.org
*/
