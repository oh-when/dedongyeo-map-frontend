import React, { useState } from 'react';
import * as $ from './CustomSpotFormView';
import * as GeoJSON from 'geojson';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { usePopupOpener } from '~/lib/apollo/hooks/usePopup';
// @ts-ignore
import { PopupType } from '~/@types/popup.d.ts';

type Props = {
  closeHandler: () => void;
  coordinates: GeoJSON.Position;
};

const CREATE_CUSTOM_SPOT = gql`
  mutation CreateCustomSpot($createCustomSpotInput: CreateCustomSpotInput!) {
    createCustomSpot(createCustomSpotInput: $createCustomSpotInput) {
      category_group_name
      is_custom
      is_custom_share
      place_name
      x
      y
    }
  }
`;

const CustomSpotForm: React.FC<Props> = ({
  closeHandler,
  coordinates,
}: Props) => {
  const client = useApolloClient();
  const [createCustomSpot] = useMutation<
    GQL.Mutation.CreateCustomSpot.Data,
    GQL.Mutation.CreateCustomSpot.Variables
  >(CREATE_CUSTOM_SPOT);
  const [customSpot, setCustomSpot] = useState({
    name: '',
    category: '',
    isPublic: false,
  });
  const openPopup = usePopupOpener();

  const submitForm = () => {
    openPopup({
      popupType: PopupType.SPOT_GENERATOR,
      popupProps: {
        place: {
          id: 1223,
          name: '테스트',
          x: coordinates[0],
          y: coordinates[1],
        },
      },
    });
    // createCustomSpot({
    //   variables: {
    //     createCustomSpotInput: {
    //       category_group_name: 'FD6',
    //       is_custom: true,
    //       is_custom_share: customSpot.isPublic,
    //       place_name: customSpot.name,
    //       x: coordinates[0],
    //       y: coordinates[1],
    //     },
    //   },
    // });
    closeHandler();
  };

  return (
    <$.FormWrapper>
      <$.ContainerRow justifyContent="space-between">
        <h1>스팟 추가하기</h1>
        <$.CloseBtn onClick={closeHandler}>
          <$.CloseIcon />
        </$.CloseBtn>
      </$.ContainerRow>
      <$.InputContainer>
        <h2>스팟 이름</h2>
        <$.InputElement
          type="text"
          placeholder="ex) 어니언 옆 골목길, 성수 골목길"
          onChange={(e) =>
            setCustomSpot({
              ...customSpot,
              name: e.target.value,
            })
          }
        />
      </$.InputContainer>
      <$.InputContainer>
        <h2>스팟 카테고리</h2>
        <$.InputElement
          type="text"
          placeholder="ex) 음식점, 테마파크, 까페"
          onChange={(e) =>
            setCustomSpot({
              ...customSpot,
              category: e.target.value,
            })
          }
        />
      </$.InputContainer>
      <$.ContainerRow>
        <$.CheckBox
          type="checkbox"
          onClick={(e: any) => {
            setCustomSpot({
              ...customSpot,
              isPublic: e.target.checked,
            });
          }}
        />
        <h2>공개 허용</h2>
      </$.ContainerRow>
      <h3>
        다른 사용자가 해당 데이트 코스에 대한 정보를 볼 수 있습니다. 단, 공개
        허용 시 커스텀 스팟 수정이 불가합니다.
      </h3>
      <$.SubmitButton onClick={submitForm}>스팟 추가하기</$.SubmitButton>
    </$.FormWrapper>
  );
};

export default CustomSpotForm;
