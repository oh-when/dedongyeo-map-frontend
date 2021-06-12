import React from 'react';
import { getStickerIconWithSugar } from '~/constants/sugar';
import * as $ from './SpotNavigatorView';

type Props = {
  index: number;
  sticker: GQL.Sticker;
};

export default function SpotNavigatorItem(props: Props): JSX.Element {
  const { sticker, index } = props;
  const Sticker = getStickerIconWithSugar(
    sticker.sweet_percent,
    sticker.sticker_index
  );

  return (
    <$.Item>
      <$.Navigator>
        <$.AreaSticker>
          <Sticker width={56} height={56} />
        </$.AreaSticker>
        <$.AreaInfo>
          <$.Meta>{`스팟 ${index + 1}`}</$.Meta>
          <$.Name>{sticker.spot.place_name}</$.Name>
        </$.AreaInfo>
      </$.Navigator>
    </$.Item>
  );
}
