import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const SideBar = styled.div`
  height: 100%;
  padding-top: 48px;
  overflow-y: auto;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const AreaTitle = styled.h3`
  padding: 0 40px;
  font-size: 28px;
  line-height: 40px;
  color: ${painter.grayscale[9]};
`;

export const AreaCalendar = styled.div`
  margin-top: 24px;
`;
