import { makeVar, gql, useMutation } from '@apollo/client';
import { SweetPercent, StickerIndex } from '~/constants/stickers';
import createReactiveVarHooks from '~/util/createReactiveVarHooks';
import type { Props as SpotGeneratorProps } from './SpotGenerator';

type FormSweetState = SweetPercent;
type FormStickerState = StickerIndex;
type FormPartnerState = string;
type FormDateState = [number, number, number];
type FormResetter = () => void;

const formSweetState = makeVar<FormSweetState>(SweetPercent.$0);
const formStickerState = makeVar<FormStickerState>(StickerIndex.$0);
const formPartnerState = makeVar<FormPartnerState>(null);
const formDateState = makeVar<FormDateState>(null);

export const [useFormSweet, useFormSweetSetter, useFormSweetState] =
  createReactiveVarHooks(formSweetState);

export const [useFormSticker, useFormStickerSetter, useFormStickerState] =
  createReactiveVarHooks(formStickerState);

export const [useFormPartner, useFormPartnerSetter, useFormPartnerState] =
  createReactiveVarHooks(formPartnerState);

export const [useFormDate, useFormDateSetter, useFormDateState] =
  createReactiveVarHooks(formDateState);

export const useFormResetter = (): FormResetter => {
  const resetForm: FormResetter = () => {
    formSweetState(SweetPercent.$0);
    formStickerState(StickerIndex.$0);
    formPartnerState(null);
    formDateState(null);
  };

  return resetForm;
};

export type CreateSticker = (place: {
  id: string;
  name: string;
  x: number;
  y: number;
}) => void;

export const CREATE_STICKER = gql`
  mutation CreateSticker($createStickerInput: CreateStickerInput!) {
    createSticker(createStickerInput: $createStickerInput) {
      _id
      sticker_index
      sweet_percent
      is_used
      spot(populate: true) {
        place_name
      }
    }
  }
`;

export const useCreateSticker = (): CreateSticker => {
  const [request] = useMutation<
    GQL.Mutation.CreateSticker.Data,
    GQL.Mutation.CreateSticker.Variables
  >(CREATE_STICKER);

  const createSticker: CreateSticker = (place: SpotGeneratorProps['place']) => {
    const sweetPercent = formSweetState();
    const stickerIndex = formStickerState();
    const partners = formPartnerState() ? [formPartnerState()] : [];
    const inputDate = formDateState();
    const date = inputDate
      ? new Date(`${inputDate[0]}-${inputDate[1]}-${inputDate[2]}`)
      : new Date();
    const startAt = date.getTime();

    request({
      variables: {
        createStickerInput: {
          place_id: place.id,
          place_name: place.name,
          x: place.x,
          y: place.y,
          sticker_index: stickerIndex,
          sweet_percent: sweetPercent,
          partners,
          startAt,
          endAt: startAt,
        },
      },
    });
  };

  return createSticker;
};
