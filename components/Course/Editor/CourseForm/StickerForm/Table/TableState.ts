import { FormTableItemType } from '~/components/Course/Editor/Editor.d';
import type {
  FormArrayDTO,
  FormTableDTO,
  FormTableItemDTO,
} from '~/components/Course/Editor/Editor.d';

const COLUMN_COUNT = 3; // 화면에 표시 되는 카드의 열 개수
const LAYOUT_COLUMN_COUNT = COLUMN_COUNT * 2 - 1; // 실제 DOM의 열 개수

const DEFAULT_DTO: FormTableItemDTO = {
  type: FormTableItemType.Line,
  order: -1,
  sticker: null,
};

export function toFormTableDTO(formArray: FormArrayDTO): FormTableDTO {
  const table: FormTableDTO = [[]];
  let order = 1;

  for (let i = 0; i < formArray.length; ++i) {
    const remainer: number = i % COLUMN_COUNT;
    const row: FormTableItemDTO[] = table[table.length - 1];

    const isPlaceholder: boolean = formArray[i] === null;
    const type: FormTableItemType = isPlaceholder
      ? FormTableItemType.Placeholder
      : FormTableItemType.Sticker;
    const line: FormTableItemDTO = {
      ...DEFAULT_DTO,
      type: FormTableItemType.Line,
    };
    const item: FormTableItemDTO = {
      type,
      order,
      sticker: formArray[i],
    };

    if (remainer === 0) {
      row[0] = item;
    } else if (remainer > 0 && remainer < COLUMN_COUNT - 1) {
      row[1] = line;
      row[2] = item;
    } else if (remainer === COLUMN_COUNT - 1) {
      row[3] = line;
      row[4] = item;
      if (formArray[i + 1] !== undefined) {
        table.push([]);
      }
    }
    order++;
  }

  let lastRow: FormTableItemDTO[] = table[table.length - 1];

  // 스팟 추가버튼 추가
  if (lastRow.length >= LAYOUT_COLUMN_COUNT) {
    table.push([]);
    lastRow = table[table.length - 1];
    lastRow.push({ ...DEFAULT_DTO, type: FormTableItemType.AddButton });
  } else if (lastRow.length === 0) {
    lastRow.push({ ...DEFAULT_DTO, type: FormTableItemType.AddButton });
  } else {
    lastRow.push({ ...DEFAULT_DTO, type: FormTableItemType.Line });
    lastRow.push({ ...DEFAULT_DTO, type: FormTableItemType.AddButton });
  }

  // DOM Layout을 위한 더미 아이템 추가
  if (lastRow.length > 0 && lastRow.length < LAYOUT_COLUMN_COUNT) {
    lastRow.push({ ...DEFAULT_DTO, type: FormTableItemType.FlexLayout });
  }

  return table;
}
