import React from 'react';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';
import CourseTab from '~/components/Course/Tab';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Sidebar = styled.div`
  float: left;
  position: relative;
  z-index: 2;
  width: 452px;
  height: 100%;
  box-shadow: 0 0 24px 2px ${painter.grayscale[4]};
  background-color: ${painter.basic.white};
  overflow: auto;
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

type Props = {
  renderSideBar: () => JSX.Element;
  renderContent: () => JSX.Element;
};

export function CourseLayout(props: Props): JSX.Element {
  return (
    <Wrap>
      <Sidebar>{props.renderSideBar()}</Sidebar>
      <Content>
        <ContentInner>
          <CourseTab />
          {props.renderContent()}
        </ContentInner>
      </Content>
    </Wrap>
  );
}
