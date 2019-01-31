import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { Spring,config } from 'react-spring'
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Row, Col, Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const RECTANGLE = 'M0,0 L0,80 L300,80 L300,0 Z'

const styles = {
  container: {display: 'flex', alignItems: 'center', justifyContent: 'center',  willChange: 'background', },
  shape: { position:'absolute', width: 300, height: 80, willChange: 'transform' },
  header: {  width: 300, height: 100, margin:'0', color: 'rgb(255, 255, 255)', textAlign:'center', fontSize: '5.5rem', zIndex: 5, willChange: 'top'},
  nav: { color: 'rgb(255, 255, 255)', textAlign:'center', fontSize: '1.5rem', willChange: 'opacity'},
  navLink:{fontSize: '1.25rem'},
  dez: { position: 'fixed', width: '200px', height: '200px', willChange: 'transform', }
}

const navItems = ['Gallary', 'Sales', 'Contact']
const gallary = [
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
]



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
    const width = this.state.width
    const height = this.state.height

    const header = ({ toggle, color, scalex, scaley,scalez,shape, start, end, stop, rotation, top, opacity, navTop, translate, height }) => (
      <Container fluid style={{background: `linear-gradient(to bottom, ${start} ${stop}, ${end} 100%)` }}>
        <Navbar className='flex-column' style={{ height: `${height}px`, transform: `translate3d(${translate})`, justifyContent: 'center', top: `${top}`, willChange: 'top'}} >
          <svg
            style={{ ...styles.shape, transform: `scale3d(${scalex}, ${scaley}, ${scalez}) rotate(${rotation})`}}
            version="1.1"
            viewBox="0 0 300 80">
            <g fill={color} fillRule="evenodd" >
              <path id="path-1" d={shape} />
            </g>
          </svg>
          <h1  onClick={toggle} style={{...styles.header}} className='anaglyph'>GUADY</h1>
          {!this.state.toggle && 

          <Nav style={{...styles.nav ,top:`${navTop}`, opacity: opacity}} >
            { navItems.map((item, key) => 
              <NavItem key={key}>
                <NavLink className='anaglyph-link' href="#">{item}</NavLink>
              </NavItem>
            )}
          </Nav>
          }
        </Navbar>
        <Container>
        {!this.state.toggle && 
            <Row>
              { gallary.map((item, key) => 
                <Col key={key} sm="6" style={{  paddingTop: '10px'}} >
                  <Card style={{opacity: opacity,  willChange: 'opacity'}} >
                    <CardImg top width="100%" src={item} alt="Card image cap" />
                  </Card>
                </Col>
              )}
            </Row>
        }
        </Container>
      </Container> 
    )

    return (
      <Layout>
        <Spring 
          config={config.slow}
          from={{ 
            opacity: 0, 
            color: 'white',
            start: 'black',
            end: 'black', 
          }}
          to={{ 
            color: toggle ? 'black' : 'black',
            start: toggle ? 'white' : 'black',
            end: toggle ? 'white' : 'black',
            scalex: toggle ? 1 : 0,
            scaley: toggle ? 1 : 0,
            scalez: toggle ? 1 : 0,
            shape: RECTANGLE,
            stop: toggle ? '0%' : '50%',
            rotation: toggle ? '0deg' : '0deg',
            top: toggle ? '35%' : '0%',
            navTop: toggle ? '50%' : '11%',
            svgTop: toggle ? '50%' : '0%',
            opacity: toggle ? 0 : 1,
            height: toggle ? height : 175,

          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={header} // Render prop
        />

        <Spring config={config.molasses}
          from={{       
            rotation: '0deg',            
            translate:'0px,1000px,0px',   
            image: this.props.data.dez.childImageSharp.fluid,
          }}
          to={{ 
            rotation: '0deg',            
            translate: toggle ? `0px,-200px,0px` : '0px,1000px,0px',
          }}
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