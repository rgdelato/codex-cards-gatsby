import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import Search from "./Search";

const Header = () => (
  <div
    style={{
      background: "hsla(0,0%,0%,0.04)",
      marginBottom: "1.45rem"
    }}
  >
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        padding: 1.45rem 1.0875rem;
      `}
    >
      <Link to="/">
        <h3
          className={css`
            margin: 0;
          `}
        >
          Codex Card Database
        </h3>
      </Link>

      <div
        className={css`
          display: none;
          @media (min-width: 510px) {
            display: inherit;
          }
        `}
      >
        <Search className="mini" />
      </div>
    </div>
  </div>
);

export default Header;
