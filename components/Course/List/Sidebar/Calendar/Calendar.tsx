import React from 'react';
import DatePicker from '~/components/_common/DatePicker';
import CalendarDate from '~/util/Calendar/CalendarDate';
import { useCursorState } from './CalendarState';
import * as $ from './CalendarView';

export default function Calendar(): JSX.Element {
  const [cursor, setCursor] = useCursorState();
  const handleClickDate = (date: CalendarDate) => {
    setCursor([date.getYear(), date.getMonth(), date.getDate()]);
  };

  return (
    <$.Calendar>
      <DatePicker selected={cursor} onClickDate={handleClickDate} />
    </$.Calendar>
  );
}
