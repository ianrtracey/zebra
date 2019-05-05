// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { makeStore } from "../redux/reduxApi.js";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <StyletronProvider value={styletron}>
            <Component {...pageProps} />
          </StyletronProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore, { debug: false })(MyApp);
