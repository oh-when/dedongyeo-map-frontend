import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client';

export const currentCoursesVar: ReactiveVar<GQL.Course[]> = makeVar([]);
export const currentCourseIndexVar: ReactiveVar<number> = makeVar(0);

export function useCurrentCourses(): GQL.Course[] {
  return useReactiveVar(currentCoursesVar);
}

export function useCurrentStickers(): GQL.Sticker[] {
  const courses = useReactiveVar(currentCoursesVar);
  const currentCourseIndex = useReactiveVar(currentCourseIndexVar);
  const course = courses[currentCourseIndex];

  if (!course) {
    return [];
  }

  return course.stickers || [];
}

export function changeCurrentCourses(courses: GQL.Course[]): void {
  currentCoursesVar(courses);
}

export function changeCurrentCourseIndex(index: number): void {
  currentCourseIndexVar(index);
}
