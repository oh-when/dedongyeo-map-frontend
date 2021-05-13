import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const TableItem = styled.div<{
  flexable?: boolean;
}>`
  position: relative;
  ${(props) =>
    props.flexable
      ? `
  z-index: 0;
  flex-grow: 1;
  flex-shrink: 1;
  `
      : `
  z-index: 1;
  flex-grow: 0;
  flex-shrink: 0;
  `}
  height: 208px;
`;

export const Order = styled.em`
  display: block;
  width: 24px;
  height: 24px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background-color: ${painter.grayscale[5]};
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  color: ${painter.basic.white};
`;

export const Card = styled.div<{
  isLayout?: boolean;
}>`
  width: 168px;
  height: 168px;
  ${(props) =>
    !props.isLayout &&
    `
  border-radius: 16px;
  box-shadow: 0 0 8px 1px ${painter.grayscale[3](props)};
  vertical-align: top;
  `}
`;

export const LineColumn = styled.div<{
  isLayout?: boolean;
}>`
  width: 100%;
  height: 100%;
  ${(props) =>
    !props.isLayout &&
    `
  &::after {
    content: '';
    position: absolute;
    top: 114px;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed ${painter.grayscale[6](props)};
  }
  `}
`;

export const DummyItem: React.FC = () => {
  return (
    <>
      <TableItem flexable={true}>
        <LineColumn isLayout={true} />
      </TableItem>
      <TableItem flexable={false}>
        <Card isLayout={true} />
      </TableItem>
    </>
  );
};
