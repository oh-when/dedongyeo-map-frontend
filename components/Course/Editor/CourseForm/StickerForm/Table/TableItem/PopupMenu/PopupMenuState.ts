import { makeVar, useReactiveVar } from "@apollo/client";
import type { StickerCardDTO } from "~/components/Course/Editor/Editor.d";

export const popupStickerVar = makeVar<StickerCardDTO>(null);
export const popupPositionVar = makeVar<{ top: number; left: number; }>({ top: 0, left: 0 });

export function usePopupSticker() {
  return useReactiveVar(popupStickerVar);
}

export function setPopupSticker(sticker: StickerCardDTO) {
  popupStickerVar(sticker);
}

export function usePopupPosition() {
  return useReactiveVar(popupPositionVar);
}

export function setPopupPosition(position: { top: number; left: number }) {
  popupPositionVar(position);
}