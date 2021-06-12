import React from 'react';
import CourseItem from './CourseItem';
import { useCurrentCourses } from './CourseListState';
import * as $ from './CourseListView';

export default function CourseList(): JSX.Element {
  const currentCourses = useCurrentCourses();

  return (
    <$.CourseList>
      {currentCourses.map((course) => (
        <CourseItem
          key={`cl-${course._id}`}
          title={course.title}
          spotCount={course.stickers ? course.stickers.length : 0}
          timestamp={Math.floor(Date.now() / 1000)}
          isPrivate={!course.is_share}
        />
      ))}
    </$.CourseList>
  );
}
