import React, { useState, ReactElement } from 'react';
import * as $ from './CourseShareView';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';
import SuccessCard from './SuccessCard';
import ShareCard from './ShareCard';
import type { PopupChildProps } from '~/@types/popup.d';
import { useEffect } from 'react';
import { setSharedCourse } from './CourseShareState';

export type Props = PopupChildProps & {
  course: GQL.Course;
};

export default function CourseShare({ zIndex, course }: Props): ReactElement {
  const [isSharePage, setIsSharePage] = useState(false);
  const closePopup = usePopupCloser();

  const handleClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  const handleClickShareButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSharePage(true);
  };

  useEffect(() => {
    setSharedCourse(course);
  }, [course]);

  return (
    <$.CourseShare zIndex={zIndex}>
      <$.Layer>
        <$.CloseLayerButton onClick={handleClickCloseButton} />
        {!isSharePage ? (
          <SuccessCard onClickShareButton={handleClickShareButton} />
        ) : (
          <ShareCard />
        )}
      </$.Layer>
    </$.CourseShare>
  );
}
