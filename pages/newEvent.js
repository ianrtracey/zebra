import React, { Component } from "react";
import PageLayout from "../components/common/PageLayout.js";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { Search } from "baseui/icon";
import { Block } from "baseui/block";
import { StatefulTextarea as Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import ArrowRight from "baseui/icon/arrow-right";
import { Label2 } from "baseui/typography";
import reduxApi, { withEvents } from "../redux/reduxApi.js";
import Router from "next/router";

const Steps = {
  INFO: "info",
  INVITE: "invite"
};
class NewEventPage extends Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    return {};
  }

  constructor(props) {
    super(props);
    this.state = {
      steps: [Steps.INFO, Steps.INVITE],
      isDisabled: false,
      form: {
        name: "",
        description: "",
        date: ""
      }
    };
  }

  handleContinueButtonClick = () => {
    this._incrementStep();
  };

  handleDoneButtonClick = () => {
    this.setState({ isDisabled: true });
    const callWhenDone = () => {
      this.setState({ isDisabled: false });
      Router.push("/");
    };
    const { name, description, date } = this.state.form;
    const newEvent = {
      name,
      description
    };
    console.log("sending with", newEvent);
    this.props.dispatch(
      reduxApi.actions.events.post(
        {},
        {
          body: JSON.stringify(newEvent)
        },
        callWhenDone
      )
    );
  };

  _getCurrentStep = () => {
    const { steps } = this.state;
    if (!steps || steps.length == 0) {
      return -1;
    }
    return steps[0];
  };

  _incrementStep = () => {
    const steps = this.state.steps;
    this.setState({
      ...this.state,
      steps: steps.slice(1)
    });
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    const { form } = this.state;
    this.setState({
      ...this.state,
      form: {
        ...form,
        [name]: value
      }
    });
  };

  renderInfoStep = () => {
    return (
      <React.Fragment>
        <FormControl label="Name ">
          <Input
            name="name"
            onChange={this.handleOnChange}
            value={this.state.name}
            placeholder="My Amazing Event"
          />
        </FormControl>
        <FormControl label="Location">
          <Input
            name="location"
            onChange={this.handleOnChange}
            value={this.state.location}
            placeholder="1234 Internet Lane, IN 09876"
            overrides={{
              Before: () => (
                <Block
                  display="flex"
                  alignItems="center"
                  paddingLeft="scale500"
                >
                  <Search size="16px" />
                </Block>
              )
            }}
          />
        </FormControl>
        <FormControl label="Description">
          <Textarea
            name="description"
            onChange={this.handleOnChange}
            value={this.state.description}
          />
        </FormControl>
      </React.Fragment>
    );
  };

  renderInviteStep = () => (
    <Block align="center">
      <p>Invite friends (TBD)</p>
    </Block>
  );

  render() {
    const step = this._getCurrentStep();
    console.log(this.state);
    return (
      <PageLayout title="New Event">
        {step === Steps.INFO && this.renderInfoStep()}
        {step === Steps.INVITE && this.renderInviteStep()}
        <Block display="flex" justifyContent="flex-end">
          {this.state.steps.length > 1 ? (
            <Button
              endEnhancer={() => <ArrowRight size={24} />}
              onClick={this.handleContinueButtonClick}
            >
              Continue
            </Button>
          ) : (
            <Button onClick={this.handleDoneButtonClick}>Done</Button>
          )}
        </Block>
      </PageLayout>
    );
  }
}

export default withEvents(NewEventPage);
