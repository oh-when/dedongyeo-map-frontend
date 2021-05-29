import { makeVar, ReactiveVar } from '@apollo/client';

export const courses: ReactiveVar<GQL.Course[]> = makeVar([]);
export const currentCourseIndex: ReactiveVar<number> = makeVar(0);
