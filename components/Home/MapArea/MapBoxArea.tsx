import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { gql, useLazyQuery, useReactiveVar } from '@apollo/client';
import {
  useCurrentPositionState,
  useIsCustomSpotSetting,
  useMapSpotsState,
} from '~/lib/apollo/vars/home';
import Storage from '~/lib/storage';
import * as $ from '~/components/Home/MapArea/MapAreaView';

const GET_MAP_SPOTS = gql`
  query GetMapSpots($searchSpotDto: SearchSpotDto) {
    spots(searchSpotDto: $searchSpotDto) {
      _id
      place_id
      stickers(populate: true) {
        _id
        is_used
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

const MapBoxArea: React.FC = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [getMapSpots, { loading, data, called }] = useLazyQuery<
    GQL.GetMapSpots.Data,
    GQL.GetMapSpots.Variables
  >(GET_MAP_SPOTS);
  const [mapSpots, setMapSpots] = useMapSpotsState();
  const [currentPosition, setCurrentPosition] = useCurrentPositionState();
  const isCustomSpotSetting = useReactiveVar(useIsCustomSpotSetting);

  const handleClickMap = (e: React.MouseEvent) => {};

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
    const initMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [currentPosition.lngX, currentPosition.latY], // starting position [lng, lat]
        zoom: 12, // starting zoom
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (data && data?.spots) {
      console.log(data?.spots);
      setMapSpots(data?.spots);
    }
  }, [data, called, loading]);

  return (
    <>
      <$.MapArea
        onClick={handleClickMap}
        ref={(el) => (mapContainer.current = el)}
      />
    </>
  );
};

export default React.memo(MapBoxArea);
