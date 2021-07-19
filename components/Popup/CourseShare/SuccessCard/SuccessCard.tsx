import React from 'react';
import * as $ from './SuccessCardView';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';
import { formatTime } from '~/util';
import {
  useSharedCourseImageSource,
  useSharedCourse,
} from '../CourseShareState';

export type Props = {
  onClickShareButton: (e: React.MouseEvent) => void;
};

const CourseShare: React.FC<Props> = ({ onClickShareButton }) => {
  const course = useSharedCourse();
  const image = useSharedCourseImageSource();
  const closePopup = usePopupCloser();
  // TODO : 서버에서 내려주는 값으로 변경
  const time: string = formatTime(Math.floor(Date.now() / 1000), 'MM월 DD일');

  const handleClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  return (
    <$.SuccessCard>
      <$.AreaCourse>{image && <$.CourseImage src={image} />}</$.AreaCourse>
      <$.AreaFooter>
        <$.Title>데이트 코스가 등록되었어요!</$.Title>
        <$.Description>
          {time} ‘{course.title}’가 등록되었습니다.
          <br />
          데이트 코스를 공유하시겠어요?
        </$.Description>
        <$.Buttons>
          <$.CloseButton onClick={handleClickCloseButton}>닫기</$.CloseButton>
          <$.ShareButton onClick={onClickShareButton}>공유하기</$.ShareButton>
        </$.Buttons>
      </$.AreaFooter>
    </$.SuccessCard>
  );
};

export default CourseShare;
