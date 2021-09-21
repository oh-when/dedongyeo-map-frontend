import createMap from 'react-mapbox-gl';

export const CommonMap = createMap({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
  minZoom: 0,
  maxZoom: 20,
  scrollZoom: true,
  doubleClickZoom: false,
});
