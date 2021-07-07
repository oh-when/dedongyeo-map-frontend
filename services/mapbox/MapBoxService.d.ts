import MapBoxConfig from './config/Config';
import MapBoxUrl from './config/Url';
import MapBoxStaticImage from './features/StaticImage';
import MapBoxDirection from './features/Directions';

export type InstancePool = {
  config: MapBoxConfig;
  url: MapBoxUrl;
  staticImage: MapBoxStaticImage;
  direction: MapBoxDirection;
};

export type DirectionType = 'cycling';
