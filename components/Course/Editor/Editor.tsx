import React from 'react';
import Candidates from './Candidates';
import CourseForm from './CourseForm';
import { CourseLayout } from '~/components/Course/CourseView';

const Editor: React.FC = () => {
  return (
    <CourseLayout
      renderSideBar={() => <Candidates />}
      renderContent={() => <CourseForm />}
    />
  );
};

export default Editor;
