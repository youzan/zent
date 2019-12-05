export function identity<T>(value: T): T;
export function identity(): undefined;

export default function identity<T>(value?: T): T {
  return value;
}
