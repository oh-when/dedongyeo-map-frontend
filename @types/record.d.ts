export type CourseCardRecord = {
  id: string;
  title: string;
  stickers: Sticker[];
  courseImage: string;
  numStickers: number;
  timestamp: number;
};

export type PositionRecord = {
  lngX: number;
  latY: number;
};
