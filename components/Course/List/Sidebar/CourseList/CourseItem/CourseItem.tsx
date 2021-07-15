import React from 'react';
import { formatDate } from '~/util';
import { changeCurrentCourseIndex } from '../CourseListState';
import * as $ from './CourseItemView';

type Props = {
  idx: number;
  title: string;
  spotCount: number;
  timestamp: number;
  isPrivate: boolean;
  isSelected: boolean;
};

export default function CourseItem({
  idx,
  title,
  spotCount,
  timestamp,
  isPrivate,
  isSelected,
}: Props): JSX.Element {
  const dateStamp = formatDate(timestamp, true);

  const handleClickLink = (e: React.MouseEvent) => {
    e.preventDefault();
    changeCurrentCourseIndex(idx);
  };
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
    <$.CourseItem isSelected={isSelected}>
      <$.AreaInfo>
        <$.Stickers />
        <$.Title>{title}</$.Title>
        <$.Info>
          <$.SpotCount>총 {spotCount}개 스팟</$.SpotCount>
          <$.Date>{dateStamp}</$.Date>
        </$.Info>
      </$.AreaInfo>
      {isPrivate && <$.AreaLabel>비공개</$.AreaLabel>}
      <$.CourseLink onClick={handleClickLink} />
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
