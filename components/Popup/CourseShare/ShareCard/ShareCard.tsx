import React from 'react';
import { copyToClipboard } from '~/util/clipboard';
import { useSharedCourseImageSource, useSharedCourseImageUrl } from '../CourseShareState';
import * as $ from './ShareCardView';

type Props = {
  //
};

const ShareCard: React.FC<Props> = () => {
  const image = useSharedCourseImageSource();
  const url = useSharedCourseImageUrl();
  const handleClickCopyButton = (e: React.MouseEvent) => {
    e.preventDefault();
    copyToClipboard(url);
  };

  return (
    <$.ShareCard>
      <$.AreaCourse>
        <$.CourseImage src={image} />
      </$.AreaCourse>
      <$.Title>코스 이미지 공유하기</$.Title>
      <$.DownloadButton href={image} download="course-image">
        <$.DownloadButtonImage>
          <$.IconWrap>
            <$.DownloadIcon />
          </$.IconWrap>
        </$.DownloadButtonImage>
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
