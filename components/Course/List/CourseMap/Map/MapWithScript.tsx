import React from 'react';
import ScriptLoader from '~/components/_common/ScriptLoader';
import Map, { Props as MapProps } from './Map';

export default function MapWithScript(props: MapProps): JSX.Element {
  return (
    <ScriptLoader src="https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.js">
      {({ isScriptLoaded }) => isScriptLoaded && <Map {...props} />}
    </ScriptLoader>
  );
}
