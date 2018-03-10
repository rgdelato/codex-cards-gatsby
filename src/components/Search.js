import React from "react";
import { injectGlobal } from "emotion";
import algoliasearch from "algoliasearch";
import withRouter from "react-router/withRouter";
import toSlug from "../utils/toSlug";
import algoliaSVG from "../images/search-by-algolia.svg";

var client = algoliasearch("BK93IMJECS", "3b6c5e0c15c9296b4baa54ac5d49e38e");
var index = client.initIndex("allCardsJson");

injectGlobal`
  .algolia-autocomplete {
    width: 100%;
  }
  .algolia-autocomplete .aa-input, .algolia-autocomplete .aa-hint {
    width: 100%;
  }
  .algolia-autocomplete .aa-hint {
    color: #999;
  }
  .algolia-autocomplete .aa-dropdown-menu {
    width: 100%;
    background-color: #fff;
    border: 1px solid #999;
    border-top: none;
  }
  .algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
    cursor: pointer;
    padding: 5px 4px;
  }
  .algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
    background-color: #B2D7FF;
  }
  .algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
    font-weight: bold;
    font-style: normal;
  }
`;

class Search extends React.Component {
  componentDidMount() {
    const autocomplete = require("autocomplete.js");

    autocomplete(
      this.input,
      {
        hint: false,
        autoselect: true,
        autoselectOnBlur: true,
        cssClasses: {
          root: `${this.props.className} ui icon input algolia-autocomplete`
        }
      },
      {
        source: autocomplete.sources.hits(index, { hitsPerPage: 20 }),
        displayKey: "name",
        templates: {
          //'suggestion' templating function used to render a single suggestion
          suggestion: suggestion => suggestion._highlightResult.name.value
        }
      }
    );

    this.input.addEventListener("autocomplete:selected", e => {
      this.props.history.push(`/card/${toSlug(e.target.value)}`);
    });
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`ui icon input`}>
        <input
          ref={el => {
            this.input = el;
          }}
          type="text"
          placeholder="Search for a card..."
        />
        <i className="search icon" />
      </div>
    );
  }
}

export default withRouter(Search);
