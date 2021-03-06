import React from 'react';
import { Marker, ZoomControl } from 'react-mapbox-gl';
import { CommonMap } from '~/components/_common/MapBox';
import {
  getCenter,
  fetchRoutes,
  inject,
} from '~/components/Course/List/Sidebar/CourseList/CourseListState';
import CourseMarker from '~/components/_assets/map/CourseMarker';
import type { Map } from 'mapbox-gl';
import { ReactElement } from 'react';
import cmp from '~/util/cmp';
import CourseLine from '~/components/_assets/map/CourseLine';

type Props = {
  stickers: GQL.Sticker[];
};

type State = {
  zoom: [number];
  center: [number, number];
  routes: [number, number][];
};

class CourseMap extends React.Component<Props, State> {
  private isUnmounted: boolean;

  constructor(props: Props) {
    super(props);
    this.state = {
      zoom: [14],
      center: [0, 0],
      routes: [],
    };
  }

  public componentDidMount() {
    this.isUnmounted = false;
    this.update();
  }

  public componentWillUnmount() {
    this.isUnmounted = true;
  }

  public componentDidUpdate(prevProps: Props) {
    const prevStickers = prevProps.stickers.map(({ _id }) => _id);
    const currentStickers = this.props.stickers.map(({ _id }) => _id);

    if (!cmp(prevStickers, currentStickers)) {
      this.update();
    }
  }

  public render(): ReactElement {
    const { stickers } = this.props;

    if (!this.state.center[0] || !this.state.center[1]) {
      return null;
    }

    return (
      <CommonMap
        center={this.state.center}
        zoom={this.state.zoom}
        style="mapbox://styles/mapbox/light-v10"
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        onZoomEnd={this.onZoomEnd}
        onStyleLoad={this.onStyleLoaded}
      >
        <ZoomControl />
        <>
          {stickers.map((sticker, i) => {
            return (
              <Marker
                key={`mk-${sticker._id}`}
                coordinates={[sticker.spot.x, sticker.spot.y]}
                anchor="center"
                onClick={(e) => console.log(e)}
                style={{ zIndex: 10000 - i }}
              >
                <CourseMarker num={i + 1} zoom={this.state.zoom} />
              </Marker>
            );
          })}
        </>
        <CourseLine routes={this.state.routes} zoom={this.state.zoom[0]} />
      </CommonMap>
    );
  }

  private onZoomEnd = (map: Map) => {
    this.setState({
      ...this.state,
      zoom: [map.getZoom()],
    });
  };

  private onStyleLoaded = (map: Map) => {
    // ????????? ?????? ??? ?????? ??????????????? ?????? ???. (??????????????? ?????? ????????? ??????????????? ?????? ??????)
    // React MapBoxGL??? ????????? ??????
    this.setState({
      ...this.state,
      zoom: [map.getZoom()],
    });
  };

  private update() {
    if (this.isUnmounted) {
      return;
    }
    const center = getCenter(this.props.stickers);
    const waitRoutes = fetchRoutes(this.props.stickers);

    waitRoutes.then((routes) => {
      this.setState({
        ...this.state,
        routes,
        center,
      });
    });
  }
}

export default inject(CourseMap);
