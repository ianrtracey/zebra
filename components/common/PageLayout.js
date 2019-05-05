import React from "react";
import { H2 } from "baseui/typography";
import { styled } from "baseui";

const CenteredContainer = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
});

const WidthContainer = styled("main", {
  minWidth: "300px"
});

const PageLayout = props => (
  <CenteredContainer>
    <WidthContainer>
      <H2>{props.title}</H2>
      <React.Fragment>{props.children}</React.Fragment>
    </WidthContainer>
  </CenteredContainer>
);

export default PageLayout;
