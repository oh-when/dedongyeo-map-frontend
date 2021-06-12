import React from 'react';
import SpotNavigator from './SpotNavigator';
import * as $ from './CourseMapView';

export default function CourseMap(): JSX.Element {
  return (
    <$.CourseMap>
      <SpotNavigator />
    </$.CourseMap>
  );
}
