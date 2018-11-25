import React from "react"
import { graphql ,navigate } from "gatsby"
import Layout from '../components/layout'
import Img from 'gatsby-image'
import PageTransition from 'gatsby-plugin-page-transitions';

import { Spring,config } from 'react-spring'
import Dez from '../components/dez'

// const TRIANGLE = 'M20,380 L380,380 L380,380 L200,20 L20,380 Z'
// const RECTANGLE = 'M20,20 L20,380 L380,380 L380,20 L20,20 Z'

const RECTANGLE1 = 'M0,0 L0,100 L300,100 L300,0 Z'

const styles = {
  container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', willChange: 'background', },
  shape: { width: 300, height: 80, willChange: 'transform' },
}


const dez = ({ bottom, right,top, left, image, rotation, translate }) => (
  <div style={{                
      position: 'absolute',
      top: top,
      bottom: bottom,
      right: right,
      left: left,
      width: '200px',
      height: '200px',
      willChange: 'transform',
      transform: `rotate(${rotation}) translate3d(${translate})`,
      // transform: `translate3d(${translate})`,
  }}>
    <Img fluid={image} />  </div>
)

class Home extends React.Component {
  state = { toggle: true}
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  exit = () =>{
    setTimeout(() => this.toggle())
    setTimeout(() => navigate('/test-soon'),1200)
  }
  render() {
    const toggle = this.state.toggle

    const header = ({ toggle, color, scalex, scaley,scalez,shape, start, end, stop, rotation, top }) => (
  <div className='' style={{ ...styles.container, background: `linear-gradient(to bottom, ${start} ${stop}, ${end} 100%)` }}>      
    <svg 
      style={{ ...styles.shape, transform: `scale3d(${scalex}, ${scaley}, ${scalez}) rotate(${rotation})` }}
      version="1.1"
      viewBox="0 0 300 80">
      <g fill={color} fillRule="evenodd" >
        <path id="path-1" d={shape} />
      </g>
    </svg>
    <h1 onClick={() => this.exit()}
    className='anaglyph'
        style={{
            position: 'absolute',
            top: `${top}`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            textAlign:'center',
            fontSize: '5rem',
            willChange: 'top'
        }}
    >
      guady  
    </h1>
  </div>
)

    return (
      <Layout>
        <Spring 
        config={config.slow}
          from={{ color: 'black' }}
          to={{ 
            color: toggle ? 'black' : 'black',
            start: toggle ? 'white' : 'white',
            end: toggle ? 'white' : 'white',
            scalex: toggle ? 1 : 15,
            scaley: toggle ? 1 : 15,
            scalez: toggle ? 1 : 15,
            shape: toggle ? RECTANGLE1 : RECTANGLE1,
            stop: toggle ? '0%' : '50%',
            rotation: toggle ? '0deg' : '0deg',
            top: toggle ? '50%' : '7%',
          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={header} // Render prop
        />
        
        <Spring config={config.molasses}
          from={{       
            bottom: '-1000px',
            right: '10px',
            image: this.props.data.dez.childImageSharp.fluid,

          }}
          to={{ 
            bottom:  toggle ? '10px' :'-1000px',
            right: toggle ? '10px' :'10px',
          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={dez} // Render prop
        />
      </Layout>
    )
  }
}

export default Home

export const query = graphql`
  query {
    dez: file(relativePath: { eq: "cleanup.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    hardhatDez: file(relativePath: { eq: "hardhat-dez.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`