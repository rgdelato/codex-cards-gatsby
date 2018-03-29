var fs = require("fs");

var toSlug = str => {
  return str
    .toLowerCase()
    .replace(/\s/g, "_")
    .replace(/\W/g, "");
};

var heroCards = require("./raw_data/heroes.json");
var neutralCards = require("./raw_data/neutral.json");
var redCards = require("./raw_data/red.json");
var greenCards = require("./raw_data/green.json");
var blueCards = require("./raw_data/blue.json");
var blackCards = require("./raw_data/black.json");
var whiteCards = require("./raw_data/white.json");
var purpleCards = require("./raw_data/purple.json");
var mapCards = require("./raw_data/maps.json");

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

allCards.forEach(card => {
  try {
    fs.renameSync(
      `src/images/cards/${card.sirlins_filename}`,
      `src/images/cards/${toSlug(card.name)}.jpg`
    );
  } catch (e) {
    console.log(e);
  }
});

mapCards.forEach(card => {
  try {
    fs.renameSync(
      `src/images/cards/${card.filename}`,
      `src/images/cards/${toSlug(card.name)}.jpg`
    );
  } catch (e) {
    console.log(e);
  }
});
