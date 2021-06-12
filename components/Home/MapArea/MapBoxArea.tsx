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
import styled from 'styled-components';

const GET_MAP_SPOTS = gql`
  query GetMapSpots($searchSpotDto: SearchSpotDto) {
    spots(searchSpotDto: $searchSpotDto) {
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
  const [getMapSpots, { loading, data, called }] = useLazyQuery<
    GQL.GetMapSpots.Data,
    GQL.GetMapSpots.Variables
  >(GET_MAP_SPOTS);
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
            x: currentPosition.lngX,
            y: currentPosition.latY,
          },
        },
      });
    }
    fetchCurrentPosition();
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

    const initMap = ({ setMap, mapContainer, currentPosition }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
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
      new mapboxgl.Marker(<SpotItem spot={DUMMY_SPOT} />)
        .setLngLat([DUMMY_SPOT.x, DUMMY_SPOT.y])
        .addTo(map);
    }
  }, [map, isCustomSpotFlag]);

  useEffect(() => {
    console.log(currentPosition);
  }, [currentPosition]);

  useEffect(() => {
    if (data && data?.spots) {
      console.log(data?.spots);
      setMapSpots(data?.spots);
    }
  }, [data, called, loading]);

  return (
    <>
      <$.MapArea
        // onClick={handleClickMap}
        ref={(el) => (mapContainer.current = el)}
      />
    </>
  );
};

export default React.memo(MapBoxArea);
