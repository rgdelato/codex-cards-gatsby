import React from "react";
import Link from "gatsby-link";
import { css } from "emotion";
import formatDate from "date-fns/format";
import toSlug from "../utils/toSlug";

const Card = ({ data: { cardsJson } }) => (
  <div
    className={css`
      max-width: 1070px;
      margin: 0 auto;
    `}
  >
    <h1
      className={css`
        margin-left: 15px;
      `}
    >
      {cardsJson.name}
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
        <img
          src={`//codexcards-assets.surge.sh/images/${
            cardsJson.sirlins_filename
          }`}
          alt={cardsJson.name}
          className={css`
            @media (min-width: 370px) {
              width: 330px;
              height: 450px;
            }
          `}
        />
      </div>

      <div
        className={css`
          flex: 1 1 0px;
          margin-top: 15px;
        `}
      >
        <p>
          {cardsJson.type}
          {cardsJson.subtype && " — "}
          {cardsJson.subtype} • Cost: {cardsJson.cost}
          {cardsJson.ATK && " • ATK: "}
          {cardsJson.ATK}
          {cardsJson.HP && " • HP: "}
          {cardsJson.HP}
        </p>

        {cardsJson.type === "Hero" ? (
          <blockquote>
            <strong>Level 1-{cardsJson.mid_level - 1}:</strong>{" "}
            {cardsJson.base_text_1}
            {cardsJson.base_text_2 && <br />}
            {cardsJson.base_text_2} • ATK: {cardsJson.ATK_1} • HP:{" "}
            {cardsJson.HP_1}
            <br />
            <strong>
              Level {cardsJson.mid_level}-{cardsJson.max_level - 1}:
            </strong>{" "}
            {cardsJson.mid_text_1}
            {cardsJson.mid_text_2 && <br />}
            {cardsJson.mid_text_2} • ATK: {cardsJson.ATK_2} • HP:{" "}
            {cardsJson.HP_2}
            <br />
            <strong>Level {cardsJson.max_level}:</strong> {cardsJson.max_text_1}
            {cardsJson.max_text_2 && <br />}
            {cardsJson.max_text_2} • ATK: {cardsJson.ATK_3} • HP:{" "}
            {cardsJson.HP_3}
          </blockquote>
        ) : cardsJson.rules_text_1 ? (
          <blockquote>
            {cardsJson.rules_text_1}
            {cardsJson.rules_text_2 && <br />}
            {cardsJson.rules_text_2}
            {cardsJson.rules_text_3 && <br />}
            {cardsJson.rules_text_3}
          </blockquote>
        ) : null}

        <p>
          <em>{cardsJson.flavor_text}</em>
        </p>

        <p>
          <Link to={`/color/${toSlug(cardsJson.color)}`}>
            {cardsJson.color}
          </Link>
          {cardsJson.spec && " • "}
          {cardsJson.spec} {cardsJson.bottom}
        </p>

        {cardsJson.rulings.length ? <h2>Card-Specific Rulings</h2> : null}

        {cardsJson.rulings.map(ruling => (
          <blockquote key={ruling.ruling}>
            <small>
              {ruling.ruling}
              {ruling.author && " — "}
              {ruling.author}
              {ruling.date && ", "}
              {formatDate(ruling.date, "MM/DD/YY")}
            </small>
          </blockquote>
        ))}

        <p>
          {cardsJson.keywords.length ? "Keyword Rulings: " : null}
          {cardsJson.keywords.map((keyword, i) => (
            <span key={keyword}>
              {i !== 0 ? ", " : null}
              <Link key={keyword} to={`/ruling/${toSlug(keyword)}`}>
                {keyword}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </div>

    {/* {<pre>{JSON.stringify(cardsJson, null, "  ")}</pre>} */}
  </div>
);

export default Card;

export const query = graphql`
  query CardQuery($slug: String!) {
    cardsJson(slug: { eq: $slug }) {
      name
      starting_zone
      sirlins_filename
      type
      subtype
      cost
      ATK
      HP
      rules_text_1
      rules_text_2
      rules_text_3

      base_text_1
      base_text_2
      ATK_1
      HP_1

      mid_level

      mid_text_1
      mid_text_2
      ATK_2
      HP_2

      max_level

      max_text_1
      max_text_2
      ATK_3
      HP_3

      flavor_text
      color
      spec
      bottom

      rulings {
        ruling
        date
        author
      }

      keywords
    }
  }
`;
