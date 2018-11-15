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
  state = { toggle: false, exiting: false}
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  exit = () =>{
    setTimeout(() => this.toggle())
    setTimeout(() => navigate('/test'),1100)
  }
  
  render() {
    const toggle = this.state.toggle;

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

            {
                !this.state.exiting ?
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
            GUADY  
            </h1>
            :
                <h1
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



// import React from 'react';
// import PageTransition from 'gatsby-plugin-page-transitions';
// import { graphql ,navigate } from "gatsby"
// import Layout from '../components/layout'
// import Img from 'gatsby-image'
// import Transition from 'react-transition-group/Transition'
// import { Spring,config } from 'react-spring'

// const pageTransitionEvent = 'gatsby-plugin-page-transition::exit';
// const defaultStyle = {
//   // Default transition styling
// }
// const transitionStyles = {
//   // Transition styling
// }

// const RECTANGLE1 = 'M0,0 L0,100 L300,100 L300,0 Z'

// const styles = {
//   container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', willChange: 'background', },
//   shape: { width: 300, height: 80, willChange: 'transform' },
// }





// class Index extends React.Component {
//     listenHandler = this.listenHandler.bind(this)
//     state = {
//       in: true
//     }

//   toggle = () => this.setState(state => ({ in: !state.toggle }))
  
  
//   componentDidMount () {
//     global.window.addEventListener(pageTransitionEvent, this.listenHandler)
//     this.setState({
//       in: true
//     })
//   }

//   listenHandler () {
//     this.setState({
//         in: true
//       })
//   }

//   componentWillUnmount () {
//     global.window.removeEventListener(pageTransitionEvent, this.listenHandler)
//   }

//   render () {
//     const toggle = !this.state.in
//     const header = ({ toggle, color, scalex, scaley,scalez,shape, start, end, stop, rotation, top }) => (
//         <div className='' style={{ ...styles.container, background: `linear-gradient(to bottom, ${start} ${stop}, ${end} 100%)` }}>      
//           <svg 
//             style={{ ...styles.shape, transform: `scale3d(${scalex}, ${scaley}, ${scalez}) rotate(${rotation})` }}
//             version="1.1"
//             viewBox="0 0 300 80">
//             <g fill={color} fillRule="evenodd" >
//               <path id="path-1" d={shape} />
//             </g>
//           </svg>
//           <h1 onClick={() => navigate('/test')}
//           className='anaglyph'
//               style={{
//                   position: 'absolute',
//                   top: `${top}`,
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                   width: 300,
//                   textAlign:'center',
//                   fontSize: '5rem',
//                   willChange: 'top'
//               }}
//           >
//             guady  
//           </h1>
//         </div>
//       )
      
//       const dez = ({ bottom, right,top, left, image, rotation, translate }) => (
//         <div style={{                
//             position: 'absolute',
//             top: top,
//             bottom: bottom,
//             right: right,
//             left: left,
//             width: '200px',
//             height: '200px',
//             willChange: 'transform',
//             transform: `rotate(${rotation}) translate3d(${translate})`,
//             // transform: `translate3d(${translate})`,
//         }}>
//           <Img fluid={image} />  </div>
//       )
//     return (
//       <PageTransition transitionTime={250}>
//         <Transition timeout={250}>
//               <Layout>
//                 <Spring
//                 config={config.slow}
//                 from={{ color: 'black' }}
//                 to={{ 
//                     color: toggle ? 'black' : 'black',
//                     start: toggle ? 'white' : 'white',
//                     end: toggle ? 'white' : 'white',
//                     scalex: toggle ? 1 : 15,
//                     scaley: toggle ? 1 : 15,
//                     scalez: toggle ? 1 : 15,
//                     shape: toggle ? RECTANGLE1 : RECTANGLE1,
//                     stop: toggle ? '0%' : '50%',
//                     rotation: toggle ? '0deg' : '0deg',
//                     top: toggle ? '50%' : '7%',
//                 }}
//                 toggle={!this.state.in} // Additional props will be spread over the child
//                 children={header} // Render prop
//                 />
//                 <Spring config={config.molasses}
//                 from={{
            
//                     // top: '-1000px',
//                     // left: '10px',
//                     rotation: '90deg',            
//                     translate:'-300px,1000px,0px',   
//                     image: this.props.data.hardhatDez.childImageSharp.fluid
//                 }}
//                 to={{ 
//                     // top:  toggle ? '-1000px' :'-155px',
//                     // left: toggle ? '10px' :'10px',
//                     rotation: '90deg',            
//                     translate: toggle ? '-300px,1000px,0px' : '-300px,0px,0px',   
//                 }}
//                 toggle={!this.state.in} // Additional props will be spread over the child
//                 children={dez} // Render prop 
//                 />
//             </Layout>
//         </Transition>
//       </PageTransition>
//     )
//   }
// }

// export default Index


// export const query = graphql`
//   query {
//     dez: file(relativePath: { eq: "cleanup.png" }) {
//       childImageSharp {
//         # Specify the image processing specifications right in the query.
//         # Makes it trivial to update as your page's design changes.
//         fluid(maxWidth: 1000) {
//           ...GatsbyImageSharpFluid_withWebp_noBase64
//         }
//       }
//     }
//     hardhatDez: file(relativePath: { eq: "hardhat-dez.png" }) {
//       childImageSharp {
//         # Specify the image processing specifications right in the query.
//         # Makes it trivial to update as your page's design changes.
//         fluid(maxWidth: 1000) {
//           ...GatsbyImageSharpFluid_withWebp_noBase64
//         }
//       }
//     }
//   }
// `