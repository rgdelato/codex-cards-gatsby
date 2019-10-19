import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { css } from "emotion";

const Map = ({ data: { mapsJson, imageSharp, site } }) => (
  <div
    className={css`
      max-width: 1070px;
      margin: 0 auto;
    `}
  >
    <Helmet title={`${site.siteMetadata.title} | ${mapsJson.name}`} />

    <h1
      className={css`
        margin-left: 15px;
      `}
    >
      {mapsJson.name}
    </h1>

    <div
      className={css`
        display: flex;
        flex-direction: column;
        @media (min-width: 720px) {
          flex-direction: row;
        }
      `}
    >
      <div
        className={css`
          flex: 0 0 auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          @media (min-width: 720px) {
            margin-right: 1.0875rem;
          }
        `}
      >
        <div
          className={css`
            background-image: url("${imageSharp &&
              imageSharp.resolutions &&
              imageSharp.resolutions.tracedSVG}");
            background-repeat: no-repeat;
            background-size: contain;
          `}
        >
          <img
            src={`//codexcards-assets.surge.sh/images/${mapsJson.filename}`}
            alt={mapsJson.name}
            className={css`
              @media (min-width: 370px) {
                width: 330px;
                height: 450px;
              }
            `}
          />
        </div>
      </div>

      <div
        className={css`
          flex: 1 1 0px;
          margin-top: 15px;
        `}
      >
        <p>
          {mapsJson.name}
          {" — "}
          <Link to="/maps">Map</Link>
        </p>

        <blockquote>{mapsJson.description}</blockquote>
      </div>
    </div>

    {/* {<pre>{JSON.stringify(mapsJson, null, "  ")}</pre>} */}
  </div>
);

export default Map;

export const query = graphql`
  query MapQuery($slug: String!) {
    mapsJson(slug: { eq: $slug }) {
      name
      description
      filename
      slug
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`;
