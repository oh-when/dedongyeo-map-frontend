import React, { useState, ReactElement, useEffect } from 'react';
import * as $ from './CourseShareView';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';
import SuccessCard from './SuccessCard';
import ShareCard from './ShareCard';
import { setSharedCourse } from './CourseShareState';
import type { PopupChildProps } from '~/@types/popup.d';

export type Props = PopupChildProps & {
  course: GQL.Course;
};

export default function CourseShare({ zIndex, course }: Props): ReactElement {
  const [isSharePage, setIsSharePage] = useState(false);
  const closePopup = usePopupCloser();

  const onClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  const onClickShareButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSharePage(true);
  };

  
  let content = null;
  if (course) {
    content = isSharePage ? <ShareCard /> : <SuccessCard onClickShareButton={onClickShareButton} />;
  }

  useEffect(() => {
    setSharedCourse(course);
  }, [course]);

  return (
    <$.CourseShare zIndex={zIndex}>
      <$.Layer>
        <$.CloseLayerButton onClick={onClickCloseButton} />
        {content}
      </$.Layer>
    </$.CourseShare>
  );
}
