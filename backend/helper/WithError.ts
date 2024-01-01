export type WithError<T, E = Error> =
  | [result: T, undefined]
  | [undefined, error: E];
