import React, { Component } from "react";
import PageLayout from "../components/common/PageLayout.js";
import { styled } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { Button } from "baseui/button";
import { StatefulButtonGroup } from "baseui/button-group";
import Img from "react-image";

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
                <Heading font="font600">
                  My 25th birthday wine extravaganza
                </Heading>
                <Heading font="font500">Hosted by Ian Tracey</Heading>
                <Heading font="font400">June 20th @ 8pm</Heading>
                <StatefulButtonGroup mode="radio">
                  <Button>Not going</Button>
                  <Button>going</Button>
                </StatefulButtonGroup>
                <Heading font="font300">
                  Hey guys, we are going to be doing some really cool things for
                  my birthday this year. Please let me know if you can go. :)
                </Heading>
              </HeadingLevel>
            </div>
          </Center>
        </ContentContainer>
      </CenteredContainer>
    );
  }
}
export default EventPage;
