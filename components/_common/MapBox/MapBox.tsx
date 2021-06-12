import React, { ReactNode } from 'react';
import { MB } from './MapBox.d';

type Props = {
  id: string;
  center: MB.Center;
  zoom: number;
};

type State = {
  center: MB.Center;
  zoom: number;
};

const win = window as any; // TODO : 타입 정의

export default class MapBox extends React.Component<Props, State> {
  private map: any;

  constructor(props: Props) {
    super(props);

    win.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    this.state = {
      center: this.props.center,
      zoom: this.props.zoom,
    };
  }

  public componentDidMount(): void {
    console.log(this.state.center);
    this.map = new win.mapboxgl.Map({
      container: this.props.id,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.state.center,
      zoom: this.state.zoom,
    });
  }

  public componentDidUpdate(): void {
    // TODO
  }

  public render(): ReactNode {
    return (
      <div id={this.props.id} style={{ width: '100%', height: '100%' }}></div>
    );
  }
}
