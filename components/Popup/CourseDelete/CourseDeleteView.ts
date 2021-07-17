import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const CourseDelete = styled.div<{ zIndex: string }>`
  position: fixed;
  z-index: ${(props) => props.zIndex || '10000'};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(34, 34, 34, 0.6);
`;

export const Layer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 192px;
  margin: -96px 0 0 -200px;
  padding: 24px 24px 0;
  border-radius: 8px;
  background-color: ${painter.basic.white};
`;

export const CloseButton = styled.button.attrs({ type: 'button' })`
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  cursor: pointer;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    height: 21px;
    border-radius: 1px;
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

export const Title = styled.strong`
  display: block;
  font-size: 18px;
  line-height: 24px;
  color: ${painter.grayscale[9]};
`;

export const Description = styled.p`
  margin-top: 16px;
  font-size: 14px;
  line-height: 20px;
  color: ${painter.grayscale[8]};
`;

export const ButtonArea = styled.div`
  margin-top: 24px;
  text-align: center;
`;

export const Button = styled.button.attrs({ type: 'button' })`
  height: 40px;
  border-radius: 8px;
  padding: 0 24px;
  background-color: ${painter.grayscale[2]};
  font-size: 14px;
  line-height: 40px;
  color: ${painter.grayscale[7]};
  cursor: pointer;
  & + & {
    margin-left: 16px;
  }
  &:last-child {
    background-color: ${painter.grayscale[9]};
    color: ${painter.basic.white};
  }
`;

