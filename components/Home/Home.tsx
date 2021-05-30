import React from 'react';
import Popup from '~/components/Popup';
import SearchPlace from '~/components/Home/SearchPlace';
import MainMood from '~/components/Home/Mood/MainMood';
import MapBoxArea from '~/components/Home/MapArea';

const Home: React.FC = () => {
  return (
    <>
      {/*<ScriptLoader*/}
      {/*  src="https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0e6db48d0c7634cd2e3eec3354bd4145"*/}
      {/*  blocker={() =>*/}
      {/*    new Promise((resolve) => {*/}
      {/*      (window as any).kakao.maps.load(resolve);*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  {({ isScriptLoaded }) => isScriptLoaded && <MapArea />}*/}
      {/*</ScriptLoader>*/}
      <MapBoxArea />
      <SearchPlace />
      <MainMood />
      <Popup />
    </>
  );
};

export default Home;
