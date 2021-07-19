import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import painter from '~/styles/theme/painter';

export type Props = {
  className?: string;
  num: number;
  zoom: [number];
};

const $ = {
  CourseMarker: styled.div<{ fontSize: number }>`
    position: relative;
    width: 2.22em;
    height: 2.22em;
    ${(props) => `
  font-size: ${props.fontSize}px;
  `}
  `,
  Point: styled.div`
    height: 100%;
    padding: 0.33em;
    border-radius: 50%;
    background-color: #fff;
    font-size: inherit;
    &::after {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: ${painter.primary.basic};
      content: '';
    }
  `,
  MarkerFigure: styled.div`
    position: absolute;
    bottom: 100%;
    left: -0.22em;
    width: 2.66em;
    height: 3.11em;
    margin-bottom: 0.44em;
    font-size: inherit;
  `,
  MarkerIcon: styled(Image)`
    display: block;
    width: 100%;
    height: 100%;
    color: ${painter.primary.basic};
  `,
  MarkerNum: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: inherit;
    line-height: 2.7;
    text-align: center;
    color: ${painter.primary.basic};
  `,
};

const fontSizeBound = { min: 10, max: 24 };

export default function CourseMarker(props: Props): ReactElement {
  const {
    zoom: [zoom],
  } = props;
  let fontSize = (14 / 18) * zoom;
  fontSize = Math.max(fontSize, fontSizeBound.min);
  fontSize = Math.min(fontSize, fontSizeBound.max);

  return (
    <$.CourseMarker fontSize={fontSize} className={props.className}>
      <$.MarkerFigure>
        <$.MarkerIcon src="/course/map/marker.svg" width={48} height={56} />
        <$.MarkerNum>{props.num}</$.MarkerNum>
      </$.MarkerFigure>
      <$.Point />
    </$.CourseMarker>
  );
}
