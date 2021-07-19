import React from 'react';
import { useFormArray } from './StickerFormState';
import Table from './Table';
import * as $ from './StickerFormView';
import { FormArrayDTO } from '~/components/Course/Editor/Editor.d';

export default function StickerForm(): JSX.Element {
  const formArray: FormArrayDTO = useFormArray();

  return (
    <$.StickerForm>
      <Table formArray={formArray} />
    </$.StickerForm>
  );
}
