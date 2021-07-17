import React from 'react';
import StickerForm from './StickerForm';
import TextForm from './TextForm';
import * as $ from './CourseFormView';

const CourseForm: React.FC = () => {
  return (
    <$.CourseForm>
      <StickerForm />
      <TextForm />
    </$.CourseForm>
  );
};

export default CourseForm;
