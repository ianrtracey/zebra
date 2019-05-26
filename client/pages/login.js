import React, { Component } from "react";
import { H1, H2, Paragraph1 } from "baseui/typography";
import { styled } from "baseui";
import { FormControl } from "baseui/form-control";
import { StatefulInput, SIZE } from "baseui/input";
import { Button, KIND } from "baseui/button";
import Link from "next/link";

const CenteredContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  marginTop: "15em",
  width: "100%"
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <CenteredContainer>
        <div style={{ width: "90%" }}>
          <H1
            style={{ padding: "0px", margin: "0px" }}
            align="center"
            font="font800"
          >
            Zebra
          </H1>
          <H2 align="center" font="font500">
            Welcome back!
          </H2>
          <FormControl label="email">
            <StatefulInput placeholder="email" />
          </FormControl>
          <FormControl label="password">
            <StatefulInput placeholder="****" />
          </FormControl>
          <div style={{ paddingTop: "1em" }}>
            <Button style={{ width: "100%" }} align="right">
              Log in
            </Button>
          </div>
          <div style={{ paddingTop: "1em" }}>
            <Link href="/account/signup">
              <Paragraph1 align="center" font="font300" color="primary300">
                Dont have an account? Create one here
              </Paragraph1>
            </Link>
          </div>
        </div>
      </CenteredContainer>
    );
  }
}

export default LoginPage;
