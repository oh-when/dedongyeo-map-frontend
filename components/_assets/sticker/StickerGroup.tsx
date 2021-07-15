import Sticker from "./Sticker";
import styled from "styled-components";
import React from "react";

type StickerGroupProps = {
  keygen: string;
  stickers: GQL.Sticker[];
  unitWidth: number;
  unitHeight: number;
}

const StickerUnit = styled.div<{ idx: number; width: number; height: number; }>`
  display: inline-block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
  ${props => props.idx > 0 ? `
  left: -${(props.idx - 1) * props.width * 0.5 + props.width * 0.3}px;
  ` : ''}
`;

export default function StickerGroup(props: StickerGroupProps) {
  return (
  <React.Fragment>
    {props.stickers.map((sticker, i) => (
      <StickerUnit
        key={props.keygen + i}
        idx={i}
        width={props.unitWidth}
        height={props.unitHeight}
      >
        <Sticker
        sweetPercent={sticker.sweet_percent}
        stickerIndex={sticker.sticker_index}
        width={props.unitWidth}
        height={props.unitHeight}
        />
      </StickerUnit>
    ))}
  </React.Fragment>
  )
}