import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import CourseList from './CourseList';
import * as $ from './SideBarView';

export default function SideBar(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    window && window.dispatchEvent && window.dispatchEvent(new Event('resize'));
  }, [isOpened]);

  return (
    <>
      <$.SideBar isOpened={isOpened}>
        <$.AreaTitle>코스 히스토리</$.AreaTitle>
        <$.AreaCalendar>
          <Calendar />
        </$.AreaCalendar>
        <$.AreaCourseList>
          <CourseList />
        </$.AreaCourseList>
      </$.SideBar>
      <$.ToggleButton isOpened={isOpened} onClick={() => setIsOpened(!isOpened)} />
    </>
  )
}
