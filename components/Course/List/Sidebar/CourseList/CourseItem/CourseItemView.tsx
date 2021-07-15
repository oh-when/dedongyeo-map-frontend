import Image from 'next/image';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const CourseItem = styled.div`
  position: relative;
  padding: 24px 24px 23px;
  border-radius: 16px;
  border: 1px solid ${painter.grayscale[2]};
  box-shadow: 0 0 3px 1px ${painter.grayscale[3]};
  background-color: ${painter.basic.white};
  & + & {
    margin-top: 24px;
  }
`;

export const CourseLink = styled.a.attrs({ href: '#' })`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const AreaInfo = styled.div`
  padding-right: 108px;
`;

export const Stickers = styled.div`
  height: 40px;
`;

export const Title = styled.strong`
  margin-top: 13px;
  font-size: 24px;
  color: ${painter.basic.black};
`;

export const Info = styled.div`
  margin-top: 4px;
  height: 20px;
  font-size: 0;
  line-height: 20px;
  color: ${painter.grayscale[8]};
`;

export const SpotCount = styled.span`
  display: inline-block;
  vertical-align: top;
  font-weight: 700;
  font-size: 14px;
`;

export const Date = styled.span`
  display: inline-block;
  margin-left: 8px;
  vertical-align: top;
  font-size: 14px;
`;

export const AreaLabel = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
  font-size: 14px;
  line-height: 20px;
  color: ${painter.grayscale[6]};
`;

export const AreaButton = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
`;

export const ItemButton = styled.button.attrs({
  type: 'button',
})`
  display: inline-block;
  height: 24px;
  vertical-align: top;
  cursor: pointer;
  & + & {
    margin-left: 8px;
  }
`;

export const ShareIcon = styled(Image).attrs({
  width: '24',
  height: '24',
  src: '/course/list/share_gray.svg',
})`
  display: block;
`;

export const EditIcon = styled(Image).attrs({
  width: '24',
  height: '24',
  src: '/course/list/pen_gray.svg',
})`
  display: block;
`;

export const DeleteIcon = styled(Image).attrs({
  width: '24',
  height: '24',
  src: '/course/list/trashcan_gray.svg',
})`
  display: block;
`;
