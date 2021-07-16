import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const Candidate = styled.div`
  width: 452px;
  height: 100%;
  padding-top: 48px;
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
  padding: 0 40px;
  font-size: 28px;
  line-height: 40px;
  color: ${painter.grayscale[9]};
`;

export const AreaList = styled.div`
  margin-top: 24px;
  padding: 0 24px;
`;

export const List = styled.ul``;

export const Item = styled.li`
  display: inline-block;
  width: 168px;
  height: 168px;
  margin: 16px;
  vertical-align: top;
`;
