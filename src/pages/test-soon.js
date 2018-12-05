import React from "react"
import { graphql ,navigate } from "gatsby"
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { Spring,config } from 'react-spring'

const RECTANGLE = 'M0,0 L0,100 L300,100 L300,0 Z'

const styles = {
  container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', willChange: 'background', },
  shape: { width: 300, height: 80, willChange: 'transform' },
  header: { position: 'absolute', left:'50%', transform: 'translate(-50%, -50%)', width: 300, textAlign:'center', fontSize: '5rem'},
  dez: { position: 'absolute', width: '200px', height: '200px', willChange: 'transform', }
}

class Home extends React.Component {
  state = { toggle: false}
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  clickedDez = () => setTimeout(() => navigate('/'))
  exit = () => {
    this.toggle()
    setTimeout(() => navigate('/test'),1100)
  }
  
  render() {
    const toggle = this.state.toggle;

    const dez = ({image, rotation, translate }) => (
      <div onClick={() => this.clickedDez()} style={{...styles.dez, transform: `rotate(${rotation}) translate3d(${translate})`}}>
        <Img fluid={image} />  
      </div>
    )
    const header = ({color, scalex, scaley,scalez,shape, start, end, stop, rotation, top }) => (
      <div className='' style={{ ...styles.container, background: `linear-gradient(to bottom, ${start} ${stop}, ${end} 100%)` }}>      
        <svg 
          style={{ ...styles.shape, transform: `scale3d(${scalex}, ${scaley}, ${scalez}) rotate(${rotation})` }}
          version="1.1"
          viewBox="0 0 300 80">
          <g fill={color} fillRule="evenodd" >
            <path id="path-1" d={shape} />
          </g>
        </svg>

        {!this.state.toggle ?
          <h1 onClick={() => this.exit()} className='anaglyph' style={{...styles.header, top: `${top}`, willChange: 'top'}}>
            GUADY  
          </h1>
          :
          <h1 className='anaglyph' style={{...styles.header, top: `${top}`, willChange: 'top'}}>
            GUADY  
          </h1>
        }
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
            shape: RECTANGLE,
            stop: toggle ? '0%' : '50%',
            rotation: toggle ? '0deg' : '0deg',
            top: toggle ? '50%' : '7%',
          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={header} // Render prop
        />

        <Spring config={config.molasses}
          from={{
            rotation: '90deg',            
            translate:'-300px,1000px,0px',   
            image: this.props.data.hardhatDez.childImageSharp.fluid
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