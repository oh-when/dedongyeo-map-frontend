import React from 'react';
import styled from 'styled-components';
import { makeVar, useReactiveVar } from "@apollo/client";
import painter from '~/styles/theme/painter';
import CourseTab from '~/components/Course/Tab';
import { useEffect } from 'react';

export const isSidebarOpenedVar = makeVar(false);

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Sidebar = styled.div<{ isOpened: boolean }>`
  float: left;
  position: relative;
  height: 100%;
  ${props => props.isOpened ? `
  z-index: 2;
  width: 452px;
  box-shadow: 0 0 24px 2px ${painter.grayscale[4]};
  background-color: ${painter.basic.white};
  ` : `
  z-index: 10000;
  `}
`;

const Content = styled.div`
  overflow: hidden;
  height: 100%;
  background-color: ${painter.grayscale[1]};
`;

const ContentInner = styled.div`
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
`;

const ToggleButton = styled.button.attrs({ type: 'button' })<{ isOpened: boolean }>`
  position: absolute;
  top: 50%;
  right: -32px;
  width: 32px;
  height: 88px;
  margin-top: -44px;
  border-radius: 0 4px 4px 0;
  border: 1px solid ${painter.grayscale[1]};
  background-color: ${painter.basic.white};
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;
    width: 14px;
    height: 14px;
    border: solid ${painter.primary.basic};
    border-width: 2px 2px 0 0;
    ${props => props.isOpened ? `
    margin: -9px -12px 0 0;
    transform: rotate(-135deg);
    ` : `
    margin: -8px -6px 0 0;
    transform: rotate(45deg);
    `}
  }
`;

type Props = {
  renderSideBar: () => JSX.Element;
  renderContent: () => JSX.Element;
  isToggleButton?: boolean;
};

export function CourseLayout(props: Props): JSX.Element {
  const isOpened = useReactiveVar(isSidebarOpenedVar);

  useEffect(() => {
    window && window.dispatchEvent && window.dispatchEvent(new Event('resize'));
  }, [isOpened]);

  return (
    <Wrap>
      <Sidebar isOpened={isOpened}>
        {props.renderSideBar()}
        {props.isToggleButton && <ToggleButton isOpened={isOpened} onClick={() => isSidebarOpenedVar(!isOpened)} />}
      </Sidebar>
      <Content>
        <ContentInner>
          <CourseTab />
          {props.renderContent()}
        </ContentInner>
      </Content>
    </Wrap>
  );
}

