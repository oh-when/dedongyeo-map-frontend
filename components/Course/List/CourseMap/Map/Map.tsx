import React from 'react';
import MapBox from '~/components/_common/MapBox';
import { useCurrentStickers } from '~/components/Course/List/SideBar/CourseList/CourseListState';
import { MB } from '~/components/_common/MapBox/MapBox.d';

export default function Map(): JSX.Element {
  const stickers = useCurrentStickers();

  if (stickers.length === 0) {
    return null;
  }

  const props = getMapProps(stickers);

  return <MapBox id="course-list-map" zoom={12} {...props}></MapBox>;
}

function getMapProps(stickers: GQL.Sticker[]): {
  center: MB.Coordinate;
  markers: MB.Marker[];
} {
  const center: MB.Coordinate = [0, 0];
  const markers: MB.Marker[] = [];

  for (const { _id, spot } of stickers) {
    center[0] += spot.x;
    center[1] += spot.y;
    markers.push({
      id: _id,
      coord: [spot.x, spot.y],
      Component: function MarkerComponent() {
        return (
          <div
            style={{ width: '50px', height: '50px', background: 'black' }}
          ></div>
        );
      },
    });
  }

  center[0] = center[0] / stickers.length;
  center[1] = center[1] / stickers.length;

  return {
    center,
    markers,
  };
}
