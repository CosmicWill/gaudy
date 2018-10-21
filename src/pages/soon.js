import React from 'react'
import Dez from '../components/dez'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import theme from '../components/theme'

import Layout from '../components/layout'
import Header from '../components/header'

// returns a random integer from 0 to 9
// let count = () =>( Math.floor(Math.random() * 10));   

class SecondPage extends React.Component {
  state = { 
    count: 1 ,
    data: [
      "Some\nthing",
      "IS",
      "comming" ,
    ]
  
  };

  handleCount() {
    this.setState((prevState) => ({count: prevState.count+1}));
  }

  render(){
    return(
   <Layout>
    {/* <button 
    style={{ 
      margin: ' 0 auto',
      paddingTop: 0,
      position: 'fixed',
      height: '100%',
      width: '100%',
      backgroundColor: 'Transparent',
      backgroundRepeat:'no-repeat',
      border: 'none',
      cursor:'pointer',
      overflow: 'hidden',
      outline:'none',
    }} 
    onClick={(e) => this.handleCount(e)}>    </button> */}

        <Header siteTitle="coming SOON" width='55rem' height='25rem' theme={theme.dark}/>

        <StaticQuery
        query={graphql`
        query {
        imageOne: file(relativePath: { eq: "hardhat-dez.png" }) {
                childImageSharp {
                    fluid(maxWidth: 1000) {
                        ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                }
        }
        }`}
        render={data => (
            <div style={{
                position: 'absolute',
                top: '-155px',
                left: '10px',
                width: '200px',
                height: '200px',
            }}>
            <Img fluid={data.imageOne.childImageSharp.fluid} />
            </div>
        )}
    />       



  </Layout>
    )
  }
}
export default SecondPage
