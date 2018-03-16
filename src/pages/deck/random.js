import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
// import shuffle from "lodash/shuffle";

class RandomDeckPage extends React.Component {
  state = { cards: null };

  componentDidMount() {
    const { data } = this.props;

    // shuffle specs
    // const shuffledSpecs = shuffle(allSpecsJson.edges.map(edge => edge.node));

    const cardslength = data.allCardsJson.edges.length;
    const randomCardIndex = Math.floor(Math.random() * cardslength);
    const randomCard = data.allCardsJson.edges[randomCardIndex].node;

    this.setState({ cards: randomCards });
  }

  render() {
    if (this.state.card) {
      return <xmp>{JSON.stringify(this.state.card, null, "  ")}</xmp>;
    } else {
      return null; // loading...
    }
  }
}

export default RandomDeckPage;

export const query = graphql`
  query RandomDeckQuery {
    allSpecsJson {
      edges {
        node {
          spec
          color
        }
      }
    }

    allCardsJson {
      edges {
        node {
          name
          sirlins_filename
          type
          starting_zone
          spec
          bottom
          slug
        }
      }
    }
  }
`;
