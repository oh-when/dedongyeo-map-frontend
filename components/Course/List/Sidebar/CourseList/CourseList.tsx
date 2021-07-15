import React from 'react';
// import { useEffect } from 'react';
// import { PopupType } from '~/@types/popup.d';
// import { usePopupOpener } from '~/lib/apollo/hooks/usePopup';
import CourseItem from './CourseItem';
import { useCurrentCourseIndex, useCurrentCourses } from './CourseListState';
import * as $ from './CourseListView';

export default function CourseList(): JSX.Element {
  const currentCourses = useCurrentCourses();
  const index = useCurrentCourseIndex();

  return (
    <$.CourseList>
      {currentCourses.map((course, i) => (
        <CourseItem
          key={`cl-${course._id}`}
          idx={i}
          course={course}
          isSelected={i === index}
        />
      ))}
    </$.CourseList>
  );
}
