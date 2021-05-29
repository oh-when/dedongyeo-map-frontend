import React from 'react';
import CourseItem from './CourseItem';
import * as $ from './CourseListView';

const unixNow = Math.floor(Date.now() / 1000);
const dummy = [
  { title: 'abc', spotCount: 0, timestamp: unixNow, isPrivate: true },
  { title: 'abcd', spotCount: 5, timestamp: unixNow, isPrivate: false },
  { title: 'abce', spotCount: 2, timestamp: unixNow, isPrivate: true },
  { title: 'abcf', spotCount: 4, timestamp: unixNow, isPrivate: false },
  { title: 'abcg', spotCount: 3, timestamp: unixNow, isPrivate: true },
  { title: 'abch', spotCount: 11, timestamp: unixNow, isPrivate: false },
];

export default function CourseList(): JSX.Element {
  return (
    <$.CourseList>
      {dummy.map((dummyItem) => (
        <CourseItem key={`course-list-${dummyItem.title}`} {...dummyItem} />
      ))}
    </$.CourseList>
  );
}
