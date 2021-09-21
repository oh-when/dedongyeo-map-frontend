import React from 'react';
import styled from 'styled-components';
import { SweetPercent } from '~/constants/stickers';
import painter from '~/styles/theme/painter';

export const AreaFilter = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`;

export const SweetList = styled.ul`
  margin-top: 30px;
  font-size: 0;
  white-space: nowrap;
`;

export const SweetItem = styled.li`
  display: inline-block;
  vertical-align: top;
  & + & {
    margin-left: 8px;
  }
`;

export const SweetButton = styled.a.attrs({ href: '#', role: 'button' })<{
  sweetPercent: SweetPercent;
}>`
  display: block;
  height: 42px;
  border-radius: 21px;
  border: 1px solid #d0d0d0;
  padding: 12px 16px 12px 20px;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  background-color: ${painter.basic.white};
  color: ${(props) => painter.secondary[props.sweetPercent](props)};
  ${(props) =>
    props['aria-selected'] &&
    `
  border-color: ${painter.secondary[props.sweetPercent](props)};
  background-color: ${painter.secondary[props.sweetPercent](props)};
  color: ${painter.basic.white(props)};
  `}
`;
