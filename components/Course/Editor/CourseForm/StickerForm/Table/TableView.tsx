import React from 'react';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

// 47 - line - 47
const LineRowWrap = styled.div`
  position: relative;
  height: 95px;
  margin: 0 84px -10px;
`;

const LineSide = styled.div`
  position: absolute;
  overflow: hidden;
  width: 47px;
  height: 47px;
  &::before {
    content: '';
    position: absolute;
    width: 94px;
    height: 94px;
    border-radius: 50%;
    border: dashed ${painter.grayscale[6]};
  }
`;

const LineRowLeft = styled(LineSide)`
  top: 48px;
  left: 0;
  &::before {
    top: 0;
    left: 0;
    border-width: 1px 0 0 1px;
  }
`;

const LineRowRight = styled(LineSide)`
  top: 2px;
  right: 0;
  &::before {
    bottom: 0;
    right: 0;
    border-width: 0 1px 1px 0;
  }
`;

const LineRowMiddle = styled.div`
  position: absolute;
  top: 48px;
  left: 48px;
  right: 47px;
  height: 1px;
  border-bottom: 1px dashed ${painter.grayscale[6]};
`;

export const LineRow: React.FC = () => {
  return (
    <LineRowWrap>
      <LineRowLeft />
      <LineRowMiddle />
      <LineRowRight />
    </LineRowWrap>
  );
};
