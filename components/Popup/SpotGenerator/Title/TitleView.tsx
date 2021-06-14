import React from 'react';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const Title = styled.div`
  position: relative;
  padding-top: 77px;
`;

export const Text = styled.h2`
  height: 44px;
  padding: 0 32px;
  font-size: 32px;
  line-height: 44px;
  color: ${painter.grayscale[9]};
`;

export const CloseLayerButton = styled.a.attrs({ href: '#', role: 'button' })`
  position: absolute;
  top: 33px;
  right: 32px;
  width: 36px;
  height: 36px;
  outline: none;
  cursor: pointer;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 27px;
    height: 3px;
    margin: auto;
    background-color: ${painter.grayscale[6]};
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
