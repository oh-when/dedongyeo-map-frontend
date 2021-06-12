import React from 'react';
import MapBox from '~/components/_common/MapBox';
import { useCurrentStickers } from '~/components/Course/List/SideBar/CourseList/CourseListState';
import { MB } from '~/components/_common/MapBox/MapBox.d';

export default function Map(): JSX.Element {
  const stickers = useCurrentStickers();

  if (stickers.length === 0) {
    return null;
  }

  const center = getCenter(stickers);

  return <MapBox id="course-list-map" zoom={12} center={center}></MapBox>;
}

function getCenter(stickers: GQL.Sticker[]): MB.Center {
  let xSum = 0;
  let ySum = 0;

  for (const { spot } of stickers) {
    xSum += spot.x;
    ySum += spot.y;
  }

  return [xSum / stickers.length, ySum / stickers.length];
}
