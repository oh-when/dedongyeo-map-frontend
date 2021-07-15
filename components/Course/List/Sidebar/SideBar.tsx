import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { isSidebarOpenedVar } from '../../CourseView';
import Calendar from './Calendar';
import CourseList from './CourseList';
import * as $ from './SideBarView';

export default function SideBar(): JSX.Element {
  const isSidebarOpened = useReactiveVar(isSidebarOpenedVar);

  return (
    <$.SideBar isOpened={isSidebarOpened}>
      <$.AreaTitle>코스 히스토리</$.AreaTitle>
      <$.AreaCalendar>
        <Calendar />
      </$.AreaCalendar>
      <$.AreaCourseList>
        <CourseList />
      </$.AreaCourseList>
    </$.SideBar>
  )
}
