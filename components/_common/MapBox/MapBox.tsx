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
        <div id={this.props.id} style={{ width: '100%', height: '100%' }}></div>
        {ReactDOM.createPortal(markerNodes, markerContainer)}
      </>
    );
  }

  private mountMap() {
    this.map = new Map({
      container: this.props.id,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
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
        (shadow.firstElementChild.cloneNode() as HTMLElement);
      const marker: Marker = new Marker({ element });

      marker.setLngLat(coord).addTo(this.map);

      const record: MB.MarkerRecord = {
        data: markers[i],
        rid,
        marker,
      };

      this.markerRegistry.set(record.data.id, record);
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
}
