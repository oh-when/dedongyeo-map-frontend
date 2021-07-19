import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { gql, useLazyQuery, useReactiveVar } from '@apollo/client';
import {
  useCurrentPositionState,
  useIsCustomSpotFlag,
  useMapSpotsState,
} from '~/lib/apollo/vars/home';
import Storage from '~/lib/storage';
import * as $ from '~/components/Home/MapArea/MapAreaView';
import SpotItem from '~/components/Home/MapArea/SpotItem';
import { DUMMY_SPOT } from '~/components/Home/MapArea/SpotItem/SpotItem';
import CustomSpotForm from '~/components/Popup/CustomSpotForm/CustomSpotForm';
import SpotInfoModal from '~/components/Home/MapArea/SpotInfoModal';

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
        groupedSticker {
          sticker_index
          total_count
        }
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
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [getMapSpots, { loading, data, called }] = useLazyQuery(GET_MAP_SPOTS);
  const [mapSpots, setMapSpots] = useMapSpotsState();
  const [currentPosition, setCurrentPosition] = useCurrentPositionState();
  const isCustomSpotFlag = useIsCustomSpotFlag();

  // const [customSpotLatLng, setCustomSpotLatLng] = useState<LatLng>({
  //   lngX: null,
  //   latY: null,
  // });

  // const customSpotMarker = new mapboxgl.Marker();

  // const handleClickMap = (e: React.MouseEvent) => {};

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
            keyword: '',
            page: 1,
            size: 100,
          },
        },
      });
    }
    fetchCurrentPosition();
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

    const initMap = ({ setMap, mapContainer, currentPosition }) => {
      const map = new (mapboxgl as any).Map({
        container: mapContainer.current, // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        center: [currentPosition.lngX, currentPosition.latY], // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });

      map.on('click', (e) => {
        // 이전 커스텀 스팟 삭제
        const arr = document.getElementsByClassName('custom-marker');
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          arr[i].parentNode.removeChild(arr[i]);
        }

        // 커스텀 스팟 마커 만들기
        const el = document.createElement('div');
        el.className = 'marker custom-marker';
        el.style.backgroundImage =
          'url(https://s3.ap-northeast-2.amazonaws.com/asset-dev.goodoc.kr/owen/spot_marker.png)';
        el.style.width = '50px';
        el.style.height = '50px';
        el.style.backgroundSize = '100%';
        console.log(el);
        new mapboxgl.Marker(el).setLngLat(e.lngLat).addTo(map);
      });
    };

    if (!map) {
      console.log('init map');
      initMap({ setMap, mapContainer, currentPosition });
    } else {
      map.jumpTo({ center: [currentPosition.lngX, currentPosition.latY] });

      // 스팟들을 지도에 그리기
      console.log(mapSpots);
      // console.log(<SpotItem spot={DUMMY_SPOT} />);
      mapSpots.forEach((spot) => {
        new mapboxgl.Marker(<SpotItem spot={spot} />)
          .setLngLat([spot.x, spot.y])
          .addTo(map);
      });
      // new mapboxgl.Marker(<SpotItem spot={DUMMY_SPOT} />)
      //   .setLngLat([DUMMY_SPOT.x, DUMMY_SPOT.y])
      //   .addTo(map);
    }
  }, [map, isCustomSpotFlag, mapSpots]);

  useEffect(() => {
    console.log(currentPosition);
  }, [currentPosition]);

  useEffect(() => {
    if (data && data?.spots && data?.spots?.spots) {
      console.log(data.spots.spots);
      setMapSpots(data.spots.spots);
    }
  }, [data, called, loading]);

  return (
    <>
      <$.MapArea
        // onClick={handleClickMap}
        ref={(el) => (mapContainer.current = el)}
      />
      <CustomSpotForm />
      <SpotItem spot={DUMMY_SPOT} />
      <SpotInfoModal />
    </>
  );
};

export default React.memo(MapBoxArea);
