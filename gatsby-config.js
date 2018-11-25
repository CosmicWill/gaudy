const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: 'guady',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'guady',
        short_name: 'guady',
        start_url: '/',
        background_color: 'black',
        theme_color: 'black',
        display: 'minimal-ui',
        icon: 'src/images/head.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-page-transitions',
      options: {
        transitionTime: 250
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
