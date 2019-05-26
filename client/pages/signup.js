import React, { Component } from "react";
import { H1, H2, Paragraph1 } from "baseui/typography";
import { styled } from "baseui";
import { FormControl } from "baseui/form-control";
import { StatefulInput, SIZE } from "baseui/input";
import { Button, KIND } from "baseui/button";
import Link from "next/link";
import api from "../api";
import Router from "next/router";

const CenteredContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  marginTop: "15em",
  width: "100%"
});

class SignupPage extends Component {
  state = {
    disabled: false,
    email: "",
    password: ""
  };
  onCreateButtonClick = () => {
    this.setState({
      ...this.state,
      disabled: true
    });
    const { email, password } = this.state;
    console.log({
      email,
      password
    });
    api
      .createUser({
        name: "test",
        email,
        password
      })
      .then(resp => {
        this.setState({
          ...this.setState,
          disabled: false
        });
        if (resp && resp.jwt_token) {
          window.localStorage.setItem("ZEBRA_ACCESS_TOKEN", resp.jwt_token);
          Router.push("/");
        }
      });
  };

  onFieldChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    }),
      console.log(e);
  };
  render() {
    console.log({
      state: this.state
    });
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
            Create an account
          </H2>
          <FormControl label="email">
            <StatefulInput
              onChange={this.onFieldChange}
              value={this.state.email}
              name="email"
              placeholder="email"
            />
          </FormControl>
          <FormControl>
            <StatefulInput
              value={this.state.password}
              onChange={this.onFieldChange}
              type="password"
              name="password"
              label="password"
              placeholder="****"
            />
          </FormControl>
          <div style={{ paddingTop: "1em" }}>
            <Button
              onClick={this.onCreateButtonClick}
              style={{ width: "100%" }}
              align="right"
              disabled={this.state.disabled}
            >
              Create
            </Button>
          </div>
          <div style={{ paddingTop: "1em" }}>
            <Link href="/account/login">
              <Paragraph1 align="center" font="font300" color="primary300">
                Already have an account? Log in here
              </Paragraph1>
            </Link>
          </div>
        </div>
      </CenteredContainer>
    );
  }
}

export default SignupPage;
