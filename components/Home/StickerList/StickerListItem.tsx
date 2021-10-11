import React, { useState } from 'react';


interface StickerListItemProps {
    stickerImgSrc: string;
    placeName: string;
    placeCategory: string;
    sweetnessRate: number;
    visitWith: string;
    visitDate: string;
}

const StickerListItem: React.FC<StickerListItemProps> = (props) => {
    return(
        <div style={{display:'flex', flexDirection:'column', marginTop:12}}>
            <img src={props.stickerImgSrc} style={{width:32, height:32, marginBottom:8,}}/>
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>

                <div style={{display:'flex', flexDirection:'row'}}>
                    <span style={{fontSize:15, fontWeight:'bold', color:'black'}}>{props.placeName}</span>
                    <span style={{fontSize:15, fontWeight:'bold', color:'lightgray', marginLeft:10}}>{props.placeCategory}</span>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                    <button onClick={()=>{}} style={{cursor:'pointer', marginRight:10}}>
                        {/* 수정버튼 */}
                        <img src={'edit_icon.png'} style={{width:22, height:22}}/>
                    </button>
                    <button onClick={()=>{}} style={{cursor:'pointer'}}>
                        {/* 삭제버튼 */}
                        <img src={'delete_icon.png'} style={{width:22, height:22}}/>
                    </button>
                </div>

            </div>
            <div style={{marginTop:5, marginBottom:5}}>
              <span style={{fontSize:13.5, color:'black'}}>
                  당도 {props.sweetnessRate}% · {props.visitWith} · {props.visitDate}
              </span>
            </div>
            <div style={{width:'100%', height:0.5, backgroundColor:'lightgray', marginTop:10}}/>
        </div>
    )
}

export default StickerListItem;