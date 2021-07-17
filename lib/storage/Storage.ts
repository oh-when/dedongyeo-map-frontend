import { findIndex } from '~/util/Array';
import type { PositionRecord } from '~/@types/record.d';

export enum StorageKey {
  StickerCards = 'service__sticker_cards',
  CourseCards = 'service__courses',
  CurrentPosition = 'service__pos_current',
}

export function makeStorageGetter<StorageRecord>(
  storageKey: StorageKey,
  defaultRecord: StorageRecord
): () => StorageRecord {
  return () => {
    const storedItem: string = localStorage.getItem(storageKey);
    const isStored = typeof storedItem === 'string';

    if (isStored) {
      try {
        return JSON.parse(storedItem);
      } catch (err) {
        return storedItem;
      }
    } else {
      return defaultRecord;
    }
  };
}

export function makeStorageSetter<StorageRecord>(
  storageKey: StorageKey
): (record: StorageRecord) => void {
  return (record: StorageRecord) => {
    const item: string =
      typeof record === 'object' ? JSON.stringify(record) : record.toString();

    localStorage.setItem(storageKey, item);
  };
}

export function makeStorageAdder<StorageRecordItem>(
  storageKey: StorageKey,
  getter: () => Array<StorageRecordItem>,
  predicate: (argItem: StorageRecordItem, item: StorageRecordItem) => boolean
): (recordItem: StorageRecordItem) => Array<StorageRecordItem> {
  return (recordItem: StorageRecordItem) => {
    const records: Array<StorageRecordItem> = getter();
    const existedIndex: number = findIndex<StorageRecordItem>(records, (item) =>
      predicate(recordItem, item)
    );

    if (existedIndex === -1) {
      records.push(recordItem);
      localStorage.setItem(storageKey, JSON.stringify(records));
    }

    return records;
  };
}

export function makeStorageRemover<StorageRecordItem, ItemId>(
  storageKey: StorageKey,
  getter: () => Array<StorageRecordItem>,
  predicate: (argItemId: ItemId, item: StorageRecordItem) => boolean
): (recordItem: ItemId) => Array<StorageRecordItem> {
  return (recordItemId: ItemId) => {
    const records: Array<StorageRecordItem> = getter();
    const existedIndex: number = findIndex<StorageRecordItem>(records, (item) =>
      predicate(recordItemId, item)
    );

    if (existedIndex === -1) {
      records.splice(existedIndex, 1);
      localStorage.setItem(storageKey, JSON.stringify(records));
    }

    return records;
  };
}

const getCurrentPosition = makeStorageGetter<PositionRecord>(
  StorageKey.CurrentPosition,
  {
    lngX: 127.0671244,
    latY: 37.2968082,
  }
);

const setCurrentPosition = makeStorageSetter<PositionRecord>(
  StorageKey.CurrentPosition
);

export default class Storage {
  public static getCurrentPosition = getCurrentPosition;
  public static setCurrentPosition = setCurrentPosition;
}
