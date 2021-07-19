export * from './cmp';
export * from './Registry';

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const toDigit = (num: number, len: number): string => {
  let digit: string = num.toString();

  while (digit.length < len) {
    digit = '0' + digit;
  }

  return digit;
};

export const getPathSegment = (pathname: string, index: number): string => {
  return pathname.split('/').filter((path) => !!path)[index] || '';
};

export const formatDate = (
  unixTime: number,
  isKoreanType?: boolean
): string => {
  const dateObject: Date = new Date(unixTime * 1000);

  const year: number = dateObject.getFullYear();
  const month: string = toDigit(dateObject.getMonth() + 1, 2);
  const date: string = toDigit(dateObject.getDate(), 2);

  if (isKoreanType) {
    return `${year}.${month}.${date}`;
  }

  return `${date}.${month}.${year}`;
};

export function formatTime(unixTime: number, placeholder: string): string {
  const dateObject: Date = new Date(unixTime * 1000);

  const year: number = dateObject.getFullYear();
  const month: string = toDigit(dateObject.getMonth() + 1, 2);
  const date: string = toDigit(dateObject.getDate(), 2);
  const result = placeholder
    .replace('YYYY', year.toString())
    .replace('MM', month.toString())
    .replace('DD', date.toString());

  return result;
}
