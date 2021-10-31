import React, { useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
import { gql, useLazyQuery } from '@apollo/client';
import {
  useCurrentPositionState,
  useIsCustomSpotFlag,
  useMapSpotsState,
} from '~/lib/apollo/vars/home';
import Storage from '~/lib/storage';
// import * as $ from '~/components/Home/MapArea/MapAreaView';
import SpotItem from '~/components/Home/MapArea/SpotItem';
import CustomSpotForm from '~/components/Popup/CustomSpotForm/CustomSpotForm';
import SpotInfoModal from '~/components/Home/MapArea/SpotInfoModal';
import { CommonMap } from '~/components/_common/MapBox';
import { Marker } from 'react-mapbox-gl';
// import SpotMarkerImg from 'public/spot_marker.png';

const GET_MAP_SPOTS = gql`
  query GetMapSpots($searchSpotDto: SearchSpotDto) {
    spots(searchSpotDto: $searchSpotDto) {
      cur_page
      is_end
      spots {
        _id
        place_id
        stickers(populate: true) {
          _id
          is_used
          sticker_index
          sweet_percent
        }
        place_name
        category_name
        category_group_code
        category_group_name
        phone
        address_name
        road_address_name
        place_url
        distance
        x
        y
        is_custom
        is_custom_share
      }
      total_count
      total_page_count
    }
  }
`;

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert('GPS를 지원하지 않습니다');
      return;
    }

    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function (position) {
        resolve(position);
      },
      function (error) {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000 * 60,
        timeout: Infinity,
      }
    );
  });
};

// const overlayEventHandlerMap: {
//   [spotId: string]: any;
// } = {};

// type LatLng = {
//   lngX: number;
//   latY: number;
// };

const MapBoxArea: React.FC = () => {
  // const [map, setMap] = useState(null);
  // const mapContainer = useRef(null);
  const [getMapSpots, { loading, data, called, error: error2 }] =
    useLazyQuery(GET_MAP_SPOTS);
  const [mapSpots, setMapSpots] = useMapSpotsState();
  const [currentPosition, setCurrentPosition] = useCurrentPositionState();
  const isCustomSpotFlag = useIsCustomSpotFlag();
  if (error2) console.log(error2);
  const [state, setState] = useState<{
    zoom: [number];
    center: [number, number];
    routes: number[];
  }>({
    zoom: [12],
    center: [127.01168879703, 37.5570641564289],
    routes: [],
  });
  const [spotInfoModalIdx, setSpotInfoModalIdx] = useState<number>(-1);
  const [isCreateCustomSpot, setIsCreateCustomSpot] = useState<boolean>(false);
  const [createCustomSpotPos, setCreateCustomSpotPos] = useState([
    127.01168879703, 37.5570641564289,
  ]);
  console.log(createCustomSpotPos);

  useEffect(() => {
    setState({
      ...state,
      center: [currentPosition.lngX, currentPosition.latY],
    });
  }, [currentPosition]);

  useEffect(() => {
    if (data && data?.spots && data?.spots?.spots) {
      setMapSpots(data.spots.spots);
    }
  }, [data, called, loading]);

  useEffect(() => {
    async function fetchCurrentPosition() {
      const storedPosition = Storage.getCurrentPosition();

      if (storedPosition) {
        setCurrentPosition(storedPosition);
      }

      getLocation().then((p: any) => {
        setCurrentPosition({
          latY: p.coords.latitude,
          lngX: p.coords.longitude,
        });
      });

      getMapSpots({
        variables: {
          searchSpotDto: {
            keyword: ' ',
            page: 1,
            size: 100,
          },
        },
      });
    }

    fetchCurrentPosition();
  }, []);

  // const [customSpotLatLng, setCustomSpotLatLng] = useState<LatLng>({
  //   lngX: null,
  //   latY: null,
  // });

  const handleClickMap = (map: any, event: any) => {
    const lngLat = event.lngLat;
    // console.log(isCustomSpotFlag);
    // if (isCustomSpotFlag) {
    setIsCreateCustomSpot(true);
    setCreateCustomSpotPos([lngLat.lng, lngLat.lat]);
    // } else setIsCreateCustomSpot(false);
  };

  useEffect(() => {
    if (isCustomSpotFlag) {
      document.querySelector('.mapboxgl-map').classList.add('spot-marker');
      document.querySelector('.mapboxgl-canvas').classList.add('spot-marker');
    } else {
      document.querySelector('.mapboxgl-map').classList.remove('spot-marker');
      document
        .querySelector('.mapboxgl-canvas')
        .classList.remove('spot-marker');
    }
  }, [isCustomSpotFlag]);

  const markerClickHandler = (idx: number) => {
    if (spotInfoModalIdx === idx) {
      setSpotInfoModalIdx(-1);
      return;
    }
    setSpotInfoModalIdx(idx);
    return;
  };

  const closeHandler = () => {
    setIsCreateCustomSpot(false);
  };
  console.log(mapSpots);
  return (
    <>
      <CommonMap
        center={state.center}
        zoom={state.zoom}
        style="mapbox://styles/mapbox/light-v10"
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        onClick={handleClickMap}
      >
        <>
          {mapSpots &&
            mapSpots.map((spot, idx) => {
              return (
                <>
                  {idx === spotInfoModalIdx ? (
                    <Marker
                      anchor="bottom"
                      coordinates={[spot.x, spot.y + 0.0005]}
                      key={`modal-${spot._id}`}
                      onClick={() => markerClickHandler(idx)}
                      style={{ zIndex: 10 }}
                    >
                      <SpotInfoModal spot={spot} />
                    </Marker>
                  ) : null}
                  <Marker
                    anchor="center"
                    coordinates={[spot.x, spot.y]}
                    key={`mk-${spot._id}`}
                    onClick={() => markerClickHandler(idx)}
                  >
                    <SpotItem spot={spot} />
                  </Marker>
                </>
              );
            })}
          {isCreateCustomSpot && (
            <Marker anchor="center" coordinates={createCustomSpotPos}>
              <>
                <CustomSpotForm
                  closeHandler={closeHandler}
                  coordinates={createCustomSpotPos}
                />
              </>
            </Marker>
          )}
        </>
      </CommonMap>
    </>
  );
};

export default React.memo(MapBoxArea);
