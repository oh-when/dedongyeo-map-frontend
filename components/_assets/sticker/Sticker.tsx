import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { SweetPercent, StickerIndex } from '~/constants/stickers';

type StickerProps = {
  sweetPercent: SweetPercent;
  stickerIndex: StickerIndex;
  className?: string;
  width?: number;
  height?: number;
};

const $Image = styled(Image)`
  display: inline-block;
  width: ${(props) => props.width || 120}px;
  height: ${(props) => props.height || 120}px;
  border-radius: 50%;
  vertical-align: top;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export default function Sticker({
  sweetPercent,
  stickerIndex,
  className,
  width,
  height,
}: StickerProps): JSX.Element {
  const src = getStickerImageUrl(sweetPercent, stickerIndex);

  return (
    <$Image src={src} className={className} width={width} height={height} />
  );
}

export function getStickerImageUrl(
  sweetPercent: SweetPercent,
  stickerIndex: StickerIndex
): string {
  return `/stickers/sticker_${sweetPercent}_${stickerIndex}.svg`;
}
