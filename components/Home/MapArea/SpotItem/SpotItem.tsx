import React from 'react';
import styled from 'styled-components';
import Sticker from '~/components/_assets/sticker/Sticker';
import theme from '~/styles/theme';

// 하나의 스팟 데이터를 받아서 해당 스티커 목록을 지도에서 보여준다.
type Props = {
  spot?: GQL.Spot;
};

// Dummy Data
export const DUMMY_SPOT: GQL.Spot = {
  _id: '609cfa7805214bea49705b8e',
  place_id: '1065693087',
  stickers: [
    {
      _id: '609cfa7705214bea49705b7f',
      is_used: false,
      sticker_index: 0,
      sweet_percent: 50,
    },
    {
      _id: '609cfa7705214bea49705b7g',
      is_used: false,
      sticker_index: 2,
      sweet_percent: 30,
    },
    {
      _id: '609cfa7705214bea49705b7h',
      is_used: false,
      sticker_index: 1,
      sweet_percent: 0,
    },
  ],
  place_name: '금돼지식당',
  category_name: '음식점 > 한식 > 육류,고기',
  category_group_code: 'FD6',
  category_group_name: '음식점',
  phone: '0507-1307-8750',
  address_name: '서울 중구 신당동 370-69',
  road_address_name: '서울 중구 다산로 149',
  place_url: 'http://place.map.kakao.com/1065693087',
  distance: '0',
  x: 127.01168879703,
  y: 37.5570641564289,
};

const SpotItem: React.FC<Props> = ({ spot = DUMMY_SPOT }) => {
  return (
    <SpotContainer className="spot-item">
      <SpotNameBalloon nameLen={spot.place_name.length}>
        {spot.place_name}
      </SpotNameBalloon>
      {spot.stickers.slice(0, 4).map((sticker, idx) => {
        return (
          <StickerContainer
            // src={`./stickers/sticker_${sticker.sweet_percent}_${sticker.sticker_index}.png`}
            sweetPercent={sticker.sweet_percent}
            stickerIndex={sticker.sticker_index}
            width={72}
            height={72}
            className="test"
            key={idx}
            order={idx}
          />
        );
      })}
      <StickerNumberContainer stickerNum={spot.stickers.slice(0, 4).length}>
        {spot.stickers.length}
      </StickerNumberContainer>
    </SpotContainer>
  );
};

export default SpotItem;

const SpotContainer = styled.div`
  width: fit-content;
`;

const StickerContainer = styled(Sticker)<{ order: number }>`
  position: relative;
  top: 20px;
  left: ${(props) => 40 + props.order * -40}px;
  z-index: ${(props) => 10 - props.order};
`;

const StickerNumberContainer = styled.div<{ stickerNum: number }>`
  border: 2px solid ${theme.primary.basic};
  color: ${theme.primary.basic};
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  width: fit-content;
  padding: 5px 8px;
  position: relative;
  bottom: 60px;
  left: ${(props) => 40 + props.stickerNum * 20}px;
  z-index: 11;
`;

const SpotNameBalloon = styled.div<{ nameLen: number }>`
  position: relative;
  width: fit-content;
  background-color: #ffffff;
  color: #fd476d;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  padding: 12px 16px;
  text-align: center;
  margin: 0 auto;

  filter: drop-shadow(0px 2px 20px rgba(73, 80, 87, 0.2));

  :after {
    border-top: 10px solid #ffffff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    content: '';
    top: 44px;
    left: ${(props) => 12 + props.nameLen * 8}px;
    filter: drop-shadow(0px 2px 20px rgba(73, 80, 87, 0.2));
  }
`;
