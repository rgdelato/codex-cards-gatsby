import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import toSlug from "../utils/toSlug";

const Color = ({ data: { allCardsJson }, pathContext: { color } }) => {
  const specsMap = allCardsJson.edges.reduce(
    (acc, { node }) => (node.spec ? { ...acc, [node.spec]: true } : acc),
    {}
  );

  const specs = Object.keys(specsMap);

  return (
    <div>
      <p
        className={css`
          text-align: center;
        `}
      >
        <small>[ {specs.join(" / ")} ]</small>
        <br />
        <small>
          [ <Link to={`/color/${toSlug(color)}/images`}>All Images</Link> ]
        </small>
      </p>

      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.45rem;
        `}
      >
        <h2
          className={css`
            width: 330px;
            margin: 0;
            text-align: center;
          `}
        >
          {color} Starter
        </h2>

        <div
          className={css`
            width: 330px;
          `}
        >
          <blockquote
            className={css`
              margin-bottom: 0;
            `}
          >
            {allCardsJson.edges.map(
              ({ node }) =>
                node.starting_zone === "deck" && (
                  <div
                    key={node.name}
                    className={css`
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    `}
                  >
                    <Link to={`/card/${node.slug}`}>{node.name}</Link> —{" "}
                    <small>{node.bottom}</small>
                  </div>
                )
            )}
          </blockquote>
        </div>
      </div>

      <div
        className={css`
          display: flex;
          justify-content: space-around;
        `}
      >
        {specs.map(spec => (
          <div key={spec}>
            {allCardsJson.edges.map(
              ({ node }) =>
                node.spec === spec &&
                node.type === "Hero" && (
                  <div key={node.name}>
                    <Link to={`/card/${node.slug}`}>
                      <img
                        src={`http://codexcards-assets.surge.sh/images/${
                          node.sirlins_filename
                        }`}
                        alt={node.name}
                        width="330"
                        height="450"
                        className={css`
                          display: block;
                        `}
                      />
                    </Link>
                  </div>
                )
            )}

            <div
              className={css`
                width: 330px;
              `}
            >
              <blockquote>
                {allCardsJson.edges.map(
                  ({ node }) =>
                    node.spec === spec && (
                      <div
                        key={node.name}
                        className={css`
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        `}
                      >
                        <Link to={`/card/${node.slug}`}>{node.name}</Link> —{" "}
                        <small>{node.bottom}</small>
                      </div>
                    )
                )}
              </blockquote>
            </div>
          </div>
        ))}
      </div>

      {/* {<pre>{JSON.stringify(allCardsJson.edges, null, "  ")}</pre>} */}
    </div>
  );
};

export default Color;

export const query = graphql`
  query ColorQuery($color: String!) {
    allCardsJson(filter: { color: { eq: $color } }) {
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
