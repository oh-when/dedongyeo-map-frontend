import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import painter from '~/styles/theme/painter';
import { MB } from '~/components/_common/MapBox/MapBox.d';

export type Props = MB.MarkerProps<{
  className?: string;
  num: string;
}>;

const Box = styled.div`
  position: relative;
  width: 48px;
  height: 40px;
`;
const Marker = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 48px;
  height: 57px;
  margin-bottom: 4px;
  overflow: hidden;
`;
const MarkerNum = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${painter.basic.white};
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: ${painter.primary.basic};
`;
const Point = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  padding-top: 5px;
  border-radius: 50%;
  border: 1px solid ${painter.grayscale[3]};
  background-color: ${painter.basic.white};
  &::after {
    display: block;
    width: 28px;
    height: 28px;
    margin: 0 auto;
    border-radius: 50%;
    background-color: ${painter.primary.basic};
    content: '';
  }
`;

export default function CourseMarker(props: Props): ReactElement {
  const theme = useContext(ThemeContext);

  return (
    <div id={props.id} className={props.className}>
      <Box>
        <Marker>
          <MarkerNum>{props.num}</MarkerNum>
          <svg
            width="96"
            height="104"
            viewBox="24 20 96 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
              <path
                d="M60.2278 23.2773C52.8071 18.9771 43.5995 18.904 36.1085 23.0858C28.6175 27.2677 23.995 35.0615 24 43.5016C24.2257 49.6998 26.3952 55.6798 30.2137 60.6295C34.7772 66.5592 40.397 71.6339 46.8027 75.6095C47.2092 75.8464 47.6696 75.9807 48.1424 76C48.6336 75.9266 49.1069 75.7658 49.539 75.5258C53.7348 72.8799 57.5996 69.7623 61.0544 66.2365C67.0401 60.1553 71.8287 52.2887 71.9997 43.92C72.0413 35.4961 67.5756 27.6651 60.2278 23.2773Z"
                fill={theme.primary.basic}
              />
            </g>
            <defs>
              <filter
                id="filter0_d"
                x="0"
                y="0"
                width="96"
                height="104"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="12" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </Marker>
        <Point />
      </Box>
    </div>
  );
}
