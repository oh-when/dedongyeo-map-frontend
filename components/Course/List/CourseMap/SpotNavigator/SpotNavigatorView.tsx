import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const SpotNavigator = styled.div`
  position: absolute;
  left: 0;
  bottom: 28px;
  width: 100%;
  height: 120px;
  padding: 8px;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const List = styled.ul`
  white-space: nowrap;
  font-size: 0;
`;

export const Item = styled.li`
  display: inline-block;
  margin: 0 12px;
  vertical-align: top;
  &:first-child {
    margin-left: 16px;
  }
  &:last-child {
    margin-right: 16px;
  }
`;

export const Navigator = styled.button.attrs({ type: 'button' })`
  display: block;
  width: 344px;
  height: 104px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid ${painter.grayscale[4]};
  box-shadow: 0 0 8px 1px ${painter.grayscale[4]};
  background-color: #fff;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

export const AreaSticker = styled.div`
  float: left;
  padding-right: 12px;
`;

export const AreaInfo = styled.div`
  overflow: hidden;
  text-align: left;
`;

export const Meta = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${painter.grayscale[8]};
`;

export const Name = styled.strong`
  display: block;
  font-size: 24px;
  line-height: 32px;
`;
