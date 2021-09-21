import React from 'react';
import StickerIcon from '~/components/_assets/sticker';
import PopupMenu, { setPopupPosition, setPopupSticker } from '~/components/Course/Editor/CourseForm/StickerForm/Table/TableItem/PopupMenu';
import { formatDate } from '~/util';
import * as $ from './StickerView';
import * as $Common from '../TableItemView';
import type { Props } from '../TableItem';
import { useRef } from 'react';

export default function StickerCard(props: Props): JSX.Element {
  const item= useRef(null);
  const {
    item: { order, sticker },
  } = props;

  const onContextMenu = (e: React.MouseEvent) => {
    const offset: { top: number; left: number; } = item.current.getBoundingClientRect() || { top: 0, left: 0 };
    const mouseOffset = { top: e.clientY - offset.top, left: e.clientX - offset.left };

    e.preventDefault();
    setPopupPosition(mouseOffset);
    setPopupSticker(sticker);
  }

  return (
    <$Common.TableItem ref={item}>
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
        <PopupMenu sticker={sticker} />
      </$Common.Card>
    </$Common.TableItem>
  );
}
