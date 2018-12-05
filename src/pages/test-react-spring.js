import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { Spring,config } from 'react-spring'

const RECTANGLE = 'M0,0 L0,80 L300,80 L300,0 Z'

const styles = {
  container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', willChange: 'background', },
  shape: { width: 300, height: 80, willChange: 'transform' },
  header: { position: 'absolute', left:'50%', transform: 'translate(-50%, -50%)', width: 300, textAlign:'center', fontSize: '5rem', zIndex: 5, willChange: 'top'},
  nav: { position: 'fixed', display: 'inline', textAlign:'center', fontSize: '1rem', willChange: 'opacity'},
  dez: { position: 'fixed', width: '200px', height: '200px', willChange: 'transform', }
}

const header = ({ toggle, color, scalex, scaley,scalez,shape, start, end, stop, rotation, top, opacity, navTop }) => (
  <div style={{ ...styles.container, background: `linear-gradient(to bottom, ${start} ${stop}, ${end} 100%)` }}>      
    <svg
      style={{ ...styles.shape,position:'absolute', transform: `scale3d(${scalex}, ${scaley}, ${scalez}) rotate(${rotation})` }}
      version="1.1"
      viewBox="0 0 300 80">
      <g fill={color} fillRule="evenodd" >
        <path id="path-1" d={shape} />
      </g>
    </svg>
    <h1 onClick={toggle} className='anaglyph' style={{ ...styles.header, top: `${top}`}}>
      GUADY  
    </h1>

    <div id="nav-menu" style={{...styles.nav ,top:`${navTop}`, opacity: opacity}}>
      <ul style={{display: 'inline'}}>
        <li><a href='#' title='Gallary'>Gallary</a></li>
        <li><a style={{textShadow: '-1px 0 1px rgb(246,5,10) , 3px 0 1px rgb(30,242,241)'}} href='#' title='Sales'>Sales</a></li>
        <li><a href='#' title='Contact Me'>Contact Me</a></li>
      </ul>
    </div>
  </div>
)

const dez = ({ image, rotation, translate }) => (
  <div style={{...styles.dez, transform: `rotate(${rotation}) translate3d(${translate})`}}>
    <Img fluid={image} />  
  </div>
)


class Home extends React.Component {
  state = { toggle: true, width: 0, height: 0}
  updateWindowDimensions = this.updateWindowDimensions.bind(this)
  
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  componentWillUnmount() {window.removeEventListener('resize', this.updateWindowDimensions);}
  updateWindowDimensions() {this.setState({ width: window.innerWidth, height: window.innerHeight });}
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const toggle = this.state.toggle
    const width = 1.01*this.state.width/300.0
    const height = 1.01*this.state.height/80.0

    return (
      <Layout>
        <Spring 
        config={config.slow}
          from={{ color: 'black', opacity: 0, }}
          to={{ 
            color: toggle ? 'black' : 'black',
            start: toggle ? 'white' : 'white',
            end: toggle ? 'white' : 'white',
            scalex: toggle ? 1 : width,
            scaley: toggle ? 1 : height,
            scalez: toggle ? 1 : 1,
            shape: RECTANGLE,
            stop: toggle ? '0%' : '50%',
            rotation: toggle ? '0deg' : '0deg',
            top: toggle ? '50%' : '7%',
            navTop: toggle ? '50%' : '13%',
            opacity: toggle ? 0 : 1,
          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={header} // Render prop
        />
        <Spring config={config.molasses}
          from={{       
            rotation: '0deg',            
            translate:'200px,1000px,0px',   
            image: this.props.data.dez.childImageSharp.fluid,
          }}
          to={{ 
            rotation: '0deg',            
            translate: toggle ? '200px,-200px,0px' : '200px,1000px,0px',
          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={dez} // Render prop
        />

        <Spring config={config.molasses}
          from={{
            rotation: '90deg',            
            translate:'-300px,1000px,0px',
            image: this.props.data.hardhatDez.childImageSharp.fluid,
   
          }}
          to={{ 
            rotation: '90deg',            
            translate: toggle ? '-300px,1000px,0px' : '-300px,0px,0px',   
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