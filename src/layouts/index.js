import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { css } from "emotion";
import Header from "../components/Header.js";

import "typeface-montserrat";
import "semantic-ui-input/input.min.css";
import "semantic-ui-icon/icon.min.css";

const TemplateWrapper = ({ children, data: { site } }) => (
  <div>
    <Helmet>
      <title>{site.siteMetadata.title}</title>
    </Helmet>

    <Header />

    <div
      className={css`
        margin: 0 auto;
        padding: 0 1.0875rem 1.45rem;
        padding-top: 0;
      `}
    >
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
