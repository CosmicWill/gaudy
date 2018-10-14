import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/header'
import Dez from '../components/dez'
import Layout from '../components/layout'

const theme = {
dark: {
  background: 'black',
  color: 'white',
  headerBackground: 'black',
},

light:{
  background: 'white',
  color: 'black',
  headerBackground: 'white',
},

mixed: {
  background: 'white',
  color: 'white',
  headerBackground: 'black',
}
}
;

const IndexPage = (props) => (
  <Layout>
    <Header siteTitle='GUADY' to='/soon' theme={theme.mixed}/>

    {/* dez */}
    <Dez/>        

    {/* <Img fluid={props.data.imageOne.childImageSharp.fluid} /> */}
  </Layout>
)



export default IndexPage


export const fluidImage = graphql`
fragment fluidImage on File {
  childImageSharp {
    fixed(height: 100) {
      ...GatsbyImageSharpFixed
    }
  }
}
`;

export const pageQuery = graphql`
  query {
    imageOne: file(relativePath: { eq: "cleanup.png" }) {
      ...fluidImage
    }
  }
`