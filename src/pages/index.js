import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import Search from "../components/Search";
import algoliaSVG from "../images/search-by-algolia.svg";

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

    {/* <p>
      <Link to="/card/random">Random Card</Link> |{" "}
      <Link to="/deck/random">Random Deck</Link> |{" "}
      <Link to="/map/random">Random Map</Link>
    </p> */}

    <p>
      <a href="https://www.algolia.com/" target="_blank">
        <img src={algoliaSVG} alt="Search by Algolia" width="130" height="18" />
      </a>
    </p>
  </div>
);

export default IndexPage;
