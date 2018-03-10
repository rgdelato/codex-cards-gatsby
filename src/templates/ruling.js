import React from "react";
import { css } from "emotion";
import formatDate from "date-fns/format";

const Ruling = ({ data: { generalJson } }) => (
  <div
    className={css`
      display: flex;
      justify-content: center;
    `}
  >
    <div
      className={css`
        max-width: 681.312px;
      `}
    >
      <h1>{generalJson.card}</h1>

      <p>{generalJson.abilityText}</p>

      <h2>{generalJson.card} Rulings</h2>

      {generalJson.rulings.map(ruling => (
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

      {/* <pre>{JSON.stringify(generalJson, null, "  ")}</pre> */}
    </div>
  </div>
);

export default Ruling;

export const query = graphql`
  query RulingQuery($slug: String!) {
    generalJson(slug: { eq: $slug }) {
      card
      abilityText
      rulings {
        ruling
        author
        date
      }
    }
  }
`;
