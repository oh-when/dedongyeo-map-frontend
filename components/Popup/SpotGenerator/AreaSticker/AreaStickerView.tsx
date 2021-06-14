import React from 'react';
import styled from 'styled-components';
import StickerIcon from '~/components/_assets/sticker';

export const AreaSticker = styled.div`
  overflow: hidden;
  height: 312px;
  margin-top: 24px;
`;

export const StickerPanel = styled.ul`
  height: 280px;
`;

export const StickerItem = styled.li`
  display: inline-block;
  width: 128px;
  height: 128px;
  &:nth-child(3n + 2),
  &:nth-child(3n + 3) {
    margin-left: 20px;
  }
  &:nth-child(n + 4) {
    margin-top: 24px;
  }
`;

export const StickerButton = styled.button.attrs({ type: 'button' })`
  display: block;
  position: relative;
  width: 128px;
  height: 128px;
  ${(props) =>
    props['aria-selected'] &&
    `
  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border: 2px solid ${props.theme.primary.basic};
    border-radius: 50%;
  }
  `}
`;

export const Sticker = styled(StickerIcon)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 112px;
  height: 112px;
  margin: auto;
`;

export const Pagination = styled.div`
  margin-top: 22px;
  text-align: center;
  font-size: 0;
`;

export const Page = styled.div<{ selected: boolean }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.selected ? props.theme.grayscale[8] : props.theme.grayscale[4]};
  vertical-align: top;
`;
