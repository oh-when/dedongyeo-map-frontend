import type { DefaultTheme } from 'styled-components';
import { SweetPercent } from '~/constants/stickers';

const deviceSizes = {
  mobile: '375px',
  tablet: '1500px',
  laptop: '1706px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const theme: DefaultTheme = {
  device,
  primary: {
    basic: '#FD476D',
    light: '#FE91A7',
    dark: '#E94164',
  },
  secondary: {
    all: '#343A40',
    [SweetPercent.$0]: '#449AFF',
    [SweetPercent.$30]: '#4CE5B7',
    [SweetPercent.$50]: '#FFCF52',
    [SweetPercent.$70]: '#FF845E',
    [SweetPercent.$100]: '#9971FF',
  },
  basic: {
    black: '#000',
    white: '#fff',
  },
  grayscale: {
    '1': '#F8F9FA',
    '2': '#F1F3F5',
    '3': '#E9ECEF',
    '4': '#DEE2E6',
    '5': '#CED4DA',
    '6': '#ADB5BD',
    '7': '#868E96',
    '8': '#495057',
    '9': '#343A40',
    '10': '#212121',
  },
  system: {
    error: '#FF5B5B',
    positive: '#36D789',
  },
  font: {
    roboto: 'Roboto, sans-serif',
  },
};

export default theme;
