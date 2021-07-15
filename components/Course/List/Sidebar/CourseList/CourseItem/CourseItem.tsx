import React from 'react';
import StickerGroup from '~/components/_assets/sticker/StickerGroup';
import { formatDate } from '~/util';
import { changeCurrentCourseIndex } from '../CourseListState';
import * as $ from './CourseItemView';

type Props = {
  idx: number;
  isSelected: boolean;
  course: GQL.Course;
};

export default function CourseItem({
  idx,
  course,
  isSelected,
}: Props): JSX.Element {
  const unixTime = Math.floor(course.startAt / 1000)
  const dateStamp = formatDate(unixTime, true);

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
        <$.Stickers>
          <StickerGroup
            keygen={`course-item-${idx}`}
            stickers={course.stickers}
            unitWidth={40}
            unitHeight={40}
          />
        </$.Stickers>
        <$.Title>{course.title}</$.Title>
        <$.Info>
          <$.SpotCount>총 {course.stickers.length}개 스팟</$.SpotCount>
          <$.Date>{dateStamp}</$.Date>
        </$.Info>
      </$.AreaInfo>
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
      <$.ShareLabel isShare={course.isShare}>{course.isShare ? '공개' : '비공개'}</$.ShareLabel>
    </$.CourseItem>
  );
}
