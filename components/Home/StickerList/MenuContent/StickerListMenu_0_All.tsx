import React, { useState } from 'react';


const stickerListItem = () => {
    return(
      <div style={{display:'flex', flexDirection:'column', marginTop:10}}>
          <img src={'stickers/sticker_30_1.svg'} style={{width:32, height:32, marginBottom:8,}}/>
          <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>

              <div style={{display:'flex', flexDirection:'row'}}>
                  <span style={{fontSize:15, fontWeight:'bold', color:'black'}}>블루보틀</span>
                  <span style={{fontSize:15, fontWeight:'bold', color:'lightgray', marginLeft:10}}>카페</span>
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
                  당도 0% · 엄마 · 2021.02.11
              </span>
          </div>
          <div style={{width:'100%', height:0.5, backgroundColor:'lightgray', marginTop:10}}/>
      </div>
    );
}


const StickerListMenu_0_All: React.FC = () => {
    return(
        <div>
        <span style={{color:'darkgray', fontSize:15, marginLeft:15}}>전체 </span>
        <span style={{color:'#FD476D', fontWeight:'bold', fontSize:15}}>30</span>
        <div style={{marginLeft:25, marginRight:25}}>
            <br/>
            {/* sticker list content goes here */}
            {stickerListItem()}
            {stickerListItem()}
            {stickerListItem()}
            {stickerListItem()}
            {/* 한 페이지에 네개씩..? */}
        </div>
        </div>
    )
}

export default StickerListMenu_0_All;