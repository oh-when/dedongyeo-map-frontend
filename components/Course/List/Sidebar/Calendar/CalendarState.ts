import { makeVar, ReactiveVar } from '@apollo/client';

type Cursor = [number, number, number];

const now: Date = new Date();
export const cursorState: ReactiveVar<Cursor> = makeVar<Cursor>([
  now.getFullYear(),
  now.getMonth() + 1,
  now.getDate(),
]);
