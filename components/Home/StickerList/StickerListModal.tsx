import React, { useState } from 'react';
import * as $ from './StickerListView';
import StickerListMenu_0_All from "~/components/Home/StickerList/MenuContent/StickerListMenu_0_All";
import StickerListMenu_1_Official from "~/components/Home/StickerList/MenuContent/StickerListMenu_1_Official";
import StickerListMenu_2_Custom from "~/components/Home/StickerList/MenuContent/StickerListMenu_2_Custom";
import StickerListMenu_3_MyCustom from "~/components/Home/StickerList/MenuContent/StickerListMenu_3_MyCustom";




const content = [
    {
        tab: "All",
        content:
        <StickerListMenu_0_All/>
    },
    {
        tab: "공식",
        content:
        <StickerListMenu_1_Official/>
    },
    {
        tab: "커스텀",
        content:
        <StickerListMenu_2_Custom/>
    },
    {
        tab: "마이 커스텀",
        content:
        <StickerListMenu_3_MyCustom/>
    },
];

const useTabs = (initialTabs, allTabs) => {
    const [contentIndex, setContentIndex] = useState(initialTabs);
    return {
        contentItem: allTabs[contentIndex],
        contentIndex: contentIndex,
        contentChange: setContentIndex
    };
};


const StickerListModal: React.FC = () => {

    const [menuChoice, setMenuChoice] = useState(0); // 1,2,3,4
    const { contentItem, contentIndex, contentChange } = useTabs(0, content);

    return(
        <div style={{width:400, height:800}}>
            <br/>
            <$.StickerListTitleText>스티커 리스트</$.StickerListTitleText>
            <$.StickerListBtnsContainer>
                {/* 네개의 메뉴 버튼모음집 */}
                {content.map((section, index) => (
                    contentIndex===index?
                    <button
                        style={{
                            backgroundColor: '#FD476D',
                            padding: '10px 20px',
                            color: 'white',
                            borderRadius: '20px',
                            cursor: 'pointer',
                        }}
                        onClick={() => contentChange(index)}>
                        {section.tab}
                    </button>
                    :
                    <button
                        style={{
                            backgroundColor: 'white',
                            border:'1px solid',
                            borderColor:'lightgray',
                            padding: '10px 20px',
                            color: 'black',
                            borderRadius: '20px',
                            cursor: 'pointer',
                        }}
                        onClick={() => contentChange(index)}>
                        {section.tab}
                    </button>
                ))}
            </$.StickerListBtnsContainer>
            {/* 각 메뉴 선택에 따른 서로다른 modal content display */}
            {contentItem.content}
        </div>
    );
}

export default StickerListModal;

