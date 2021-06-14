import React from 'react';
import StickerIcon from '~/components/_assets/sticker';
import * as $ from './SpotNavigatorView';

type Props = {
  index: number;
  sticker: GQL.Sticker;
};

export default function SpotNavigatorItem(props: Props): JSX.Element {
  const { sticker, index } = props;
  return (
    <$.Item>
      <$.Navigator>
        <$.AreaSticker>
          <StickerIcon
            width={56}
            height={56}
            sweetPercent={sticker.sweet_percent}
            stickerIndex={sticker.sticker_index}
          />
        </$.AreaSticker>
        <$.AreaInfo>
          <$.Meta>{`스팟 ${index + 1}`}</$.Meta>
          <$.Name>{sticker.spot.place_name}</$.Name>
        </$.AreaInfo>
      </$.Navigator>
    </$.Item>
  );
}
