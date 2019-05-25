import React, { Component } from "react";
import PageLayout from "../components/common/PageLayout.js";
import { styled } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { Button, SHAPE, KIND } from "baseui/button";
import { StatefulButtonGroup } from "baseui/button-group";
import Img from "react-image";
import { Input, StatefulInput } from "baseui/input";
import { StatefulTextarea as Textarea, SIZE } from "baseui/textarea";
import { StatefulDatepicker } from "baseui/datepicker";
import { Block } from "baseui/block";
import { addDays } from "date-fns";
import statefulDatepicker from "baseui/datepicker/stateful-datepicker";
import Delete from "baseui/icon/delete";
import Check from "baseui/icon/check";

const testSrcUrl =
  "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/58420083_2129822833739127_8168988201688498176_o.jpg?_nc_cat=101&_nc_ht=scontent-sjc3-1.xx&oh=4fa79a95c7d4cd27d24129c5c15dc613&oe=5D99107B";

const CenteredContainer = styled("div", {
  display: "flex",
  justifyContent: "center"
});

const Center = styled("div", {
  display: "flex",
  justifyContent: "center",
  padding: "0.75em"
});

const ContentContainer = styled("div", {});

const ImageWrapper = styled("div", {
  maxWidth: "200px"
});

const FormFieldWrapper = styled("div", {
  paddingTop: "1em",
  paddingBottom: "1em"
});

const ButtonWrapper = styled("div", {
  padding: "1em",
  display: "flex",
  justifyContent: "space-between",
  height: "100vh",
  alignItems: "end"
});

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
      <React.Fragment>
        <CenteredContainer>
          <ContentContainer>
            <Center>
              <div>
                <Img
                  style={{
                    display: "inline-block",
                    margin: "-12px",
                    width: "112%"
                  }}
                  src={testSrcUrl}
                />
                <HeadingLevel>
                  <React.Fragment>
                    <Input
                      autoFocus
                      placeholder="Your amazing event name here"
                    />
                    <Heading font="font500">Hosted by Ian Tracey</Heading>
                    <FormFieldWrapper>
                      <StatefulDatepicker />
                    </FormFieldWrapper>
                    <FormFieldWrapper>
                      <StatefulInput placeholder="1234 easy st." />
                    </FormFieldWrapper>
                    <FormFieldWrapper>
                      <Textarea size={SIZE.compact} placeholder="Description" />
                    </FormFieldWrapper>
                  </React.Fragment>
                </HeadingLevel>
              </div>
            </Center>
          </ContentContainer>
        </CenteredContainer>
        <React.Fragment>
          <ButtonWrapper>
            <Button
              style={{ width: "4em", height: "4em" }}
              kind={KIND.secondary}
              shape={SHAPE.round}
            >
              <Delete size="height 2em; width: 2em" />
            </Button>
            <Button style={{ width: "4em", height: "4em" }} shape={SHAPE.round}>
              <Check size="height 2em; width: 2em" />
            </Button>
          </ButtonWrapper>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
export default EventPage;
