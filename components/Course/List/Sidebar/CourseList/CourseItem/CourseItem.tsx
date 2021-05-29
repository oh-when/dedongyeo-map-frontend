import React from 'react';
import { formatDate } from '~/util';
import * as $ from './CourseItemView';

type Props = {
  title: string;
  spotCount: number;
  timestamp: number;
  isPrivate: boolean;
};

export default function CourseItem({
  title,
  spotCount,
  timestamp,
  isPrivate,
}: Props): JSX.Element {
  const dateStamp = formatDate(timestamp, true);

  const handleClickShare = () => {
    // TODO;
  };
  const handleClickEdit = () => {
    // TODO;
  };
  const handleClickDelete = () => {
    // TODO;
  };

  return (
    <$.CourseItem>
      <$.AreaInfo>
        <$.Stickers />
        <$.Title>{title}</$.Title>
        <$.Info>
          <$.SpotCount>총 {spotCount}개 스팟</$.SpotCount>
          <$.Date>{dateStamp}</$.Date>
        </$.Info>
      </$.AreaInfo>
      {isPrivate && <$.AreaLabel>비공개</$.AreaLabel>}
      <$.AreaButton>
        <$.ItemButton onClick={handleClickShare}>
          <$.ShareIcon />
        </$.ItemButton>
        <$.ItemButton onClick={handleClickEdit}>
          <$.EditIcon />
        </$.ItemButton>
        <$.ItemButton onClick={handleClickDelete}>
          <$.DeleteIcon />
        </$.ItemButton>
      </$.AreaButton>
    </$.CourseItem>
  );
}
