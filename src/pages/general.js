import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";

const GeneralRulingsPage = ({ data }) => (
  <div>
    <h1>General Rulings</h1>

    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
        grid-gap: 0.725rem 0.54375rem;
      `}
    >
      {data.allGeneralJson.edges.map(({ node }) => (
        <div key={node.card}>
          <Link to={`/ruling/${node.slug}`}>{node.card}</Link>
        </div>
      ))}
    </div>

    {/* <pre>{JSON.stringify(data, null, "  ")}</pre> */}
  </div>
);

export default GeneralRulingsPage;

export const query = graphql`
  query GeneralRulingsQuery {
    allGeneralJson {
      edges {
        node {
          card
          slug
        }
      }
    }
  }
`;
