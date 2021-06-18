import React from 'react';
import { Marker, ZoomControl } from 'react-mapbox-gl';
import { CommonMap } from '~/components/_common/MapBox';
import {
  getCenter,
  inject,
} from '~/components/Course/List/SideBar/CourseList/CourseListState';
import CourseMarker from '~/components/_assets/map/CourseMarker';
import type { Map } from 'mapbox-gl';
import { ReactElement } from 'react';
import cmp from '~/util/cmp';

type Props = {
  stickers: GQL.Sticker[];
  center?: [number, number];
};

type State = {
  zoom: [number];
  center: [number, number];
};

class CourseMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      zoom: [14],
      center: getCenter(this.props.stickers),
    };
  }

  public componentDidUpdate(prevProps: Props) {
    const prevStickers = prevProps.stickers.map(({ _id }) => _id);
    const currentStickers = this.props.stickers.map(({ _id }) => _id);

    console.log('...?');
    if (!cmp(prevStickers, currentStickers)) {
      this.setState({
        ...this.state,
        center: getCenter(this.props.stickers),
      });
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
      </CommonMap>
    );
  }

  private onZoomEnd = (map: Map) => {
    this.setState({
      ...this.state,
      zoom: [map.getZoom()],
    });
  };
}

export default inject(CourseMap);
