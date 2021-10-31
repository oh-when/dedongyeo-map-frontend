import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  StickerIndex,
  SweetPercent,
  stickerIndexes,
} from '~/constants/stickers';
import {
  useFormStickerState,
  useFormSweet,
} from '~/components/Popup/SpotGenerator/SpotGeneratorState';
import * as $ from './AreaStickerView';
import { useEffect } from 'react';

const AreaSticker: React.FC = () => {
  const [swiper, setSwiper] = useState(null);
  const [page, setPage] = useState(0);
  const sweet: SweetPercent = useFormSweet();
  const [sticker, setSticker] = useFormStickerState();
  const firstStickers = stickerIndexes.slice(0, 6);
  const secondStickers = stickerIndexes.slice(6);
  const handleClickSticker = (
    e: React.MouseEvent,
    stickerInput: StickerIndex
  ) => {
    e.preventDefault();
    if (stickerInput !== sticker) {
      setSticker(stickerInput);
    }
  };

  useEffect(() => {
    swiper?.destroy(false, true);
    swiper?.init();
  }, [swiper]);

  useEffect(() => {
    page > 0 && setPage(0);
  }, [sweet]);

  useEffect(() => {
    if (!swiper || swiper.activeIndex === page) return;
    swiper.slideTo(page, 0);
  }, [page]);

  return (
    <$.AreaSticker>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(e) => setPage(e.activeIndex)}
        onSwiper={setSwiper}
      >
        <SwiperSlide>
          <$.StickerPanel>
            {firstStickers.map((stickerIndex) => (
              <$.StickerItem key={`sf-${sweet}-${stickerIndex}`}>
                <$.StickerButton
                  onClick={(e) => handleClickSticker(e, stickerIndex)}
                  aria-selected={sticker === stickerIndex}
                >
                  <$.Sticker
                    sweetPercent={sweet}
                    stickerIndex={stickerIndex}
                    width={112}
                    height={112}
                  />
                </$.StickerButton>
              </$.StickerItem>
            ))}
          </$.StickerPanel>
        </SwiperSlide>
        <SwiperSlide>
          <$.StickerPanel>
            {secondStickers.map((stickerIndex) => (
              <$.StickerItem key={`sf-${sweet}-${stickerIndex}`}>
                <$.StickerButton
                  onClick={(e) => handleClickSticker(e, stickerIndex)}
                  aria-selected={sticker === stickerIndex}
                >
                  <$.Sticker
                    sweetPercent={sweet}
                    stickerIndex={stickerIndex}
                    width={112}
                    height={112}
                  />
                </$.StickerButton>
              </$.StickerItem>
            ))}
          </$.StickerPanel>
        </SwiperSlide>
      </Swiper>
      <$.Pagination>
        <$.Page selected={page === 0} />
        <$.Page selected={page === 1} />
      </$.Pagination>
    </$.AreaSticker>
  );
};

export default AreaSticker;
