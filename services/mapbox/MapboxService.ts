import singleton from '~/util/singleton';
import MapBoxConfig, { Option as ConfigOption } from './config/Config';
import MapBoxUrl from './config/Url';
import MapBoxStaticImage from './features/StaticImage';
import MapBoxDirection from './features/Directions';
import type { InstancePool } from './MapBoxService.d';

class MapboxService {
  private pool: InstancePool;

  constructor(configOption: ConfigOption) {
    // TODO: DI 필요
    const pool: Partial<InstancePool> = {};
    const config = new MapBoxConfig(configOption);
    const url = new MapBoxUrl({ pool: pool as InstancePool });
    const staticImage = new MapBoxStaticImage({ pool: pool as InstancePool });
    const direction = new MapBoxDirection({ pool: pool as InstancePool });

    pool.config = config;
    pool.url = url;
    pool.staticImage = staticImage;
    pool.direction = direction;
    this.pool = pool as InstancePool;
  }

  public get config() {
    return this.pool.config;
  }

  public get url() {
    return this.pool.url;
  }

  public get staticImage() {
    return this.pool.staticImage;
  }

  public get direction() {
    return this.pool.direction;
  }
}

export default singleton(MapboxService);
