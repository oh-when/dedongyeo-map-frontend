import React from 'react';
import { useReactiveVar } from '@apollo/client';
import DatePicker from '~/components/_common/DatePicker';
import CalendarDate from '~/util/Calendar/CalendarDate';
import { cursorState } from './CalendarState';
import * as $ from './CalendarView';

export default function Calendar(): JSX.Element {
  const cursor = useReactiveVar(cursorState);
  const handleClickDate = (date: CalendarDate) => {
    console.log(date);
  };

  return (
    <$.Calendar>
      <DatePicker selected={cursor} onClickDate={handleClickDate} />
    </$.Calendar>
  );
}
