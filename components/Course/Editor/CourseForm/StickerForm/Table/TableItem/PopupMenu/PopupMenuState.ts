import { makeVar, useReactiveVar } from "@apollo/client";
import type { StickerCardDTO } from "~/components/Course/Editor/Editor.d";

export const popupStickerVar = makeVar<StickerCardDTO>(null);

export function usePopupSticker() {
  return useReactiveVar(popupStickerVar);
}

export function setPopupSticker(sticker: StickerCardDTO) {
  popupStickerVar(sticker);
}