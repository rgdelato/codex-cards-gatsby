import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import toSlug from "../utils/toSlug";

const Images = ({ data: { allCardsJson }, pathContext: { color } }) => {
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
        <small>
          [ <Link to={`/color/${toSlug(color)}`}>{specs.join(" / ")}</Link> ]
        </small>
        <br />
        <small>[ All Images ]</small>
      </p>

      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
          grid-gap: 1.0875rem;
        `}
      >
        {allCardsJson.edges.map(
          ({ node }) =>
            node.starting_zone === "deck" && (
              <div
                key={node.name}
                className={css`
                  display: flex;
                  justify-content: center;
                `}
              >
                <Link to={`/card/${node.slug}`}>
                  <img
                    src={`http://codexcards-assets.surge.sh/images/${
                      node.sirlins_filename
                    }`}
                    alt={node.name}
                    className={css`
                      display: block;
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

        {specs.map(spec =>
          allCardsJson.edges.map(
            ({ node }) =>
              node.spec === spec && (
                <div
                  key={node.name}
                  className={css`
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <Link to={`/card/${node.slug}`}>
                    <img
                      src={`http://codexcards-assets.surge.sh/images/${
                        node.sirlins_filename
                      }`}
                      alt={node.name}
                      className={css`
                        display: block;
                        @media (min-width: 370px) {
                          width: 330px;
                          height: 450px;
                        }
                      `}
                    />
                  </Link>
                </div>
              )
          )
        )}
      </div>

      {/* <pre>{JSON.stringify(allCardsJson, null, "  ")}</pre> */}
    </div>
  );
};

export default Images;

export const query = graphql`
  query ImagesQuery($color: String!) {
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
