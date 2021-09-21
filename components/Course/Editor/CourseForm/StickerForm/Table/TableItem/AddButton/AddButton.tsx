import React from 'react';
import { addPlaceholder } from '~/components/Course/Editor/CourseForm/StickerForm/StickerFormState';
import * as $ from './AddButtonView';
import * as $Common from '../TableItemView';
import type { Props as SpotItemProps } from '../TableItem';

const AddSpotButton: React.FC<SpotItemProps> = ({ rowIndex, columnIndex }) => {
  const isDashedLine = !(rowIndex === 0 && columnIndex === 0);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addPlaceholder();
  };

  return (
    <$Common.TableItem>
      <$.AddButton onClick={handleClick}>
        {isDashedLine && <$.DashedLine vertical={columnIndex % 3 === 0} />}
        <$.PlusIcon />
        <$.Comment>스팟을 추가해보세요</$.Comment>
      </$.AddButton>
    </$Common.TableItem>
  );
};

export default AddSpotButton;
