import React from 'react';
import SpotNavigatorItem from './SpotNavigatorItem';
import { useCurrentStickers } from '~/components/Course/List/SideBar/CourseList/CourseListState';
import * as $ from './SpotNavigatorView';

export default function SpotNavigator(): JSX.Element {
  const stickers = useCurrentStickers();

  return (
    <$.SpotNavigator>
      <$.List>
        {stickers.map((sticker, i) => (
          <SpotNavigatorItem
            key={`sn-${sticker._id}`}
            sticker={sticker}
            index={i}
          />
        ))}
      </$.List>
    </$.SpotNavigator>
  );
}
