import { makeVar, useReactiveVar } from '@apollo/client';

const currentStickersState = makeVar<GQL.Sticker[]>([]);

export function useCurrentStickers(): GQL.Sticker[] {
  return useReactiveVar(currentStickersState);
}

export function updateCurrentStickrs(stickers: GQL.Sticker[]): void {
  currentStickersState(stickers);
}
