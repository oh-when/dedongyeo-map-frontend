import React from 'react';
import { useFormSweetState } from '~/components/Popup/SpotGenerator/SpotGeneratorState';
import { SweetPercent, sweetPercents } from '~/constants/stickers';
import * as $ from './AreaFilterView';

const AreaFilter: React.FC = () => {
  const [sweet, setSweet] = useFormSweetState();

  const handleClickSugar = (e: React.MouseEvent, sweetInput: SweetPercent) => {
    e.preventDefault();
    if (sweetInput !== sweet) {
      setSweet(sweetInput);
    }
  };

  return (
    <$.AreaFilter>
      <$.SweetList>
        {sweetPercents.map((sweetPercent) => (
          <$.SweetItem key={`sugar-filter-${sweetPercent}`}>
            <$.SweetButton
              sweetPercent={sweetPercent}
              aria-selected={sweet === sweetPercent}
              onClick={(e) => handleClickSugar(e, sweetPercent)}
            >
              {`${sweetPercent}%`}
            </$.SweetButton>
          </$.SweetItem>
        ))}
      </$.SweetList>
    </$.AreaFilter>
  );
};

export default AreaFilter;
