import React from 'react';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const SpotGenerator = styled.div<{ zIndex: string }>`
  position: fixed;
  z-index: ${(props) => props.zIndex || '10000'};
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  width: 500px;
  box-shadow: 0 0 14px 1px ${painter.grayscale['6']};
  background-color: ${painter.basic.white};
`;

export const Inner = styled.div`
  padding: 0 32px 63px;
`;

export const AreaText = styled.div``;

export const HelpTitle = styled.strong`
  display: block;
  margin-top: 32px;
  font-size: 20px;
  line-height: 28px;
  color: ${painter.grayscale[9]};
`;

export const HelpText = styled.p`
  margin-top: 4px;
  font-size: 14px;
  line-height: 20px;
  color: ${painter.grayscale[6]};
`;
