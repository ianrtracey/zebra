import React, { Component } from "react";
import PageLayout from "../components/common/PageLayout.js";

class EventPage extends Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    // pass
    return {
      id: query.id
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props;
    return (
      <PageLayout title="New Event">
        <h1>Event page</h1>
        <p>id: {id}</p>
      </PageLayout>
    );
  }
}
export default EventPage;
