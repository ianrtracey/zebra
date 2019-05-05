import React, { Component } from "react";

class NewEventPage extends Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    this.state = {
      name: "",
      description: "",
      date: ""
    };
  }

  render() {
    return (
      <div>
        <h1>New Event</h1>
        <input placeholder="name" />
      </div>
    );
  }
}

export default NewEventPage;
