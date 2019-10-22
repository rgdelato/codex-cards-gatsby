import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import toSlug from "../utils/toSlug";

const Images = ({
  data: { allCardsJson },
  pathContext: { color, spec1, spec2, spec3 }
}) => {
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
          [{" "}
          {spec1 && spec2 && spec3 ? (
            <Link
              to={`/deck/${toSlug(spec1)}/${toSlug(spec2)}/${toSlug(spec3)}`}
            >
              {specs.join(" / ")}
            </Link>
          ) : (
            <Link to={`/color/${toSlug(color)}`}>{specs.join(" / ")}</Link>
          )}{" "}
          ]
        </small>
        <br />
        <small>
          [{" "}
          {spec1 && spec2 && spec3 ? (
            <Link
              to={`/deck/${toSlug(spec1)}/${toSlug(spec2)}/${toSlug(
                spec3
              )}/images`}
            >
              All Images
            </Link>
          ) : (
            <Link to={`/color/${toSlug(color)}/images`}>All Images</Link>
          )}{" "}
          ]
        </small>
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
                    src={
                      "//res.cloudinary.com/rgdelato/image/fetch/f_auto/http://codexcards-assets.surge.sh/images/" +
                      node.sirlins_filename
                    }
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
                      src={
                        "//res.cloudinary.com/rgdelato/image/fetch/f_auto/http://codexcards-assets.surge.sh/images/" +
                        node.sirlins_filename
                      }
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
          starting_zone
          spec
          slug
        }
      }
    }
  }
`;
