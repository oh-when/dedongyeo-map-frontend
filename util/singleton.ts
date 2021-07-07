type ESClass = { new (...args: any[]) };

export default function singleton<T extends ESClass>(target: T) {
  return class A extends target {
    private static _instance: T;

    constructor(...arg: any[]) {
      if (A._instance) {
        return A._instance;
      }
      super(...arg);
      A._instance = this as unknown as T;
    }
  };
}
