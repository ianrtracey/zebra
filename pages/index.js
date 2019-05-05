import React, { Component } from "react";
import reduxApi, { withEvents } from "../redux/reduxApi.js";
import { styled } from "baseui";

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
});

class IndexPage extends Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    // Get all kittens
    const events = await store.dispatch(reduxApi.actions.events.sync());
    return { events, query };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { events } = this.props;
    return (
      <Centered>
        <main id="index">
          <h1>Events</h1>
          {events.length === 0 ? (
            <div>no events</div>
          ) : (
            events.map(e => <div>{e.name}</div>)
          )}
        </main>
      </Centered>
    );
  }
}

export default IndexPage;
