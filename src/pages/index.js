import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Header from '../components/header'
import Dez from '../components/dez'
import Layout from '../components/layout'
import theme from '../components/theme'


const IndexPage = (data) => (
  <Layout>
    <Header siteTitle='GUADY' to='/soon' theme={theme.mixed}/>
    <Dez/>
  </Layout>
)

export default IndexPage
