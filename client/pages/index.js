import React, { Component } from "react";
import reduxApi, { withEvents } from "../redux/reduxApi.js";
import PageLayout from "../components/common/PageLayout.js";
import { styled } from "baseui";
import { H2, H4, H6 } from "baseui/typography";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import Router from "next/router";

const CenteredContainer = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
});

const Center = styled("div", {
  display: "flex",
  justifyContent: "center"
});

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
      <CenteredContainer>
        <main id="index">
          <H2 align="center">Your Events</H2>
          <Center>
            <div>
              <Button onClick={this.handleNewEventButtonClick}>
                Create new event
              </Button>
              <H4 align="center">Past</H4>
              {data.length === 0 ? (
                <div>no events</div>
              ) : (
                data.map(e => (
                  <div>
                    <H6>{e.name}</H6>
                  </div>
                ))
              )}
              <H4 align="center">Upcoming</H4>
            </div>
          </Center>
        </main>
      </CenteredContainer>
    );
  }
}

export default withEvents(IndexPage);
