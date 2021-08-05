import React from 'react';
import * as $ from './SpotInfoModalView';
import {
  ContainerColumn,
  Empty,
  IconContainer,
  SettingIcon,
} from './SpotInfoModalView';

type Props = {
  spot?: GQL.Spot;
  attachStickerHandler: () => void;
};

const SpotInfoModal: React.FC<Props> = ({
  spot,
  attachStickerHandler,
}: Props) => {
  return (
    <$.ModalWrapper>
      <$.ContainerRow justifyContent="space-between">
        <$.LabelTag>NEW</$.LabelTag>
        <$.CloseBtn>
          <$.CloseIcon />
        </$.CloseBtn>
      </$.ContainerRow>
      <$.ContainerRow>
        <h1>{spot.place_name}</h1>
        <h2>나만의 장소</h2>
        <Empty />
        <$.SettingIcon src="/edit_icon.png" />
        <$.SettingIcon src="/delete_icon.png" />
      </$.ContainerRow>
      <$.ContainerRow justifyContent="space-between">
        <h3>{spot.road_address_name}</h3>
        <h4>비공개</h4>
      </$.ContainerRow>
      <$.SweetContainer>
        <$.IconContainer>
          <$.SweetIcon src="/icon_0.png" />
          <span>1</span>
        </$.IconContainer>
        <$.IconContainer>
          <$.SweetIcon src="/icon_30.png" />
          <span>0</span>
        </$.IconContainer>
        <$.IconContainer>
          <$.SweetIcon src="/icon_50.png" />
          <span>1</span>
        </$.IconContainer>
        <$.IconContainer>
          <$.SweetIcon src="/icon_70.png" />
          <span>0</span>
        </$.IconContainer>
        <$.IconContainer>
          <$.SweetIcon src="/icon_100.png" />
          <span>0</span>
        </$.IconContainer>
      </$.SweetContainer>
      <$.SubmitButton onClick={attachStickerHandler}>
        스티커 붙이기
      </$.SubmitButton>
    </$.ModalWrapper>
  );
};

export default SpotInfoModal;
