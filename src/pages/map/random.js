import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import MapPage from "../../templates/map";

class RandomMapPage extends React.Component {
  state = { card: null };

  componentDidMount() {
    const { data } = this.props;
    const cardslength = data.allMapsJson.edges.length;
    const randomCardIndex = Math.floor(Math.random() * cardslength);
    const randomCard = data.allMapsJson.edges[randomCardIndex].node;

    this.setState({ card: randomCard });
  }

  render() {
    const { site } = this.props.data;

    if (this.state.card) {
      return <MapPage data={{ mapsJson: this.state.card, site }} />;
    } else {
      return null; // loading...
    }
  }
}

export default RandomMapPage;

export const query = graphql`
  query RandomMapQuery {
    allMapsJson {
      edges {
        node {
          name
          description
          filename
          slug
        }
      }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`;
