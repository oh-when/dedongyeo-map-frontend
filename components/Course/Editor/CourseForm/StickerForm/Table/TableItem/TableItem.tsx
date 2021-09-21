import React from 'react';
import AddButton from './AddButton';
import Sticker from './Sticker';
import Placeholder from './Placeholder';
import { FormTableItemType } from 'components/Course/Editor/Editor.d';
import * as $ from './TableItemView';
import type { FormTableItemDTO } from 'components/Course/Editor/Editor.d';

export type Props = {
  item: FormTableItemDTO;
  rowIndex: number;
  columnIndex: number;
};

export default function TableItem(props: Props): JSX.Element {
  switch (props.item.type) {
    case FormTableItemType.Line:
      return (
        <$.TableItem flexable={true}>
          <$.LineColumn />
        </$.TableItem>
      );
    case FormTableItemType.FlexLayout:
      return <$.DummyItem />;
    case FormTableItemType.Sticker:
      return <Sticker {...props} />;
    case FormTableItemType.Placeholder:
      return <Placeholder {...props} />;
    case FormTableItemType.AddButton:
      return <AddButton {...props} />;
    default:
      return null;
  }
}
