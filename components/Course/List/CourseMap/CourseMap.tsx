import React from 'react';
import dynamic from 'next/dynamic';
import SpotNavigator from './SpotNavigator';
import * as $ from './CourseMapView';

const Map = dynamic(() => import('~/components/Course/List/CourseMap/Map'), {
  ssr: false,
});

export default function CourseMap(): JSX.Element {
  return (
    <$.CourseMap>
      <Map />
      <SpotNavigator />
    </$.CourseMap>
  );
}
