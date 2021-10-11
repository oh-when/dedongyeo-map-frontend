import React, { useState } from 'react';
import * as $ from './StickerListView';
import {StickerListBtnsContainer, StickerListMenuButtonFocused, StickerListTitleText} from "./StickerListView";


const content = [
    {
        tab: "All",
        icon_src: "",
        content:
            "컴퓨팅에서 리액트는 자바스크립트 라이브러리의 하나로서 사용자 인터페이스를 만들기 위해 사용된다. 페이스북과 개별 개발자 및 기업들 공동체에 의해 유지보수된다. 리액트는 싱글 페이지나 모바일 애플리케이션의 개발 시 토대로 사용될 수 있다."
    },
    {
        tab: "공식",
        icon_src: "",
        content:
            "Node.js는 확장성 있는 네트워크 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다. 작성 언어로 자바스크립트를 활용하며 Non-blocking I/O와 단일 스레드 이벤트 루프를 통한 높은 처리 성능을 가지고 있다"
    },
    {
        tab: "커스텀",
        icon_src: "",
        content:
            "자바스크립트는 객체 기반의 스크립트 프로그래밍 언어이다. 이 언어는 웹 브라우저 내에서 주로 사용하며, 다른 응용 프로그램의 내장 객체에도 접근할 수 있는 기능을 가지고 있다. 또한 Node.js와 같은 런타임 환경과 같이 서버 사이드 네트워크 프로그래밍에도 사용되고 있다."
    },
    {
        tab: "마이 커스텀",
        icon_src: "",
        content:
            "Node.js는 확장성 있는 네트워크 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다. 작성 언어로 자바스크립트를 활용하며 Non-blocking I/O와 단일 스레드 이벤트 루프를 통한 높은 처리 성능을 가지고 있다"
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
        <div style={{width:400, height:700}}>
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
            <br />
            <br />
            {/* 각 메뉴 선택에 따른 서로다른 modal content display */}
            {contentItem.content}
        </div>
    );
}

export default StickerListModal;

