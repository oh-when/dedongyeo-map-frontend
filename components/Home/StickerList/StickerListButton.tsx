import React, { useState } from 'react';
import * as $ from './StickerListView';
import StickerListModal from './StickerListModal';

const buttons = [
    { id: 'FAB_Spotlist_Unclicked.png'},
    { id: 'FAB_Spotlist_Clicked.png'},
];

const StickerListButton: React.FC = () => {
    
    const [activated, setActivated] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleClickButton = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        if (id === 'FAB_Spotlist_Unclicked.png') {
            setActivated(true);
            // TO-DO
            // also make Sticker List pop up
            setModalVisible(true);
        } else {
            setActivated(false);
            // TO-DO
            // also make Sticker List disappear
            setModalVisible(false);
        }
    };


    return (
        <>
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
        {modalVisible?
            <$.StickerListModalContainer>
                {/*Sticker List Modal Content goes here*/}
                <StickerListModal/>
            </$.StickerListModalContainer>
            :
            <></>
        }
        </>
    );
};

export default StickerListButton;
