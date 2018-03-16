var fs = require("fs");

var heroCards = require("./raw_data/heroes.json");
var neutralCards = require("./raw_data/neutral.json");
var redCards = require("./raw_data/red.json");
var greenCards = require("./raw_data/green.json");
var blueCards = require("./raw_data/blue.json");
var blackCards = require("./raw_data/black.json");
var whiteCards = require("./raw_data/white.json");
var purpleCards = require("./raw_data/purple.json");
var mapCards = require("./raw_data/maps.json");
var rulings = require("./raw_data/rulings.json");

var allCards = []
  .concat(
    heroCards,
    neutralCards,
    redCards,
    greenCards,
    blueCards,
    blackCards,
    whiteCards,
    purpleCards
  )
  .filter(card => card.sirlins_filename); // removing tokens/workers/buildings

var allRulings = Object.keys(rulings).reduce((acc, key) => {
  return acc.concat(rulings[key]);
}, []);

var createBottom = item => {
  if (item.tech_level == 0) {
    return "Tech 0";
  } else if (item.tech_level === 1) {
    return "Tech I";
  } else if (item.tech_level === 2) {
    return "Tech II";
  } else if (item.tech_level === 3) {
    return "Tech III";
  } else if (
    item.type === "Spell" ||
    item.type === "Ongoing Spell" ||
    item.type === "Minor Spell" ||
    item.type === "Minor Ongoing Spell"
  ) {
    return "Magic";
  } else if (
    item.type === "Ultimate Spell" ||
    item.type === "Ultimate Ongoing Spell" ||
    item.type === "Ongoing Ultimate Spell"
  ) {
    return "Ultimate Magic";
  } else if (item.type === "Hero") {
    return "Hero";
  }
};

var cardTextKeys = [
  "rules_text_1",
  "rules_text_2",
  "rules_text_3",
  "base_text_1",
  "base_text_2",
  "base_text_3",
  "mid_text_1",
  "mid_text_2",
  "mid_text_3",
  "max_text_1",
  "max_text_2",
  "max_text_3",
  "subtype"
];

var keywords = Object.keys(
  rulings.General.reduce(
    (acc, ruling) => Object.assign({}, acc, { [ruling.card]: true }),
    {}
  )
);

var createKeywords = item => {
  var uniqueKeywords = {};

  cardTextKeys.forEach(key => {
    if (item[key]) {
      const cardText = item[key].replace(/\(.*?\)/g, ""); // remove parenthetical text

      keywords.forEach(keyword => {
        let fixedKeyword;
        if (keyword.lastIndexOf(" X") === keyword.length - 2) {
          fixedKeyword = keyword.slice(0, -2);
        } else {
          fixedKeyword = keyword;
        }

        if (cardText.toLowerCase().indexOf(fixedKeyword.toLowerCase()) !== -1) {
          uniqueKeywords[keyword] = true;
        }
      });
    }

    return uniqueKeywords;
  });

  return Object.keys(uniqueKeywords);
};

var createTokens = item => {
  var uniqueTokens = {};

  cardTextKeys.forEach(key => {
    if (item[key]) {
      const cardText = item[key].replace(/\(.*?\)/g, ""); // remove parenthetical text

      // If there's a word before "token" and if the first letter of that word is a capital letter,
      // then we'll assume it's a token type.
      // TODO: This regex doesn't work for Lich's Bargain or multi-word token types (e.g. "Mirror Illusion" token)
      const regex = /(\w+)\stoken/g;
      let token = regex.exec(cardText);
      while (token !== null) {
        if (token[1][0] === token[1][0].toUpperCase()) {
          // console.log(item.name, JSON.stringify(token[1]));
          uniqueTokens[token[1]] = true;
        }
        token = regex.exec(cardText);
      }
    }
  });

  return Object.keys(uniqueTokens);
};

var toSlug = str => {
  return str
    .toLowerCase()
    .replace(/\s/g, "_")
    .replace(/\W/g, "");
};

var generalRulings = rulings.General.reduce((acc, ruling) => {
  var existingRuling = acc.filter(existing => existing.card === ruling.card)[0];

  if (existingRuling) {
    existingRuling.rulings.push({
      ruling: ruling.ruling,
      date: ruling.date,
      author: ruling.author
    });
    return acc;
  } else {
    var newRuling = {
      card: ruling.card,
      abilityText: ruling.abilityText,
      slug: toSlug(ruling.card),
      rulings: [
        { ruling: ruling.ruling, date: ruling.date, author: ruling.author }
      ]
    };
    return [].concat(acc, [newRuling]);
  }
}, []);

var allCardsWithRulings = allCards.map(card =>
  Object.assign(card, {
    rulings: allRulings.filter(
      ruling => ruling.card === card.name && ruling.ruling
    ),
    bottom: createBottom(card),
    keywords: createKeywords(card),
    tokens: createTokens(card),
    slug: toSlug(card.name),
    // bugfix for "Research & Development"
    sirlins_filename: card.sirlins_filename
      ? card.sirlins_filename.replace("&", "")
      : null
  })
);

var allColors = allCards.reduce((acc, card) => {
  var existingColor = acc.filter(color => color.color === card.color);
  if (!card.color || existingColor[0]) {
    return acc;
  } else {
    return [...acc, { color: card.color, slug: toSlug(card.color) }];
  }
}, []);

var allSpecs = allCards.reduce((acc, card) => {
  var existingSpec = acc.filter(spec => spec.spec === card.spec);
  if (!card.spec || existingSpec[0]) {
    return acc;
  } else {
    return [
      ...acc,
      { spec: card.spec, color: card.color, slug: toSlug(card.spec) }
    ];
  }
}, []);

fs.writeFileSync(
  "src/data/cards.json",
  JSON.stringify(allCardsWithRulings, null, "  ")
);

fs.writeFileSync(
  "src/data/maps.json",
  JSON.stringify(
    mapCards.map(item => {
      var map = Object.assign({}, item, { slug: toSlug(item.name) });
      delete map.id;
      return map;
    }),
    null,
    "  "
  )
);

fs.writeFileSync(
  "src/data/general.json",
  JSON.stringify(generalRulings, null, "  ")
);

fs.writeFileSync("src/data/colors.json", JSON.stringify(allColors, null, "  "));

fs.writeFileSync("src/data/specs.json", JSON.stringify(allSpecs, null, "  "));
