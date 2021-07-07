import { encode } from 'urlencode';
import type {
  DirectionType,
  InstancePool,
} from '~/services/mapbox/MapBoxService.d';

type Option = {
  pool: InstancePool;
};

export default class MapBoxUrl {
  private static URL_ORIGIN = 'https://api.mapbox.com';
  private static STATIC_IMAGE_PATHS = 'styles/v1/mapbox';
  private static DIRECTION_PATHS = 'directions/v5/mapbox';

  constructor(private opt: Option) {}

  public getDirectionUrl({
    spotCoords,
    type,
  }: {
    spotCoords: Array<[number, number]>;
    type: DirectionType;
  }) {
    const { config } = this.opt.pool;
    const { URL_ORIGIN, DIRECTION_PATHS } = MapBoxUrl;
    const route = spotCoords
      .reduce((str, coord) => `${str};${coord[0]},${coord[1]}`, '')
      .substr(1);

    return `${URL_ORIGIN}/${DIRECTION_PATHS}/${type}/${route}?geometries=geojson&access_token=${config.getAccessToken()}`;
  }

  public async getStaticImageUrl({
    geojson,
    width,
    height,
  }: {
    geojson: Record<string, any>;
    width: number;
    height: number;
  }) {
    const { URL_ORIGIN, STATIC_IMAGE_PATHS } = MapBoxUrl;
    const { config } = this.opt.pool;

    const url = [
      URL_ORIGIN,
      STATIC_IMAGE_PATHS,
      config.getTheme(),
      'static',
      `geojson(${encode(JSON.stringify(geojson))})`,
      'auto',
      `${width}x${height}`,
    ].join('/');

    return `${url}?access_token=${config.getAccessToken()}`;
  }

  public getGeoJson({
    spots,
    line,
  }: {
    spots: Array<{
      coord: [number, number];
      imageUrl: string;
    }>;
    line: Array<[number, number]>;
  }) {
    const geojson = {
      type: 'FeatureCollection',
      features: [],
    };

    spots.forEach((spot) => {
      geojson.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: spot.coord,
        },
        properties: {
          'marker-size': 'medium',
          'marker-symbol': 'bus',
          'marker-color': '#ace',
        },
      });
    });

    geojson.features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: line,
      },
      properties: {
        stroke: '#f0f0f0',
        'stroke-width': 2,
      },
    });

    return geojson;
  }
}
