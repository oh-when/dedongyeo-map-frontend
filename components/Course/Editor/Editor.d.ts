export enum CandidateCardStatus {
  Wait,
  Moving,
  Moved,
}

export enum FormTableItemType {
  Sticker = 'Sticker',
  Line = 'Line',
  Placeholder = 'Placeholder',
  AddButton = 'AddButton',
  FlexLayout = 'FlexLayout',
}

export type StickerCardDTO = {
  id: string;
  spotName: string;
  sweetPercent: number;
  stickerIndex: number;
  partner: string;
  timestamp: number;
};

export type CandidateCardDTO = StickerCardDTO & {
  status: CandidateCardStatus;
};

export type FormTableItemDTO = {
  type: FormTableItemType;
  order: number;
  sticker: StickerCardDTO | null;
};

// 화면에 Table 형식으로 렌더링 하기 위한 matrix DTO
export type FormTableDTO = Array<Array<FormTableItemDTO>>;

// 실제 Array 형식으로 전송하기 위한 DTO
// null일 경우, PlaceHolder가 들어가 있음.
export type FormArrayDTO = Array<StickerCardDTO | null>;
