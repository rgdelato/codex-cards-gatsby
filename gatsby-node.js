/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  // create "/color/" pages
  const colorPromise = new Promise((resolve, reject) => {
    graphql(`
      {
        allColorsJson {
          edges {
            node {
              color
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allColorsJson.edges.forEach(({ node }) => {
        createPage({
          path: `/color/${node.slug}/`,
          component: path.resolve(`./src/templates/color.js`),
          context: {
            color: node.color
          }
        });

        createPage({
          path: `/color/${node.slug}/images/`,
          component: path.resolve(`./src/templates/images.js`),
          context: {
            color: node.color
          }
        });
      });

      resolve();
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
          path: `/card/${node.slug}/`,
          component: path.resolve(`./src/templates/card.js`),
          context: {
            slug: node.slug,
            keywords: node.keywords,
            imageRegex: `/${node.slug}.jpg/`
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
          path: `/map/${node.slug}/`,
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
          path: `/ruling/${node.slug}/`,
          component: path.resolve(`./src/templates/ruling.js`),
          context: {
            slug: node.slug
          }
        });
      });

      resolve();
    });
  });

  return Promise.all([colorPromise, cardPromise, mapPromise, rulingPromise]);
};
