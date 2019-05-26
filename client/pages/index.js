import React, { Component } from "react";
import reduxApi, { withEvents } from "../redux/reduxApi.js";
import PageLayout from "../components/common/PageLayout.js";
import { styled } from "baseui";
import { H2, H4, H6, Paragraph1, Paragraph2 } from "baseui/typography";
import { Block } from "baseui/block";
import Router from "next/router";
import Plus from "baseui/icon/plus";
import { Button, SHAPE, KIND } from "baseui/button";

const CenteredContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%"
});

const Center = styled("div", {
  display: "flex",
  justifyContent: "center"
});

const ContentContainer = styled("div", {
  width: "75%"
});

const createButtonStyles = {
  width: "4em",
  height: "4em",
  position: "fixed",
  bottom: "2em",
  right: "2em"
};

const Header = () => (
  <React.Fragment>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0em 1em 0em 1em",
        borderBottom: "1px dotted gray"
      }}
    >
      <Paragraph1 font="font500">zebra</Paragraph1>
      <Paragraph2>
        <a href="#" style={{ textDecoration: "none" }}>
          Ian Tracey
        </a>
      </Paragraph2>
    </div>
  </React.Fragment>
);

class IndexPage extends Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    // Get all events
    const events = await store.dispatch(reduxApi.actions.events.sync());
    console.log({
      events
    });
    return { events, query };
  }

  constructor(props) {
    super(props);
  }
  handleNewEventButtonClick = () => {
    Router.push("/event/new");
  };

  render() {
    const {
      events: { data }
    } = this.props;

    return (
      <div>
        <Header />
        <CenteredContainer>
          <ContentContainer>
            <H4 align="left">Your Events</H4>
            <div>
              {data.length === 0 ? (
                <div>no events</div>
              ) : (
                data.map(e => (
                  <div>
                    <H6>{e.name}</H6>
                  </div>
                ))
              )}
            </div>
          </ContentContainer>
        </CenteredContainer>
        <Button style={createButtonStyles} shape={SHAPE.round}>
          <Plus size="height 2em; width: 2em" />
        </Button>
      </div>
    );
  }
}

export default withEvents(IndexPage);
