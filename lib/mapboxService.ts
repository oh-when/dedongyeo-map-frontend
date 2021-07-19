import MapboxService from 'mapbox-service';

const mapboxService = new MapboxService({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
});

export default mapboxService;
