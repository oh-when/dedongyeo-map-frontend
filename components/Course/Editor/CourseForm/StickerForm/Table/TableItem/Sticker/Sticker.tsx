import React from 'react';
import StickerIcon from '~/components/_assets/sticker';
import PopupMenu, { setPopupSticker } from '~/components/Course/Editor/CourseForm/StickerForm/Table/TableItem/PopupMenu';
import { formatDate } from '~/util';
import * as $ from './StickerView';
import * as $Common from '../TableItemView';
import type { Props } from '../TableItem';

export default function StickerCard(props: Props): JSX.Element {
  const {
    item: { order, sticker },
  } = props;

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPopupSticker(sticker);
  }

  return (
    <$Common.TableItem>
      <$Common.Order>{order}</$Common.Order>
      <$Common.Card onContextMenu={onContextMenu}>
        <$.Card isPressed={false}>
          <$.AreaSticker>
            <StickerIcon
              width={72}
              height={72}
              sweetPercent={sticker.sweetPercent}
              stickerIndex={sticker.stickerIndex}
            />
          </$.AreaSticker>
          <$.AreaDescription>
            <$.SpotName>{sticker.spotName}</$.SpotName>
            <$.Info>
              <$.Partner>{sticker.partner}</$.Partner>
              <$.Timestamp>{formatDate(sticker.timestamp, true)}</$.Timestamp>
            </$.Info>
          </$.AreaDescription>
        </$.Card>
      </$Common.Card>
      <PopupMenu sticker={sticker} />
    </$Common.TableItem>
  );
}
