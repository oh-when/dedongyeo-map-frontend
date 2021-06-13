import React, { ReactNode } from 'react';
import { Marker as MapBoxMarker } from 'mapbox-gl';

export namespace MB {
  export type Lng = number; // x
  export type Lat = number; // y
  export type Coordinate = [Lng, Lat];

  export type MarkerProps = {
    id: string;
    coord: Coordinate;
  };
  export type Marker = MarkerProps & {
    Component: React.ComponentType<MarkerProps>;
  };
  export type MarkerRecord = {
    data: Marker;
    rid: string;
    marker: MapBoxMarker;
  };
}
