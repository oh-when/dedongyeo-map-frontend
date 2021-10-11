import React, { useState } from 'react';
import StickerListItem from "~/components/Home/StickerList/StickerListItem";
import Pagination from './Pagination';

const example_data = [
    {
        stickerImgSrc:'stickers/sticker_30_1.svg',
        placeName:'블루보틀',
        placeCategory:'카페',
        sweetnessRate:30,
        visitWith:'엄마',
        visitDate:'2021.02.11'
    },
    {
        stickerImgSrc:'stickers/sticker_50_0.svg',
        placeName:'성수 인생샷',
        placeCategory:'나만의 장소',
        sweetnessRate:50,
        visitWith:'남자친구',
        visitDate:'2021.06.12'
    },
    {
        stickerImgSrc:'stickers/sticker_100_3.svg',
        placeName:'인생샷 골목길',
        placeCategory:'나만의 장소',
        sweetnessRate:100,
        visitWith:'남자친구',
        visitDate:'2020.04.01'
    },
    {
        stickerImgSrc:'stickers/sticker_70_1.svg',
        placeName:'비밀 휴식터',
        placeCategory:'나만의 장소',
        sweetnessRate:70,
        visitWith:'동생',
        visitDate:'2021.02.19'
    },
    {
        stickerImgSrc:'stickers/sticker_0_1.svg',
        placeName:'어니언',
        placeCategory:'카페',
        sweetnessRate:0,
        visitWith:'엄마',
        visitDate:'2021.02.11'
    },
]


const StickerListMenu_0_All: React.FC = () => {

    const [currentPage, setCurrentPage] = useState(1);

    return(
        <div style={{marginTop:15}}>
            <span style={{color:'darkgray', fontSize:15, marginLeft:15}}>전체 </span>
            <span style={{color:'#FD476D', fontWeight:'bold', fontSize:15}}>30</span>
            {/* List Items*/}
            <div style={{marginLeft:25, marginRight:25, marginTop:25}}>
                {/* sticker list content goes here */}
                {example_data.map(({stickerImgSrc, placeName, placeCategory, sweetnessRate, visitWith, visitDate})=>
                    (
                        <StickerListItem
                            stickerImgSrc={stickerImgSrc}
                            placeName={placeName}
                            placeCategory={placeCategory}
                            sweetnessRate={sweetnessRate}
                            visitWith={visitWith}
                            visitDate={visitDate}
                        />
                    )
                )}
                {/* 한 페이지에 네개씩..? */}
            </div>
            {/* TO DO : implement pagination */}
            <Pagination postsPerPage={5} totalPosts={25} paginate={setCurrentPage} currentPage={currentPage}/>
        </div>
    )
}

export default StickerListMenu_0_All;