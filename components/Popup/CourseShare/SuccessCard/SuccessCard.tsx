import React from 'react';
import * as $ from './SuccessCardView';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';
import { formatTime } from '~/util';
import { mapboxService } from '~/services';
import { getStickerImageUrl } from '~/components/_assets/sticker';

export type Props = {
  course: GQL.Course;
  onClickShareButton: (e: React.MouseEvent) => void;
};

const CourseShare: React.FC<Props> = ({ course, onClickShareButton }) => {
  const [courseImageSource, setCourseImageSource] = React.useState(null);
  const closePopup = usePopupCloser();
  // TODO : 서버에서 내려주는 값으로 변경
  const time: string = formatTime(Math.floor(Date.now() / 1000), 'MM월 DD일');

  const handleClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  React.useEffect(() => {
    const { stickers } = course;
    const spotCoords = stickers.map(
      (sticker) => [sticker.spot.x, sticker.spot.y] as [number, number]
    );
    const spotImageUrls = stickers.map((sticker) =>
      getStickerImageUrl(sticker.sweet_percent, sticker.sticker_index)
    );

    mapboxService
      .getStaticImageSource({
        spotCoords,
        spotImageUrls,
        width: 496,
        height: 496,
      })
      .then((source) => setCourseImageSource(source));
  }, []);

  return (
    <$.SuccessCard>
      <$.AreaCourse>
        {courseImageSource && <$.CourseImage src={courseImageSource} />}
      </$.AreaCourse>
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
