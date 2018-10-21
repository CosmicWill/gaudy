import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from '../components/layout'
import Header from '../components/header'
import theme from '../components/theme'
import { Keyframes, Spring } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs'

const TRIANGLE = 'M20,380 L380,380 L380,380 L200,20 L20,380 Z'
const RECTANGLE = 'M20,20 L20,380 L380,380 L380,20 L20,20 Z'

const RECTANGLE1 = 'M0,0 L0,100 L300,100 L300,0 Z'

const styles = {
  container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', willChange: 'background', },
  shape: { width: 300, height: 100, willChange: 'transform' }
}

const Content = ({ toggle, color, scale, shape, start, end, stop, rotation }) => (

  <div style={{ ...styles.container, background: `linear-gradient(to bottom, ${start} ${stop}, ${end} 100%)` }}>      
  
    <svg
      style={{ ...styles.shape, transform: `scale3d(${scale}, ${scale}, ${scale}) rotate(${rotation})` }}
      version="1.1"
      viewBox="0 0 300 100">
      <g style={{ cursor: 'pointer' }} fill={color} fillRule="evenodd" >
        <path id="path-1" d={shape} />
      </g>
    </svg>
    
    <h1 onClick={toggle}
    className='anaglyph'
        style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            textAlign:'center',
            fontSize: '5rem',
            cursor: 'pointer'
        }}
    >
      guady  
    </h1>
  </div>
)

class App extends React.Component {
  state = { toggle: true }
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  render() {
    const toggle = this.state.toggle
    return (
        <Layout>
      <Spring
        from={{ color: 'black' }}
        to={{ 
          color: toggle ? 'black' : '#70C1B3',
          start: toggle ? '#B2DBBF' : '#B2DBBF',
          end: toggle ? '#247BA0' : '#F3FFBD',
          scale: toggle ? 1 : 5,
          shape: toggle ? RECTANGLE1 : RECTANGLE1,
          stop: toggle ? '0%' : '50%',
          rotation: toggle ? '0deg' : '90deg'
        }}
        toggle={this.toggle} // Additional props will be spread over the child
        children={Content} // Render prop
      />
      </Layout>
    )
  }
}

// export default ({ data }) => (
//   <Layout>
      
//     <Header siteTitle='GUADY' to='/dev' theme={theme.mixed}/>
//     <div 
//         style={{
//             position: 'absolute',
//             bottom: '10px',
//             right: '10px',
//             width: '200px',
//             height: '200px',
//         }}
//     >
//         <Img fluid={data.file.childImageSharp.fluid}/>
//     </div>
//   </Layout>
// )
export default App

export const query = graphql`
  query {
    file(relativePath: { eq: "cleanup.png" }) {
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