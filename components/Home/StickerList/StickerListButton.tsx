import React, { useState } from 'react';
import * as $ from './StickerListView';

const buttons = [
    { id: 'FAB_Spotlist_Unclicked.png'},
    { id: 'FAB_Spotlist_Clicked.png'},
];

const StickerListButton: React.FC = () => {
    
    const [activated, setActivated] = useState(false);
    
    const handleClickButton = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        if (id === 'FAB_Spotlist_Unclicked.png') {
            setActivated(true);
            // TO-DO
            // also make Sticker List pop up
        } else {
            setActivated(false);
            // TO-DO
            // also make Sticker List disappear
        }
    };


    return (
        <$.MainStickerList>
      {activated ?
                <$.StickerListBtn
                    src={buttons[1].id}
                    onClick={(e) => handleClickButton(e, buttons[1].id)}
                ></$.StickerListBtn>
          :
                <$.StickerListBtn
                    src={buttons[0].id}
                    onClick={(e) => handleClickButton(e, buttons[0].id)}
                ></$.StickerListBtn>
      }
        </$.MainStickerList>
    );
};

export default StickerListButton;
