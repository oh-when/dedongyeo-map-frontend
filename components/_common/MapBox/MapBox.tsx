import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import { MB } from './MapBox.d';
import cmp from '~/util/cmp';
import { Registry } from '~/util';

type Props = {
  id: string;
  center: MB.Coordinate;
  zoom: number;
  markers?: MB.Marker[];
};

type State = {
  center: MB.Coordinate;
  zoom: number;
};

export default class MapBox extends React.Component<Props, State> {
  private map: Map = null;
  private markerRegistry: Registry<MB.MarkerRecord> =
    new Registry<MB.MarkerRecord>();
  // 클릭 이벤트 시 불필요한 탐색비용을 줄이기 위해서
  private markerHandlerRegistry: Registry<MB.MarkerProps<any>['onClick']> =
    new Registry<MB.MarkerProps<any>['onClick']>();

  constructor(props: Props) {
    super(props);

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    this.state = {
      center: this.props.center,
      zoom: this.props.zoom,
    };
  }

  public componentDidMount(): void {
    const handler = () => {
      this.handleLoadMap();
      this.map.off('load', handler);
    };

    this.mountMap();
    if (this.map.loaded()) {
      this.handleLoadMap();
    } else {
      this.map.on('load', handler);
    }
  }

  public componentWillUnmount(): void {
    this.unmountMap();
    this.unmountMarkers();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (!cmp(prevProps.center, this.props.center)) {
      this.map?.setCenter(this.props.center);
    }
    if (
      !cmp(
        prevProps.markers.map((marker) => marker.id),
        this.markerRegistry.map((id) => id)
      )
    ) {
      this.mountMarkers();
    }
  }

  public render(): ReactNode {
    const markerContainer = document.getElementById('marker-shadow');
    const markerNodes = (this.props.markers || []).map((markerProps) => {
      const props = { ...markerProps };
      const Marker = markerProps.Component;
      const rid = this.getMarkerRegistryId(props.id);

      delete props.Component;

      return (
        <div key={`mc-${rid}`} id={rid}>
          <Marker {...props} />
        </div>
      );
    });

    return (
      <>
        <div
          id={this.props.id}
          style={{ width: '100%', height: '100%' }}
          onClick={this.handleClickMap}
        ></div>
        {ReactDOM.createPortal(markerNodes, markerContainer)}
      </>
    );
  }

  private mountMap() {
    this.map = new Map({
      container: this.props.id,
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.state.center,
      zoom: this.state.zoom,
    });
  }

  private unmountMap() {
    this.map?.remove();
    this.map = null;
  }

  // TODO: O(2NM) => O(NM) 개선 가능
  private mountMarkers(markers: MB.Marker[] = []) {
    if (!this.map) {
      return;
    }

    const newRids = markers.map((marker) =>
      this.getMarkerRegistryId(marker.id)
    );

    this.removeOldMarkers(newRids);
    this.appendNewMarkers(newRids, markers);
  }

  private removeOldMarkers(newRids: string[]) {
    this.markerRegistry.each((_, record) => {
      if (newRids.indexOf(record.rid)) return;
      record.marker.remove();
      this.markerRegistry.remove(record.data.id);
      this.markerHandlerRegistry.remove(record.data.id);
    });
  }

  private appendNewMarkers(newRids: string[], markers: MB.Marker[]) {
    for (let i = 0; i < markers.length; ++i) {
      const { coord, id } = markers[i];
      const rid = newRids[i];

      if (this.markerRegistry.is(id)) {
        return;
      }

      const shadow = document.getElementById(rid);

      if (!shadow) {
        return;
      }

      const element =
        shadow.firstElementChild &&
        (shadow.firstElementChild.cloneNode(true) as HTMLElement);
      const marker: Marker = new Marker({ element });

      marker.setLngLat(coord).addTo(this.map);

      const record: MB.MarkerRecord = {
        data: markers[i],
        rid,
        marker,
      };

      this.markerRegistry.set(record.data.id, record);
      if (record.data.onClick) {
        this.markerHandlerRegistry.set(record.data.id, record.data.onClick);
      }
    }
  }

  private unmountMarkers() {
    this.markerRegistry.clear();
  }

  private getMarkerRegistryId(id: string): string {
    return `mr-${id}`;
  }

  private readonly handleLoadMap = () => {
    this.mountMarkers(this.props.markers);
  };

  private readonly handleClickMap = (e: React.MouseEvent) => {
    this.markerHandlerRegistry.each((id, handler) => {
      const target = e.target as Element;
      const marker = target.closest(`#${id}`);

      if (marker) handler(this.markerRegistry.get(id).data);
    });
  };
}
