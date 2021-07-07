import MapBoxService from './mapbox';

export const mapboxService = new MapBoxService({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
});
