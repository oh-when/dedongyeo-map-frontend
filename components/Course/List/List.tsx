import React from 'react';
import CourseMap from './CourseMap';
import SideBar from './SideBar';
import { CourseLayout } from '../CourseView';

export default function List(): JSX.Element {
  return (
    <CourseLayout
      renderSideBar={() => <SideBar />}
      renderContent={() => <CourseMap />}
      isToggleButton={true}
    />
  );
}
