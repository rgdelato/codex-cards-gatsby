import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import CardPage from "../../templates/card";

class RandomCardPage extends React.Component {
  state = { card: null };

  componentDidMount() {
    const { data } = this.props;
    const cardslength = data.allCardsJson.edges.length;
    const randomCardIndex = Math.floor(Math.random() * cardslength);
    const randomCard = data.allCardsJson.edges[randomCardIndex].node;

    this.setState({ card: randomCard });
  }

  render() {
    if (this.state.card) {
      return <CardPage data={{ cardsJson: this.state.card }} />;
    } else {
      return null; // loading...
    }
  }
}

export default RandomCardPage;

export const query = graphql`
  query RandomCardQuery {
    allCardsJson {
      edges {
        node {
          name
          starting_zone
          sirlins_filename
          type
          subtype
          cost
          ATK
          HP
          rules_text_1
          rules_text_2
          rules_text_3

          base_text_1
          base_text_2
          ATK_1
          HP_1

          mid_level

          mid_text_1
          mid_text_2
          ATK_2
          HP_2

          max_level

          max_text_1
          max_text_2
          ATK_3
          HP_3

          flavor_text
          color
          spec
          bottom

          rulings {
            ruling
            date
            author
          }

          keywords
        }
      }
    }
  }
`;
