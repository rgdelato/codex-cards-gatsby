import React from "react";
import matchPath from "react-router-dom/matchPath";
import ColorPage from "./color";
import ImagesPage from "./images";

const DeckPage = ({ data, location }) => {
  const match = matchPath(location.pathname, "/deck/:spec1/:spec2/:spec3");
  const matchImages = matchPath(
    location.pathname,
    "/deck/:spec1/:spec2/:spec3/images"
  );
  const { spec1, spec2, spec3 } = match.params;

  const nodes = data.allSpecsJson.edges.map(edge => edge.node);
  const spec1Json = nodes.filter(node => node.slug === spec1)[0];
  const spec2Json = nodes.filter(node => node.slug === spec2)[0];
  const spec3Json = nodes.filter(node => node.slug === spec3)[0];

  const allCardsEdges = data.allCardsJson.edges;

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
