import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
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

const IndexPage = (data) => (
  <Layout>
    <Header siteTitle='GUADY' to='/soon' theme={theme.mixed}/>

    {/* dez */}
    <Dez/>        

    {/* <Img fixed={data.imageOne.childImageSharp.fixed} /> */}
  </Layout>
)

export default IndexPage
