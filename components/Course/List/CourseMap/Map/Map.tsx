import React from 'react';
import MapBox from '~/components/_common/MapBox';
import { useCurrentStickers } from '~/components/Course/List/SideBar/CourseList/CourseListState';
import { MB } from '~/components/_common/MapBox/MapBox.d';
import CourseMarker, {
  Props as CourseMarkerProps,
} from '~/components/_assets/map/CourseMarker';

export default function Map(): JSX.Element {
  const stickers = useCurrentStickers();

  if (stickers.length === 0) {
    return null;
  }

  const { markers, center } = getMapProps(stickers);

  return (
    <MapBox id="course-list-map" zoom={14} markers={markers} center={center} />
  );
}

function getMapProps(stickers: GQL.Sticker[]): {
  center: MB.Coordinate;
  markers: MB.Marker[];
} {
  const center: MB.Coordinate = [0, 0];
  const markers: MB.Marker<CourseMarkerProps>[] = [];

  for (let i = 0; i < stickers.length; ++i) {
    const { _id, spot } = stickers[i];

    center[0] += spot.x;
    center[1] += spot.y;
    // onClick이 동작하기 위해서는 id 를 반드시 컴포넌트 루트요소에 넣어줘야 함.
    markers.push({
      id: `mk_${_id}`,
      coord: [spot.x, spot.y],
      num: `${i + 1}`,
      onClick: (props) => console.log(props), // TODO : 임시
      Component: CourseMarker,
    });
  }

  center[0] = center[0] / stickers.length;
  center[1] = center[1] / stickers.length;

  return {
    center,
    markers,
  };
}
