import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const SideBar = styled.div`
  height: 100%;
  background-color: ${painter.grayscale[1]};
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
