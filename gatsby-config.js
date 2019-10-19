module.exports = {
  siteMetadata: {
    title: "Codex Card Database"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data`
      }
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "images",
    //     path: `${__dirname}/src/images`
    //   }
    // },
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: { prefixes: ["/deck/*"] }
    }
  ]
};
