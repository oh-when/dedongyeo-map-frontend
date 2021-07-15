import React, { ReactElement, useContext } from 'react';
import { Layer, Feature } from 'react-mapbox-gl';
import { ThemeContext } from 'styled-components';

type Props = {
  routes: [number, number][];
  zoom: number;
};

const lineWidthBound = { min: 2, max: 12 };

export default function CourseLine({ routes, zoom }: Props): ReactElement {
  const theme = useContext(ThemeContext);

  let lineWidth = (2 / 14) * zoom;
  lineWidth = Math.max(lineWidth, lineWidthBound.min);
  lineWidth = Math.min(lineWidth, lineWidthBound.max);

  return (
    <Layer
      id="course-line"
      type="line"
      layout={{
        'line-cap': 'round',
        'line-join': 'round',
      }}
      paint={{
        'line-color': theme.primary.basic,
        'line-dasharray': [1, 2],
        'line-width': lineWidth,
      }}
      onLoad
    >
      <Feature coordinates={routes} />
    </Layer>
  );
}
