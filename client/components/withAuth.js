import React, { Component } from "react";
import Router from "next/router";
export default function withAuth(WrappedComponent) {
  return class extends Component {
    state = {
      isAuth: false
    };

    componentDidMount() {
      if (localStorage.getItem("ZEBRA_ACCESS_TOKEN")) {
        this.setState({
          ...this.state,
          isAuth: true
        });
      } else {
        Router.replace("/account/login");
      }
    }
    render() {
      if (this.state.isAuth) {
        return <WrappedComponent {...this.props} />;
      }
      return null;
    }
  };
}
