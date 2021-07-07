import Ajax from '~/util/Ajax';
import type {
  InstancePool,
  DirectionType,
} from '~/services/mapbox/MapBoxService.d';

type Option = {
  pool: InstancePool;
};

export default class MapBoxDirection {
  private ajax: Ajax = new Ajax();

  constructor(private opt: Option) {}

  public async getDirections({
    spotCoords,
    type,
  }: {
    spotCoords: Array<[number, number]>;
    type: DirectionType;
  }): Promise<Array<[number, number]>> {
    const url = this.opt.pool.url.getDirectionUrl({ spotCoords, type });

    return this.ajax
      .requestGET({
        url,
      })
      .then((data) => {
        if (
          !data ||
          !data.routes ||
          !data.routes[0] ||
          !data.routes[0].geometry ||
          !data.routes[0].geometry.coordinates
        ) {
          return [];
        }
        return data.routes[0].geometry.coordinates;
      });
  }
}
