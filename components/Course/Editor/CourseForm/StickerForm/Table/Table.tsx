import React from 'react';
import { toFormTableDTO } from './TableState';
import TableItem from './TableItem';
import * as $ from './TableView';
import type {
  FormArrayDTO,
  FormTableDTO,
} from '~/components/Course/Editor/Editor.d';

type Props = {
  formArray: FormArrayDTO;
};

function Table(props: Props): JSX.Element {
  const { formArray } = props;
  const table: FormTableDTO = toFormTableDTO(formArray);

  return (
    <React.Fragment>
      {table.map((row, i) => (
        <React.Fragment key={`row-${i}`}>
          <$.Row>
            {row.map((item, j) => (
              <TableItem
                key={
                  item?.sticker?.id
                    ? `item-${item.sticker?.id}`
                    : `col-${i}-${j}`
                }
                item={item}
                rowIndex={i}
                columnIndex={j}
              />
            ))}
          </$.Row>
          {table[i + 1] && <$.LineRow />}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default React.memo(Table);
