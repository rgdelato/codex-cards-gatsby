import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import Search from "../components/Search";
import algoliaSVG from "../images/search-by-algolia.svg";
import githubPNG from "../images/GitHub-Mark-64px.png";

const IndexPage = () => (
  <div
    className={css`
      text-align: center;
    `}
  >
    <h1>Codex Card Database</h1>
    <p>Card Texts, Rulings, and Randomizers</p>

    <Search className="big" />

    <br />
    <br />

    <p>
      <Link to="/general">General Rulings</Link>
    </p>

    <p>
      <Link to="/color/neutral">Bashing vs. Finesse</Link>
    </p>

    <p>
      <Link to="/color/red">Blood Anarchs</Link> vs.{" "}
      <Link to="/color/green">Moss Sentinels</Link>
    </p>

    <p>
      <Link to="/color/blue">Flagstone Dominion</Link> vs.{" "}
      <Link to="/color/black">Blackhand Scourge</Link>
    </p>

    <p>
      <Link to="/color/white">Whitestar Order</Link> vs.{" "}
      <Link to="/color/purple">Vortoss Conclave</Link>
    </p>

    <p>
      <Link to="/maps">Map Cards</Link>
    </p>

    <p>
      <Link to="/card/random">Random Card</Link> |{" "}
      <Link to="/map/random">Random Map</Link>
    </p>

    <p>
      <a href="https://www.algolia.com/" target="_blank">
        <img
          src={algoliaSVG}
          alt="Search by Algolia"
          className={css`
            width: 130px;
            height: 18px;
          `}
        />
      </a>
    </p>

    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <a href="https://github.com/rgdelato/codex-cards-gatsby" target="_blank">
        <img
          src={githubPNG}
          className={css`
            width: 32px;
            height: 32px;
            margin-right: 1.0875rem;
          `}
        />
      </a>
      <a href="https://github.com/rgdelato/codex-cards-gatsby" target="_blank">
        <img
          src="https://camo.githubusercontent.com/926d8ca67df15de5bd1abac234c0603d94f66c00/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f6e747269627574696f6e732d77656c636f6d652d627269676874677265656e2e7376673f7374796c653d666c6174"
          alt="contributions welcome"
          data-canonical-src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"
        />
      </a>
    </div>
  </div>
);

export default IndexPage;
