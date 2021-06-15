import React from 'react';
import * as $ from './CustomSpotFormView';

type Props = {};

const CustomSpotForm: React.FC<Props> = ({}: Props) => {
  return (
    <$.FormWrapper>
      <$.ContainerRow justifyContent="space-between">
        <h1>스팟 추가하기</h1>
        <$.CloseBtn>
          <$.CloseIcon />
        </$.CloseBtn>
      </$.ContainerRow>
      <$.InputContainer>
        <h2>스팟 이름</h2>
        <$.InputElement
          type="text"
          placeholder="ex) 어니언 옆 골목길, 성수 골목길"
        />
      </$.InputContainer>
      <$.InputContainer>
        <h2>스팟 카테고리</h2>
        <$.InputElement type="text" placeholder="ex) 음식점, 테마파크, 까페" />
      </$.InputContainer>
      <$.ContainerRow>
        <$.CheckBox type="checkbox" />
        <h2>공개 허용</h2>
      </$.ContainerRow>
      <h3>
        다른 사용자가 해당 데이트 코스에 대한 정보를 볼 수 있습니다. 단, 공개
        허용 시 커스텀 스팟 수정이 불가합니다.
      </h3>
      <$.SubmitButton>스팟 추가하기</$.SubmitButton>
    </$.FormWrapper>
  );
};

export default CustomSpotForm;
