declare module 'mapbox-gl' {
  declare type MapEventMap = {
    load: void;
  };

  declare const mapboxgl = {
    accessToken: string,
  };

  declare class Map {
    constructor(option: {
      container: string;
      style: string;
      center: [number, number]; // lng, lat
      zoom: number;
    }): this;

    loaded(): boolean;
    getZoom(): number;
    setZoom(zoom: number): void;
    setCenter(coord: [number, number]): void;
    remove(): void;
    on<Type extends keyof MapEventMap>(
      type: Type,
      handler: (param: MapEventMap[Type]) => void
    ): void;
    off<Type extends keyof MapEventMap>(
      type: Type,
      handler: (param: MapEventMap[Type]) => void
    ): void;
  }

  declare class Marker {
    constructor(option?: { element?: HTMLElement }): this;
    setLngLat(coord: [number, number]): this;
    addTo(map: Map): this;
    remove(): this;
  }

  export { Map, Marker };
  export default mapboxgl;
}

declare namespace MapBoxService {
  interface RouteJson {
    code: string;
    uuid: string;
    routes: Array<{
      distance: number;
      duration: number;
      geometry: {
        coordinates: [number, number][];
        type: string;
      };
    }>;
    waypoints: Array<{
      distance: number;
      location: [number, number];
      name: string;
    }>;
  }
}
