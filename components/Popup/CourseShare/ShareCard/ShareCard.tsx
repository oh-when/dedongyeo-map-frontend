import React, { useRef } from 'react';
import { useSharedCourseImageSource } from '../CourseShareState';
import * as $ from './ShareCardView';

type Props = {
  //
};

const ShareCard: React.FC<Props> = () => {
  const hiddenInput = useRef(null);
  const image = useSharedCourseImageSource();
  const url = useSharedCourseImageSource();
  const handleClickCopyButton = (e: React.MouseEvent) => {
    e.preventDefault();
    hiddenInput.current.select();
    document.execCommand('copy');
  };

  return (
    <$.ShareCard>
      <$.HiddenInput ref={hiddenInput} value={url} />
      <$.AreaCourse>
        <$.CourseImage src={image} />
      </$.AreaCourse>
      <$.Title>코스 이미지 공유하기</$.Title>
      <$.DownloadButton href={url} download="course-image">
        <$.DownloadButtonImage></$.DownloadButtonImage>
        <$.DownloadButtonText>다운받기</$.DownloadButtonText>
      </$.DownloadButton>
      <$.AreaCopy>
        <$.CopyButton onClick={handleClickCopyButton}>링크 복사</$.CopyButton>
        <$.CopyUrl>
          <$.CopyUrlInner>{url}</$.CopyUrlInner>
        </$.CopyUrl>
      </$.AreaCopy>
    </$.ShareCard>
  );
};

export default ShareCard;
