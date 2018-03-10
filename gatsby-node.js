/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  // create "/color/" pages
  const colors = [
    "Neutral",
    "Red",
    "Green",
    "Blue",
    "Black",
    "White",
    "Purple"
  ];

  colors.forEach(color => {
    createPage({
      path: `/color/${color.toLowerCase()}`,
      component: path.resolve(`./src/templates/color.js`),
      context: {
        color: color
      }
    });

    createPage({
      path: `/color/${color.toLowerCase()}/images`,
      component: path.resolve(`./src/templates/images.js`),
      context: {
        color: color
      }
    });
  });

  // create "/card/" pages
  const cardPromise = new Promise((resolve, reject) => {
    graphql(`
      {
        allCardsJson {
          edges {
            node {
              name
              color
              spec
              sirlins_filename
              slug
              keywords
            }
          }
        }
      }
    `).then(result => {
      result.data.allCardsJson.edges.forEach(({ node }) => {
        createPage({
          path: `/card/${node.slug}`,
          component: path.resolve(`./src/templates/card.js`),
          context: {
            slug: node.slug,
            keywords: node.keywords
          }
        });
      });

      resolve();
    });
  });

  // create "/map/" pages
  const mapPromise = new Promise((resolve, reject) => {
    graphql(`
      {
        allMapsJson {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allMapsJson.edges.forEach(({ node }) => {
        createPage({
          path: `/map/${node.slug}`,
          component: path.resolve(`./src/templates/map.js`),
          context: {
            slug: node.slug
          }
        });
      });

      resolve();
    });
  });

  // create "/ruling/" pages
  const rulingPromise = new Promise((resolve, reject) => {
    graphql(`
      {
        allGeneralJson {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allGeneralJson.edges.forEach(({ node }) => {
        createPage({
          path: `/ruling/${node.slug}`,
          component: path.resolve(`./src/templates/ruling.js`),
          context: {
            slug: node.slug
          }
        });
      });

      resolve();
    });
  });

  return Promise.all([cardPromise, mapPromise, rulingPromise]);
};
