import React from "react";
import matchPath from "react-router-dom/matchPath";
import shuffle from "lodash/shuffle";
import ColorPage from "../../templates/color";
import ImagesPage from "../../templates/images";

const DeckPage = ({ data, location: { pathname } }) => {
  const match = matchPath(pathname, "/deck/:spec1/:spec2/:spec3");
  const matchImages = matchPath(pathname, "/deck/:spec1/:spec2/:spec3/images");
  const matchRandom = matchPath(pathname, "/deck/random");

  if (!match && !matchImages && !matchRandom) {
    return null;
  }

  let spec1Json, spec2Json, spec3Json;
  const allSpecsNodes = data.allSpecsJson.edges.map(edge => edge.node);
  const allCardsEdges = data.allCardsJson.edges;

  if (matchRandom) {
    const shuffledSpecs = shuffle(
      data.allSpecsJson.edges.map(edge => edge.node)
    );
    spec1Json = shuffledSpecs[0];
    spec2Json = shuffledSpecs[1];
    spec3Json = shuffledSpecs[2];
  } else {
    const { spec1, spec2, spec3 } = match.params;

    spec1Json = allSpecsNodes.filter(node => node.slug === spec1)[0];
    spec2Json = allSpecsNodes.filter(node => node.slug === spec2)[0];
    spec3Json = allSpecsNodes.filter(node => node.slug === spec3)[0];
  }

  const starterCards = allCardsEdges.filter(
    ({ node }) =>
      node.starting_zone === "deck" && node.color === spec1Json.color
  );

  const spec1Cards = allCardsEdges.filter(
    ({ node }) => node.spec === spec1Json.spec
  );

  const spec2Cards = allCardsEdges.filter(
    ({ node }) => node.spec === spec2Json.spec
  );

  const spec3Cards = allCardsEdges.filter(
    ({ node }) => node.spec === spec3Json.spec
  );

  if (matchImages) {
    return (
      <ImagesPage
        data={{
          allCardsJson: {
            edges: [].concat(starterCards, spec1Cards, spec2Cards, spec3Cards)
          }
        }}
        pathContext={{
          color: spec1Json.color,
          spec1: spec1Json.spec,
          spec2: spec2Json.spec,
          spec3: spec3Json.spec
        }}
      />
    );
  } else {
    return (
      <ColorPage
        data={{
          allCardsJson: {
            edges: [].concat(starterCards, spec1Cards, spec2Cards, spec3Cards)
          }
        }}
        pathContext={{
          color: spec1Json.color,
          spec1: spec1Json.spec,
          spec2: spec2Json.spec,
          spec3: spec3Json.spec
        }}
      />
    );
  }
};

export default DeckPage;

export const query = graphql`
  query DeckQuery {
    allSpecsJson {
      edges {
        node {
          spec
          color
          slug
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
          color
          spec
          bottom
          slug
        }
      }
    }
  }
`;
