import React, { Component } from "react";

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
      <div>
        <h1>Event page</h1>
        <p>id: {id}</p>
      </div>
    );
  }
}
export default EventPage;
