import Ajax from '~/util/Ajax';
import type { InstancePool } from '~/services/mapbox/MapBoxService.d';

type Option = {
  pool: InstancePool;
};

export default class MapBoxStaticImage {
  private ajax: Ajax = new Ajax();

  constructor(private opt: Option) {}

  public async getStaticImageSource({
    spotCoords,
    spotImageUrls,
    width,
    height,
  }: {
    spotCoords: Array<[number, number]>;
    spotImageUrls: string[];
    width: number;
    height: number;
  }): Promise<string> {
    const { url, direction } = this.opt.pool;
    const line = await direction.getDirections({ type: 'cycling', spotCoords });
    const geojson = url.getGeoJson({
      spots: spotCoords.map((coord, i) => ({
        coord,
        imageUrl: spotImageUrls[i],
      })),
      line,
    });
    const staticImageUrl = await url.getStaticImageUrl({
      geojson,
      width,
      height,
    });

    const blob = await this.ajax.requestBLOB({
      url: staticImageUrl,
    });
    const base64: string = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result.toString());
      };
      reader.readAsDataURL(blob);
    });

    return base64;
  }
}
