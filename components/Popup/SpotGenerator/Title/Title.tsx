import React from 'react';
import * as $ from './TitleView';

type Props = {
  closePopup: () => void;
};

const Title: React.FC<Props> = ({ closePopup }) => {
  return (
    <$.Title>
      <$.Text>스티커 붙이기</$.Text>
      <$.CloseLayerButton onClick={closePopup} />
    </$.Title>
  );
};

export default Title;
