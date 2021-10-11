import React from 'react';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const MainStickerList = styled.div`
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 15px;
  z-index: 5;
`;

export const StickerListModalContainer = styled.div`
  position: absolute;
  top: 90px;
  right: 30px;
  z-index: 4;
  width: 400px,
  height: 700px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  border-radius: 20px;
  padding: 0 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

export const StickerListTitleText = styled.span`
  font-size:25px;
  font-weight:bold;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 15px;
`;

export const StickerListBtnsContainer = styled.div`
  display:flex;
  flex-direction:row; 
  justify-content: space-around; 
  margin-top:20px; 
  margin-bottom:10px;
  padding:5px;
`;

export const StickerListMenuButtonFocused = styled.button`
  background-color: pink;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  &:hover {
    color: blue;
  }
`;

export const StickerListMenuButtonUnFocused = styled.button`
  background-color: white;
  padding: 10px 20px;
  color: black;
  border-radius: 20px;
  border-width:1;
  border-color:gray;
  &:hover {
    color: blue;
  }
`;


export const StickerListDropDownBtn = styled.img.attrs({
  src: '/FAB.png',
})`
  cursor: pointer;
`;






export const StickerListBtn = styled.img.attrs((props) => ({
  src: props.src,
}))`
  cursor: pointer;
  ${(props) =>
    props['mood-selected'] &&
    `
    border: 2px solid ${painter.grayscale['8']};
  border-radius: 20px;
    `}
`;
