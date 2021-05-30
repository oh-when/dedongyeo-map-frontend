import React from 'react';
import Popup from '~/components/Popup';
import SearchPlace from '~/components/Home/SearchPlace';
import MainMood from '~/components/Home/Mood/MainMood';
import MapBoxArea from '~/components/Home/MapArea';

const Home: React.FC = () => {
  return (
    <>
      <MapBoxArea />
      <SearchPlace />
      <MainMood />
      <Popup />
    </>
  );
};

export default Home;
