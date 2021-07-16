import mapboxService from '~/lib/mapboxService';
import { getStickerImageUrl } from '~/components/_assets/sticker';
import { makeVar, useReactiveVar } from '@apollo/client';

export const sharedCourseVar = makeVar<GQL.Course>({
  _id: null,
  endAt: Date.now(),
  isShare: true,
  partners: [],
  startAt: Date.now(),
  stickers: [],
  title: ""
});
export const sharedCourseImageSourceVar = makeVar(''); // TODO: 기본 이미지
export const sharedCourseImageUrlVar = makeVar('');

export function setSharedCourse(course: GQL.Course) {
  const spotCoords = course.stickers.map(
    (sticker) => [sticker.spot.x, sticker.spot.y] as [number, number]
  );
  const spotImageUrls = course.stickers.map((sticker) =>
    getStickerImageUrl(sticker.sweet_percent, sticker.sticker_index)
  );

  sharedCourseVar(course);

  getSharedCourseImageSource({
    courseId: course._id,
    spotCoords,
    spotImageUrls,
  }).then((source) => sharedCourseImageSourceVar(source));

  getSharedImageUrl({
    spotCoords,
    spotImageUrls,
  }).then((url) => sharedCourseImageUrlVar(url));
}

export function useSharedCourse(): GQL.Course {
  return useReactiveVar(sharedCourseVar);
}

export function useSharedCourseImageSource(): string {
  return useReactiveVar(sharedCourseImageSourceVar);
}

export function useSharedCourseImageUrl(): string {
  return useReactiveVar(sharedCourseImageUrlVar);
}

export async function getSharedImageUrl({
  spotCoords,
  spotImageUrls,
}: {
  spotCoords: Array<[number, number]>;
  spotImageUrls: string[];
}): Promise<string> {
  const lineCoords = await mapboxService.direction.getDirections({
    type: 'cycling',
    spotCoords,
  });
  const geojson = mapboxService.url.getGeoJson({
    spots: spotCoords.map((coord, i) => ({
      coord,
      imageUrl: spotImageUrls[i],
    })),
    line: {
      coords: lineCoords,
      color: '#000000',
      width: 3,
    },
  });
  const url = mapboxService.url.getStaticImageUrl({
    geojson,
    width: 1024,
    height: 1024,
  });

  return url;
}

let imageCache: { [id: string]: string } = {};
export async function getSharedCourseImageSource({
  courseId,
  spotCoords,
  spotImageUrls,
}: {
  courseId: string;
  spotCoords: Array<[number, number]>;
  spotImageUrls: string[];
}): Promise<string> {
  if (imageCache[courseId]) return imageCache[courseId];

  const source = await mapboxService.staticImage.getStaticImageSource({
    spotCoords,
    spotImageUrls,
    width: 496,
    height: 496,
    line: {
      color: '#000000',
      width: 3,
    },
  });
  // TODO: Cache Class 필요 .flush()
  if (Object.keys(imageCache).length > 7) {
    imageCache = {};
  }
  imageCache[courseId] = source;

  return imageCache[courseId];
}
