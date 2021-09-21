import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const SideBar = styled.div<{ isOpened: boolean }>`
  ${props => props.isOpened ? '' : 'display: none;'}
  position: relative;
  height: 100%;
  width: 452px;
  box-shadow: 0 0 24px 2px ${painter.grayscale[4]};
  background-color: ${painter.basic.white};
  border: 1px solid ${painter.grayscale[1]};
  overflow-y: auto;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const AreaTitle = styled.h3`
  padding: 48px 40px 24px;
  font-size: 28px;
  line-height: 40px;
  background-color: #fff;
  color: ${painter.grayscale[9]};
`;

export const AreaCalendar = styled.div`
  background-color: #fff;
`;

export const AreaCourseList = styled.div``;

export const ToggleButton = styled.button.attrs({ type: 'button' })<{ isOpened: boolean }>`
  position: absolute;
  top: 50%;
  right: -32px;
  width: 32px;
  height: 88px;
  margin-top: -44px;
  border-radius: 0 4px 4px 0;
  border: 1px solid ${painter.grayscale[1]};
  box-shadow: 16px 0 24px 2px ${painter.grayscale[4]};
  background-color: ${painter.basic.white};
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;
    width: 14px;
    height: 14px;
    border: solid ${painter.primary.basic};
    border-width: 2px 2px 0 0;
    ${props => props.isOpened ? `
    margin: -9px -12px 0 0;
    transform: rotate(-135deg);
    ` : `
    margin: -8px -6px 0 0;
    transform: rotate(45deg);
    `}
  }
`;
