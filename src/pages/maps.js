import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";

const MapsPage = ({ data }) => (
  <div>
    <h1>Map Cards</h1>

    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
        grid-gap: 1.0875rem;
      `}
    >
      {data.allMapsJson.edges.map(({ node }) => (
        <div
          key={node.name}
          className={css`
            text-align: center;
          `}
        >
          <Link to={`/map/${node.slug}`}>
            <img
              src={`//codexcards-assets.surge.sh/images/${node.filename}`}
              alt={node.name}
              width="330"
              height="450"
            />
          </Link>
        </div>
      ))}
    </div>

    <pre>{JSON.stringify(data, null, "  ")}</pre>
  </div>
);

export default MapsPage;

export const query = graphql`
  query MapsQuery {
    allMapsJson {
      edges {
        node {
          name
          filename
          slug
        }
      }
    }
  }
`;
