import React from 'react';
import * as $ from './SpotInfoModalView';
import {
  ContainerColumn,
  Empty,
  IconContainer,
  SettingIcon,
} from './SpotInfoModalView';

type Props = {};

const SpotInfoModal: React.FC<Props> = ({}: Props) => {
  return (
    <$.ModalWrapper>
      <$.ContainerRow justifyContent="space-between">
        <$.LabelTag>NEW</$.LabelTag>
        <$.CloseBtn>
          <$.CloseIcon />
        </$.CloseBtn>
      </$.ContainerRow>
      <$.ContainerRow>
        <h1>비밀 휴식터</h1>
        <h2>나만의 장소</h2>
        <Empty />
        <$.SettingIcon src="/edit_icon.png" />
        <$.SettingIcon src="/delete_icon.png" />
      </$.ContainerRow>
      <$.ContainerRow justifyContent="space-between">
        <h3>서울 성동구 아차산로9길 8</h3>
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
      <$.SubmitButton>스티커 붙이기</$.SubmitButton>
    </$.ModalWrapper>
  );
};

export default SpotInfoModal;
