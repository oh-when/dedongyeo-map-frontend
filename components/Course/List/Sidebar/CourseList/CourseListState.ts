import React from 'react';
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
  const route = stickers
    .reduce((str, sticker) => `${str};${sticker.spot.x},${sticker.spot.y}`, '')
    .substr(1);
  const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/cycling/${route}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN}`;

  return fetch(routeUrl)
    .then((response) => response.json())
    .then((data: MapBoxService.RouteJson) => {
      if (
        !data ||
        !data.routes ||
        !data.routes[0] ||
        !data.routes[0].geometry ||
        !data.routes[0].geometry.coordinates
      ) {
        return [];
      }
      return data.routes[0].geometry.coordinates;
    });
}

export function changeCurrentCourses(courses: GQL.Course[]): void {
  currentCoursesVar(courses);
}

export function changeCurrentCourseIndex(index: number): void {
  currentCourseIndexVar(index);
}
