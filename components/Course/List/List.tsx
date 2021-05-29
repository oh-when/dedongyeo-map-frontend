import React from 'react';
import { CourseLayout } from '~/components/Course/CourseView';

export default function List(): JSX.Element {
  return (
    <CourseLayout renderSideBar={() => <></>} renderContent={() => <></>} />
  );
}
