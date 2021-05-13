import React from 'react';
import { DRAG_IDENTIFIER_VALUE, DRAG_KEY } from '~/constants/dom';
import { replacePlaceholder } from '~/components/Course/Editor/CourseForm/StickerForm/StickerFormState';
import * as $ from './PlaceholderView';
import * as $Common from '../TableItemView';
import type { Props } from '../TableItem';

export default function Placeholder(props: Props): JSX.Element {
  const {
    item: { order },
  } = props;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.getData(DRAG_KEY) !== DRAG_IDENTIFIER_VALUE) {
      return;
    }
    replacePlaceholder(order);
  };

  return (
    <$Common.TableItem>
      <$Common.Order>{order}</$Common.Order>
      <$Common.Card>
        <$.Placeholder
          isPressed={false}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <$.AreaSticker>
            <$.StickerPlaceholder />
          </$.AreaSticker>
          <$.AreaDescription>
            <$.Description>스팟을 드래그하여 등록해보세요</$.Description>
          </$.AreaDescription>
        </$.Placeholder>
      </$Common.Card>
    </$Common.TableItem>
  );
}
