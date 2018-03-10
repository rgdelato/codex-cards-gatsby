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
          flex-direction: column;
          justify-content: center;
          align-items: center;
          @media (min-width: 720px) {
            flex-direction: row;
          }
        `}
      >
        <h2
          className={css`
            width: 330px;
            margin: 1.45rem 0;
            text-align: center;
            @media (min-width: 720px) {
              margin-right: 1.0875rem;
            }
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
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 1.45rem;
          @media (min-width: 720px) {
          }
          @media (min-width: 1070px) {
            flex-direction: row;
          }
        `}
      >
        {specs.map(spec => (
          <div
            key={spec}
            className={css`
              @media (min-width: 720px) {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
              }
              @media (min-width: 1070px) {
                flex-direction: column;
                margin-right: 1.0875rem;
              }
            `}
          >
            {allCardsJson.edges.map(
              ({ node }) =>
                node.spec === spec &&
                node.type === "Hero" && (
                  <div
                    key={node.name}
                    className={css`
                      @media (min-width: 720px) {
                        margin-right: 1.0875rem;
                      }
                      @media (min-width: 1070px) {
                        margin-right: 0;
                      }
                    `}
                  >
                    <Link to={`/card/${node.slug}`}>
                      <img
                        src={`http://codexcards-assets.surge.sh/images/${
                          node.sirlins_filename
                        }`}
                        alt={node.name}
                        className={css`
                          @media (min-width: 370px) {
                            width: 330px;
                            height: 450px;
                          }
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
