export type Option = {
  theme?: string;
  accessToken: string;
};

const defaultOption: Partial<Option> = {
  theme: 'light-v10',
};

export default class MapBoxConfig {
  constructor(private opt: Option) {
    this.opt = { ...defaultOption, ...opt };
  }

  public getAccessToken() {
    return this.opt.accessToken;
  }

  public getTheme() {
    return this.opt.theme;
  }
}
