export default function cmp(a: any, b: any): boolean {
  if (typeof a !== 'object') {
    return a === b;
  }

  if (Array.isArray(a)) {
    a.every((el, i) => cmp(el, b[i]));
  }

  return Object.keys(a).every((key) => cmp(a[key], b[key]));
}
