import React, { ReactNode } from 'react';
import { Marker as MapBoxMarker } from 'mapbox-gl';

export namespace MB {
  export type Lng = number; // x
  export type Lat = number; // y
  export type Coordinate = [Lng, Lat];

  export type MarkerProps<T extends Record<string, any>> = T & {
    id: string;
    coord: Coordinate;
    onClick?: (props: MarkerProps) => void;
  };
  export type Marker<T = Record<string, any>> = MarkerProps<T> & {
    Component: React.ComponentType<MarkerProps<T>>;
  };
  export type MarkerRecord = {
    data: Marker;
    rid: string;
    marker: MapBoxMarker;
  };
}
