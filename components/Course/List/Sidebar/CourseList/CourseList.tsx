import React from 'react';
import { useEffect } from 'react';
import { PopupType } from '~/@types/popup.d';
import { usePopupOpener } from '~/lib/apollo/hooks/usePopup';
import CourseItem from './CourseItem';
import { useCurrentCourses } from './CourseListState';
import * as $ from './CourseListView';

export default function CourseList(): JSX.Element {
  const openPopup = usePopupOpener();
  const currentCourses = useCurrentCourses();

  // TODO : 임시
  useEffect(() => {
    const course = currentCourses[currentCourses.length - 1];

    console.log(course);
    openPopup({
      popupType: PopupType.COURSE_SHARE,
      popupProps: {
        course,
      },
    });
  }, [currentCourses]);

  return (
    <$.CourseList>
      {currentCourses.map((course, i) => (
        <CourseItem
          key={`cl-${course._id}`}
          idx={i}
          title={course.title}
          spotCount={course.stickers ? course.stickers.length : 0}
          timestamp={Math.floor(Date.now() / 1000)}
          isPrivate={!course.is_share}
        />
      ))}
    </$.CourseList>
  );
}
