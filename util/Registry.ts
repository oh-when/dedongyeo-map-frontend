/**
 * - 단방향 Map 방식 Registry
 */
export class Registry<Data> {
  private recordMap: Record<string, Data> = {};

  constructor(private readonly middlewares: Array<(data: Data) => Data> = []) {}

  public set(key: string, data: Data): this {
    const record = this.middlewares.reduce(
      (r, middleware) => middleware(r),
      data
    );

    this.recordMap[key] = record;

    return this;
  }

  public get(key: string): Data {
    return this.recordMap[key] || null;
  }

  public remove(key: string): this {
    delete this.recordMap[key];

    return this;
  }

  public clear(): this {
    this.recordMap = {};
    return this;
  }

  public is(key: string): boolean {
    return this.recordMap[key] !== undefined;
  }

  public find(callback: (key: string, data: Data) => boolean): boolean {
    for (const key of Object.keys(this.recordMap)) {
      const data = this.recordMap[key];

      if (callback(key, data)) {
        return true;
      }
    }

    return false;
  }

  public each(callback: (key: string, data: Data) => void): void {
    Object.keys(this.recordMap).forEach((key) =>
      callback(key, this.recordMap[key])
    );
  }

  public map<Output>(callback: (key: string, data: Data) => Output): Output[] {
    return Object.keys(this.recordMap).map((key) =>
      callback(key, this.recordMap[key])
    );
  }
}
