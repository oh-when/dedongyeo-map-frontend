import React from 'react';
import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client';
import { mapboxService } from '~/services';

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

export function inject<
  Props extends { stickers: GQL.Sticker[] } & Record<string, any>
>(
  Injected: React.ComponentType<Props>
): React.FunctionComponent<
  Exclude<Props, { stickers: GQL.Sticker[] }> extends never
    ? Record<string, unknown>
    : Exclude<Props, { stickers: GQL.Sticker[] }>
> {
  // eslint-disable-next-line react/display-name
  return function () {
    const stickers = useCurrentStickers();

    if (stickers.length > 0) {
      return React.createElement(Injected, { stickers } as any);
    }

    return null;
  };
}

export function getCenter(stickers: GQL.Sticker[]): [number, number] {
  return stickers
    .reduce(
      ([x, y], sticker) => {
        return [sticker.spot.x + x, sticker.spot.y + y];
      },
      [0, 0]
    )
    .map((sum) => (sum ? sum / stickers.length : 0)) as [number, number];
}

export function fetchRoutes(
  stickers: GQL.Sticker[]
): Promise<[number, number][]> {
  const spotCoords = stickers.map((sticker) => [
    sticker.spot.x,
    sticker.spot.y,
  ]) as [number, number][];

  return mapboxService.direction.getDirections({
    spotCoords,
    type: 'cycling',
  });
}

export function changeCurrentCourses(courses: GQL.Course[]): void {
  currentCoursesVar(courses);
}

export function changeCurrentCourseIndex(index: number): void {
  currentCourseIndexVar(index);
}
