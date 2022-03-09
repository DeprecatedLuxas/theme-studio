export type IgnoreCase<T extends string> = string extends T
  ? string
  : T extends `${infer F1}${infer F2}${infer R}`
  ? `${Uppercase<F1> | Lowercase<F1>}${
      | Uppercase<F2>
      | Lowercase<F2>}${IgnoreCase<R>}`
  : T extends `${infer F}${infer R}`
  ? `${Uppercase<F> | Lowercase<F>}${IgnoreCase<R>}`
  : "";

export type Nullable<T> = T | null;
export type Arrayable<T> = T | T[];
export type Undefinable<T> = T | undefined;