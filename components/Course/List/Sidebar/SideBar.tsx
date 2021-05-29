import React from 'react';
import Calendar from './Calendar';
import * as $ from './SideBarView';

export default function SideBar(): JSX.Element {
  return (
    <$.SideBar>
      <$.AreaTitle>코스 히스토리</$.AreaTitle>
      <$.AreaCalendar>
        <Calendar />
      </$.AreaCalendar>
    </$.SideBar>
  );
}
